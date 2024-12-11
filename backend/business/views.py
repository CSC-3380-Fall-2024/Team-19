from typing import Type, List

from django.db.models import QuerySet
from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny

from .models import BusinessProfile
from .serializers import BusinessSerializer


class ListBusiness(generics.ListAPIView):
    serializer_class: Type[BusinessSerializer] = BusinessSerializer
    queryset: QuerySet[BusinessProfile] = BusinessProfile.objects.all()
    permission_classes: list[Type[AllowAny]] = [AllowAny]

