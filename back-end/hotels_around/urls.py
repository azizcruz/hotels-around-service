from django.urls import path
from .views import GetUserLocation, GetHotelsAroundLocation
urlpatterns = [
    path('user_location/get', GetUserLocation.as_view()),
    path('hotels_around/get/<str:geolocation>/<int:radius>', GetHotelsAroundLocation.as_view())
]