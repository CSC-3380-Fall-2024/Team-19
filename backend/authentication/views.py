from typing import Type, List, Dict

from django.db.models import QuerySet
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenRefreshSerializer, TokenBlacklistSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView, TokenBlacklistView

from .models import User
from .serializers import *
from customer.serializers import CustomerSerializer
from customer.models import CustomerProfile

from business.serializers import BusinessSerializer
from business.models import BusinessProfile
from .serializers import UserSerializer


class UserRegistrationView(generics.CreateAPIView):
    serializer_class: Type[UserSerializer] = UserSerializer
    queryset: QuerySet[User] = User.objects.all()
    permission_classes: list[Type[AllowAny]] = [AllowAny]


class CustomerSignUpView(generics.CreateAPIView):
    serializer_class: Type[CustomerSerializer] = CustomerSerializer
    queryset: QuerySet[CustomerProfile] = CustomerProfile.objects.all()
    permission_classes: list[Type[AllowAny]] = [AllowAny]


class BusinessSignUpView(generics.CreateAPIView):
    serializer_class: Type[BusinessSerializer] = BusinessSerializer
    queryset: QuerySet[BusinessProfile] = BusinessProfile.objects.all()
    permission_classes: list[Type[AllowAny]] = [AllowAny]


class ListBusinessesView(generics.ListAPIView):
    serializer_class: Type[CustomerSerializer] = CustomerSerializer
    queryset: QuerySet[CustomerProfile] = CustomerProfile.objects.all()
    permission_classes: list[Type[AllowAny]] = [AllowAny]

class MyTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response: Response = super().post(request, *args, **kwargs)
        token: object = response.data["refresh"]
        response.set_cookie("refresh", token, httponly=True)
        response.data.pop('refresh', None)
        return response

class MyTokenRefreshView(TokenRefreshView):
    permission_classes: list[Type[AllowAny]] = [AllowAny]

    def get(self, request, *args, **kwargs):
        # Retrieve the refresh token from the cookie
        refresh_token: object = request.COOKIES.get('refresh')


        # Validate the refresh token and generate a new access token
        data: dict[str, object] = {'refresh': refresh_token}
        serializer: TokenRefreshSerializer = TokenRefreshSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        # Return the new access token
        return Response(serializer.validated_data, status=status.HTTP_200_OK)

class MyTokenBlacklistView(TokenBlacklistView):
    permission_classes: list[Type[AllowAny]] = [AllowAny]
    def get(self, request, *args, **kwargs):
        refresh_token: object = request.COOKIES.get('refresh')

        try:
            token: RefreshToken = RefreshToken(refresh_token)
            token.blacklist()
            response: Response = Response({"message": "Token successfully blacklisted"}, status=200)
            response.delete_cookie('refresh')
            return response
        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


