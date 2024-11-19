from django.urls import path, include
from .views import *

urlpatterns = [

    path("create", CreateItinerary.as_view(), name="add_day"),

    path("<uuid>", RetrieveItinerary.as_view(), name="retrieve_itinerary"),


]