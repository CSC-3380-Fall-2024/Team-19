from django.urls import path
from .views import *




urlpatterns = [

    path("profile/<int:pk>", RetrieveCustomerInfo.as_view(), name="retrieve_customer_info"),




]
