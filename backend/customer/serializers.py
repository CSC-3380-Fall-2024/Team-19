from rest_framework import serializers
from authentication.serializers import UserCustomerSerializer
from authentication.models import User
from .models import *
from itinerary.serializers import ItinerarySerializer




class CustomerSerializer(serializers.ModelSerializer):
    user = UserCustomerSerializer()
    itineraries = ItinerarySerializer(many=True, read_only=True)

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


