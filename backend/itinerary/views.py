
from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser

from .models import Itinerary
from .serializers import  ItinerarySerializer
from customer.models import CustomerProfile


class CreateItinerary(generics.CreateAPIView):
    queryset = Itinerary.objects.all()
    serializer_class = ItinerarySerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        user = CustomerProfile.objects.get(user=self.request.user)
        serializer.save(user=user)


class RetrieveItinerary(generics.RetrieveAPIView):
    lookup_field = 'uuid'
    queryset = Itinerary.objects.all()
    serializer_class = ItinerarySerializer
    permission_classes = [AllowAny]






