from rest_framework import serializers
from .models import ScanRecord


class ScanRecordSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = ScanRecord
        fields = [
            "id",
            "patient_name",
            "image",
            "image_url",
            "predicted_class",
            "confidence",
            "dr_probability",
            "no_dr_probability",
            "created_at",
        ]
        read_only_fields = fields

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image and hasattr(obj.image, "url"):
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None
