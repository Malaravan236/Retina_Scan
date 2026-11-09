from django.apps import AppConfig


class DetectorConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'detector'
    verbose_name = 'Diabetic Retinopathy Detector'

    def ready(self):
        # Warm up the ML model once when the server starts (not during
        # migrations/management commands) so the first request isn't slow.
        import sys
        if 'runserver' in sys.argv or 'gunicorn' in sys.argv[0]:
            from . import ml_engine
            try:
                ml_engine.get_model()
            except Exception as exc:  # pragma: no cover
                print(f"⚠️  Could not preload ML model at startup: {exc}")
