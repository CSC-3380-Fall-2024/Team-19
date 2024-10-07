from django.urls import path
from .views import *




urlpatterns = [

    path("list/", ListBusiness.as_view(), name="business"),


]
