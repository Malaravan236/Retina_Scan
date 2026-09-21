from django.db import models


def scan_upload_path(instance, filename):
    return f"scans/{filename}"


class ScanRecord(models.Model):
    RESULT_CHOICES = (
        ("DR", "Diabetic Retinopathy Detected"),
        ("No DR", "No Diabetic Retinopathy"),
    )

    patient_name = models.CharField(max_length=120, blank=True, default="Anonymous")
    image = models.ImageField(upload_to=scan_upload_path)
    predicted_class = models.CharField(max_length=20, choices=RESULT_CHOICES)
    confidence = models.FloatField()
    dr_probability = models.FloatField()
    no_dr_probability = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.patient_name} - {self.predicted_class} ({self.confidence:.2%})"
