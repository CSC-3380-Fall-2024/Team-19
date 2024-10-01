from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", 'email', 'role', 'password']
        extra_kwargs = {'password': {'write_only': True},
                        'role': {'read_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class CustomerSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Customer
        fields = "__all__"

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        user.role = User.Role.CUSTOMER
        user.save()
        customer = Customer.objects.create(user=user, **validated_data)
        return customer


class BusinessSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Business
        fields = "__all__"

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        user.role = User.Role.BUSINESS
        user.save()
        business = Business.objects.create(user=user, **validated_data)
        return business
