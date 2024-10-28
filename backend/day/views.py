from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny

from .models import Day
from .serializers import DaySerializer

# Create your views here.

class AddDay(generics.CreateAPIView):
    serializer_class = DaySerializer
    permission_classes = [AllowAny]

    #def perform_create(self, serializer):
     #   user = CustomerProfile.objects.get(user=self.request.user)
      #  serializer.save(customer=user)

class ListDay(generics.ListAPIView):
    serializer_class = DaySerializer
    queryset = Day.objects.all()
    permission_classes = [AllowAny]

class UpdateDay(generics.RetrieveUpdateAPIView):
    serializer_class = DaySerializer
    queryset = Day.objects.all()
    permission_classes = [AllowAny]

class DeleteDay(generics.RetrieveDestroyAPIView):
    serializer_class = DaySerializer
    queryset = Day.objects.all()
    permission_classes = [AllowAny]

    def perform_destroy(self, instance):
        if self.request.user.role == 'admin':
            instance.delete()

        else:
            raise PermissionDenied