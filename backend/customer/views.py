
from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser

from .models import CustomerProfile
from .serializers import CustomerSerializer


class RetrieveCustomerInfo(generics.ListAPIView):
    serializer_class = CustomerSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user = self.request.user
        queryset = CustomerProfile.objects.filter(user=user)
        return queryset

