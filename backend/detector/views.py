from django.db.models import Avg, Count, Q
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from . import ml_engine
from .models import ScanRecord
from .serializers import ScanRecordSerializer

# CORS HELPER DA
def add_cors_headers(response):
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, POST, DELETE, OPTIONS"
    response["Access-Control-Allow-Headers"] = "*"
    return response

class PredictView(APIView):
    def post(self, request):
        image_file = request.FILES.get("image")
        if not image_file:
            resp = Response(
                {"error": "No image provided. Attach a file under the 'image' field."},
                status=status.HTTP_400_BAD_REQUEST,
            )
            return add_cors_headers(resp)

        allowed_types = ("image/jpeg", "image/png", "image/jpg", "image/webp")
        if image_file.content_type not in allowed_types:
            resp = Response(
                {"error": f"Unsupported file type: {image_file.content_type}. Upload a JPG, PNG or WEBP image."},
                status=status.HTTP_400_BAD_REQUEST,
            )
            return add_cors_headers(resp)

        try:
            image_bytes = image_file.read()
            result = ml_engine.run_inference(image_bytes)
        except FileNotFoundError as exc:
            resp = Response({"error": str(exc)}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
            return add_cors_headers(resp)
        except Exception as exc:
            resp = Response({"error": f"Prediction failed: {exc}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            return add_cors_headers(resp)

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
        resp = Response(serializer.data, status=status.HTTP_201_CREATED)
        return add_cors_headers(resp)

    def options(self, request, *args, **kwargs):
        resp = Response(status=status.HTTP_200_OK)
        return add_cors_headers(resp)

class HistoryListView(generics.ListAPIView):
    queryset = ScanRecord.objects.all()
    serializer_class = ScanRecordSerializer

    def get_serializer_context(self):
        return {"request": self.request}
    
    def list(self, request, *args, **kwargs):
        resp = super().list(request, *args, **kwargs)
        return add_cors_headers(resp)

class HistoryDeleteView(generics.DestroyAPIView):
    queryset = ScanRecord.objects.all()
    serializer_class = ScanRecordSerializer

    def destroy(self, request, *args, **kwargs):
        resp = super().destroy(request, *args, **kwargs)
        return add_cors_headers(resp)

class StatsView(APIView):
    def get(self, request):
        try:
            qs = ScanRecord.objects.all()
            total = qs.count()
            dr_count = qs.filter(predicted_class="DR").count()
            no_dr_count = qs.filter(predicted_class="No DR").count()
            avg_confidence = qs.aggregate(avg=Avg("confidence"))["avg"] or 0
            latest = qs.order_by('-id').first()

            resp = Response({
                "total_scans": total,
                "dr_count": dr_count,
                "no_dr_count": no_dr_count,
                "dr_rate": round((dr_count / total) * 100, 1) if total else 0,
                "average_confidence": round(avg_confidence * 100, 1),
                "latest_scan": ScanRecordSerializer(latest, context={"request": request}).data if latest else None,
            })
            return add_cors_headers(resp)
        except Exception as e:
            print("STATS ERROR:", e)
            import traceback
            traceback.print_exc()
            resp = Response({"error": str(e)}, status=500)
            return add_cors_headers(resp)
    
    def options(self, request, *args, **kwargs):
        resp = Response(status=status.HTTP_200_OK)
        return add_cors_headers(resp)

class HealthCheckView(APIView):
    def get(self, request):
        model_ready = True
        error = None
        try:
            ml_engine.get_model()
        except Exception as exc:
            model_ready = False
            error = str(exc)

        resp = Response(
            {
                "status": "healthy",
                "model_loaded": model_ready,
                "error": error,
            }
        )
        return add_cors_headers(resp)
    
    def options(self, request, *args, **kwargs):
        resp = Response(status=status.HTTP_200_OK)
        return add_cors_headers(resp)