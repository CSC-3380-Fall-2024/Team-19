from typing import List, Type

from django.db.models import QuerySet
from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser

from .models import Itinerary
from .serializers import  ItinerarySerializer
from customer.models import CustomerProfile


class CreateItinerary(generics.CreateAPIView):
    queryset: QuerySet[Itinerary] = Itinerary.objects.all()
    serializer_class: Type[ItinerarySerializer] = ItinerarySerializer
    permission_classes: list[Type[AllowAny]] = [AllowAny]

    def perform_create(self, serializer):
        user: CustomerProfile = CustomerProfile.objects.get(user=self.request.user)
        serializer.save(user=user)


class RetrieveItinerary(generics.RetrieveAPIView):
    lookup_field: str = 'uuid'
    queryset: QuerySet[Itinerary] = Itinerary.objects.all()
    serializer_class: Type[ItinerarySerializer] = ItinerarySerializer
    permission_classes: list[Type[AllowAny]] = [AllowAny]






