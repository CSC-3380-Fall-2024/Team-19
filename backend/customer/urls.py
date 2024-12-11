from django.urls import path
from .views import *




urlpatterns = [

    path("profile/info", RetrieveCustomerInfo.as_view(), name="retrieve_customer_info"),




]
