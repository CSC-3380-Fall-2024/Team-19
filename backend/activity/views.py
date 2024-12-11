from typing import Type, List

from django.db.models import QuerySet
from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import Activity
from .serializer import *
from business.models import BusinessProfile
from .serializer import CreateActivitySerializer, DetailedActivitySerializer


# Create your views here.

class AddActivity(generics.CreateAPIView):
    serializer_class: Type[CreateActivitySerializer] = CreateActivitySerializer
    permission_classes: list[Type[AllowAny]] = [AllowAny]

    def perform_create(self, serializer: object) -> object:
        user: BusinessProfile = BusinessProfile.objects.get(user=self.request.user)
        serializer.save(business=user)

class ListActivity(generics.ListAPIView):
    serializer_class: Type[DetailedActivitySerializer] = DetailedActivitySerializer
    queryset: QuerySet[Activity] = Activity.objects.all()
    permission_classes: list[Type[IsAuthenticated]] = [IsAuthenticated]
class DeleteActivity(generics.DestroyAPIView):
    serializer_class: Type[DetailedActivitySerializer] = DetailedActivitySerializer
    queryset: QuerySet[Activity] = Activity.objects.all()
    permission_classes: list[Type[AllowAny]] = [AllowAny]

    def perform_destroy(self, instance):
        if instance.business.user == self.request.user or self.request.user.role == 'admin':
            instance.delete()

        else:
            raise PermissionDenied




