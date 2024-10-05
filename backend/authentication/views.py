from rest_framework import generics
from rest_framework.permissions import AllowAny

from .serializers import *
from customer.serializers import CustomerSerializer
from customer.models import CustomerProfile

from business.serializers import BusinessSerializer
from business.models import BusinessProfile


class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [AllowAny]


class CustomerSignUpView(generics.CreateAPIView):
    serializer_class = CustomerSerializer
    queryset = CustomerProfile.objects.all()
    permission_classes = [AllowAny]



class BusinessSignUpView(generics.CreateAPIView):
    serializer_class = BusinessSerializer
    queryset = BusinessProfile.objects.all()
    permission_classes = [AllowAny]

