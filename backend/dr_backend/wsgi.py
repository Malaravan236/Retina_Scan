import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'dr_backend.settings')

from dr_backend.cors_fix import ForceCorsMiddleware
from django.conf import settings
if 'dr_backend.cors_fix.ForceCorsMiddleware' not in settings.MIDDLEWARE:
    settings.MIDDLEWARE.insert(0, 'dr_backend.cors_fix.ForceCorsMiddleware')

application = get_wsgi_application()
