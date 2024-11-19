from rest_framework import serializers
from .models import *

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from customer.models import CustomerProfile
from business.models import BusinessProfile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", 'email', 'role', 'password']
        extra_kwargs = {'password': {'write_only': True},
                        'role': {'read_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class UserCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", 'email','first_name','last_name', 'role', 'password']
        extra_kwargs = {'password': {'write_only': True},
                        'role': {'read_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):


    def get_token(cls, user):
        global profile_id
        token = super().get_token(user)

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