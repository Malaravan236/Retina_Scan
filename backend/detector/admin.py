from django.contrib import admin
from .models import ScanRecord


@admin.register(ScanRecord)
class ScanRecordAdmin(admin.ModelAdmin):
    list_display = ("id", "patient_name", "predicted_class", "confidence", "created_at")
    list_filter = ("predicted_class", "created_at")
    search_fields = ("patient_name",)
