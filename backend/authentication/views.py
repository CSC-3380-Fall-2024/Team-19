from rest_framework import generics, status
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import User
from .serializers import *


class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [AllowAny]


class CustomerSignUpView(generics.CreateAPIView):
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()
    permission_classes = [AllowAny]



class BusinessSignUpView(generics.CreateAPIView):
    serializer_class = BusinessSerializer
    queryset = Business.objects.all()
    permission_classes = [AllowAny]

