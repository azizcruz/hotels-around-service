from django.urls import path
from .views import GetLocation
urlpatterns = [
    path('location/get', GetLocation.as_view())
]