from typing import Type

from rest_framework import serializers
from authentication.serializers import UserSerializer
from authentication.models import User
from .models import *

from activity.serializer import DetailedActivitySerializer
from .models import BusinessProfile


class BusinessSerializer(serializers.ModelSerializer):
    user: UserSerializer = UserSerializer()
    activities: DetailedActivitySerializer = DetailedActivitySerializer(many=True, read_only=True)

    class Meta:
        model: Type[BusinessProfile] = BusinessProfile
        fields = "__all__"

    def create(self, validated_data):
        user_data: object = validated_data.pop('user')
        user: User = User.objects.create_user(**user_data)
        user.role = User.Role.BUSINESS
        user.save()
        business: BusinessProfile = BusinessProfile.objects.create(user=user, **validated_data)
        return business



