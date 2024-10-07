from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny

from .models import Activity
from .serializer import ActivitySerializer
from business.models import BusinessProfile


# Create your views here.

class AddActivity(generics.CreateAPIView):
    serializer_class = ActivitySerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        user = BusinessProfile.objects.get(user=self.request.user)
        serializer.save(business=user)

class ListActivity(generics.ListAPIView):
    serializer_class = ActivitySerializer
    queryset = Activity.objects.all()
    permission_classes = [AllowAny]
class DeleteActivity(generics.RetrieveDestroyAPIView):
    serializer_class = ActivitySerializer
    queryset = Activity.objects.all()
    permission_classes = [AllowAny]

    def perform_destroy(self, instance):
        if instance.business.user == self.request.user or self.request.user.role == 'admin':
            instance.delete()

        else:
            raise PermissionDenied




