from rest_framework import serializers

from .models import Activity
from business.serializers import BusinessSerializer


class ActivitySerializer(serializers.ModelSerializer):
    business = BusinessSerializer()
    class Meta:
        model = Activity
        fields = '__all__'
        extra_kwargs = {'business': {'read_only': True}}


