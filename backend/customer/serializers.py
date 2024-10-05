from rest_framework import serializers
from authentication.serializers import UserSerializer
from authentication.models import User
from .models import *


class CustomerSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = CustomerProfile
        fields = "__all__"

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        user.role = User.Role.CUSTOMER
        user.save()
        customer = CustomerProfile.objects.create(user=user, **validated_data)
        return customer


