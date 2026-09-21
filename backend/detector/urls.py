from django.urls import path
from . import views

urlpatterns = [
    path("predict/", views.PredictView.as_view(), name="predict"),
    path("history/", views.HistoryListView.as_view(), name="history-list"),
    path("history/<int:pk>/", views.HistoryDeleteView.as_view(), name="history-delete"),
    path("stats/", views.StatsView.as_view(), name="stats"),
    path("health/", views.HealthCheckView.as_view(), name="health"),
]
