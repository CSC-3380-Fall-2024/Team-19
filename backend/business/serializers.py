from rest_framework import serializers
from authentication.serializers import UserSerializer
from authentication.models import User
from .models import *

from activity.serializer import DetailedActivitySerializer


class BusinessSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    activities = DetailedActivitySerializer(many=True, read_only=True)

    class Meta:
        model = BusinessProfile
        fields = "__all__"

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        user.role = User.Role.BUSINESS
        user.save()
        business = BusinessProfile.objects.create(user=user, **validated_data)
        return business



