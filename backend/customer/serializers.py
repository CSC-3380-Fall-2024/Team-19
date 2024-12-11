from typing import Type

from rest_framework import serializers
from authentication.serializers import UserCustomerSerializer
from authentication.models import User
from .models import *
from itinerary.serializers import ItinerarySerializer
from .models import CustomerProfile


class CustomerSerializer(serializers.ModelSerializer):
    user: UserCustomerSerializer = UserCustomerSerializer()
    itineraries: ItinerarySerializer = ItinerarySerializer(many=True, read_only=True)

    class Meta:
        model: Type[CustomerProfile] = CustomerProfile
        fields: str = "__all__"

    def create(self, validated_data):
        user_data: object = validated_data.pop('user')
        user: User = User.objects.create_user(**user_data)
        user.role = User.Role.CUSTOMER
        user.save()
        customer: CustomerProfile = CustomerProfile.objects.create(user=user, **validated_data)
        return customer


