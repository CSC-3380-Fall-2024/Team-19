from typing import Type, List, Dict

from rest_framework import serializers
from rest_framework_simplejwt.tokens import Token

from .models import *

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from customer.models import CustomerProfile
from business.models import BusinessProfile
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model: Type[User] = User
        fields: list[str] = ["username", 'email', 'role', 'password']
        extra_kwargs: dict[str, dict[str, bool] | dict[str, bool]] = {'password': {'write_only': True},
                        'role': {'read_only': True}}

    def create(self, validated_data):
        user: User = User.objects.create_user(**validated_data)
        return user

class UserCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model: Type[User] = User
        fields: list[str] = ["username", 'email','first_name','last_name', 'role', 'password']
        extra_kwargs: dict[str, dict[str, bool] | dict[str, bool]] = {'password': {'write_only': True},
                        'role': {'read_only': True}}

    def create(self, validated_data: {}) -> {}:
        user: User = User.objects.create_user(**validated_data)
        return user


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):


    def get_token(cls, user):
        global profile_id
        token: Token = super().get_token(user)

        # Add custom claims
        if user.role == 'CUSTOMER':
            token['name'] = user.first_name + ' ' + user.last_name
            token['profile_id'] = CustomerProfile.objects.get(user=user).id
        elif user.role == 'BUSINESS':
            token['profile_id'] = BusinessProfile.objects.get(user=user).id
        token["username"] = user.username
        token['role'] = user.role
        # ...

        return token