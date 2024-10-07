from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny

from .models import BusinessProfile
from .serializers import BusinessSerializer


class ListBusiness(generics.ListAPIView):
    serializer_class = BusinessSerializer
    queryset = BusinessProfile.objects.all()
    permission_classes = [AllowAny]

