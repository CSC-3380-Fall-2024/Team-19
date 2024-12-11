from typing import Type, List

from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import AnonymousUser
from django.db.models import QuerySet

from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser

from .models import CustomerProfile
from .serializers import CustomerSerializer


class RetrieveCustomerInfo(generics.ListAPIView):
    serializer_class: Type[CustomerSerializer] = CustomerSerializer
    permission_classes: list[Type[AllowAny]] = [AllowAny]

    def get_queryset(self):
        user: AbstractBaseUser | AnonymousUser = self.request.user
        queryset: QuerySet[CustomerProfile] = CustomerProfile.objects.filter(user=user)
        return queryset

