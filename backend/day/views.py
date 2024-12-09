from typing import Type, List

from django.db.models import QuerySet
from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny

from .models import Day
from .serializers import DaySerializer

# Create your views here.

class AddDay(generics.CreateAPIView):
    serializer_class: Type[DaySerializer] = DaySerializer
    permission_classes: list[Type[AllowAny]] = [AllowAny]

    #def perform_create(self, serializer):
     #   user = CustomerProfile.objects.get(user=self.request.user)
      #  serializer.save(customer=user)

class ListDay(generics.ListAPIView):
    serializer_class: Type[DaySerializer] = DaySerializer
    queryset: QuerySet[Day] = Day.objects.all()
    permission_classes: list[Type[AllowAny]] = [AllowAny]

class UpdateDay(generics.RetrieveUpdateAPIView):
    serializer_class: Type[DaySerializer] = DaySerializer
    queryset: QuerySet[Day] = Day.objects.all()
    permission_classes: list[Type[AllowAny]] = [AllowAny]

class DeleteDay(generics.RetrieveDestroyAPIView):
    serializer_class: Type[DaySerializer] = DaySerializer
    queryset: QuerySet[Day] = Day.objects.all()
    permission_classes: list[Type[AllowAny]] = [AllowAny]

    def perform_destroy(self, instance):
        if self.request.user.role == 'admin':
            instance.delete()

        else:
            raise PermissionDenied