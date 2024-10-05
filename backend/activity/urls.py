from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import *

urlpatterns = [

    path("add", AddActivity.as_view(), name="add_activity"),

    path("delete/<int:pk>", DeleteActivity.as_view(), name="delete_activity"),




]