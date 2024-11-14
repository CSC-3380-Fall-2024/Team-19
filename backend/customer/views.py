
from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser

from .models import CustomerProfile
from .serializers import CustomerSerializer


class RetrieveCustomerInfo(generics.RetrieveAPIView):
    serializer_class = CustomerSerializer
    queryset = CustomerProfile.objects.all()
    permission_classes = [AllowAny]

