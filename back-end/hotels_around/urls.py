from django.urls import path
from .views import GetUserLocation, GetHotelsAroundLocation, GetHotelsAroundBasedOnAddress
urlpatterns = [
    path('user_location/get', GetUserLocation.as_view()),
    path('hotels_around/get/<str:geolocation>/<int:radius>', GetHotelsAroundLocation.as_view()),
    path('hotels_around_based_on_address/get/<str:address>/<int:radius>', GetHotelsAroundBasedOnAddress.as_view())
]