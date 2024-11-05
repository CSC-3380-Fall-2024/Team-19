from rest_framework import serializers
from activity.serializer import ActivitySerializer

from .models import Day


class DaySerializer(serializers.ModelSerializer):
    activities = ActivitySerializer(read_only=True)
    class Meta:
        model = Day
        fields = "__all__"