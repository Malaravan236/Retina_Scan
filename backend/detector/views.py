from django.db.models import Avg, Count, Q
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from . import ml_engine
from .models import ScanRecord
from .serializers import ScanRecordSerializer


class PredictView(APIView):
    """
    POST /api/predict/
    multipart/form-data:
        image        -> required, the retina scan image file
        patient_name -> optional, defaults to "Anonymous"
    """

    def post(self, request):
        image_file = request.FILES.get("image")
        if not image_file:
            return Response(
                {"error": "No image provided. Attach a file under the 'image' field."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        allowed_types = ("image/jpeg", "image/png", "image/jpg", "image/webp")
        if image_file.content_type not in allowed_types:
            return Response(
                {"error": f"Unsupported file type: {image_file.content_type}. Upload a JPG, PNG or WEBP image."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            image_bytes = image_file.read()
            result = ml_engine.run_inference(image_bytes)
        except FileNotFoundError as exc:
            return Response({"error": str(exc)}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        except Exception as exc:
            return Response({"error": f"Prediction failed: {exc}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        image_file.seek(0)
        record = ScanRecord.objects.create(
            patient_name=request.data.get("patient_name") or "Anonymous",
            image=image_file,
            predicted_class=result["predicted_class"],
            confidence=result["confidence"],
            dr_probability=result["dr_probability"],
            no_dr_probability=result["no_dr_probability"],
        )

        serializer = ScanRecordSerializer(record, context={"request": request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class HistoryListView(generics.ListAPIView):
    """GET /api/history/  -> paginated list of past scans, newest first."""
    queryset = ScanRecord.objects.all()
    serializer_class = ScanRecordSerializer

    def get_serializer_context(self):
        return {"request": self.request}


class HistoryDeleteView(generics.DestroyAPIView):
    """DELETE /api/history/<id>/"""
    queryset = ScanRecord.objects.all()
    serializer_class = ScanRecordSerializer


class StatsView(APIView):
    def get(self, request):
        try:
            qs = ScanRecord.objects.all()
            total = qs.count()
            dr_count = qs.filter(predicted_class="DR").count()
            no_dr_count = qs.filter(predicted_class="No DR").count()
            avg_confidence = qs.aggregate(avg=Avg("confidence"))["avg"] or 0
            latest = qs.order_by('-id').first()

            return Response({
                "total_scans": total,
                "dr_count": dr_count,
                "no_dr_count": no_dr_count,
                "dr_rate": round((dr_count / total) * 100, 1) if total else 0,
                "average_confidence": round(avg_confidence * 100, 1),
                "latest_scan": ScanRecordSerializer(latest, context={"request": request}).data if latest else None,
            })
        except Exception as e:
            print("STATS ERROR:", e)
            import traceback
            traceback.print_exc()
            return Response({"error": str(e)}, status=500)


class HealthCheckView(APIView):
    """GET /api/health/ -> simple readiness probe used by the frontend."""

    def get(self, request):
        model_ready = True
        error = None
        try:
            ml_engine.get_model()
        except Exception as exc:
            model_ready = False
            error = str(exc)

        return Response(
            {
                "status": "healthy",
                "model_loaded": model_ready,
                "error": error,
            }
        )
