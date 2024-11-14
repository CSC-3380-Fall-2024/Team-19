from rest_framework import serializers
from activity.serializer import ActivitySerializer

from .models import *


class DayActivitySerializer(serializers.ModelSerializer):
    activity = ActivitySerializer(read_only=True)
    class Meta:
        model = DayActivity
        fields = ['activity', 'start_time', 'end_time']

class DaySerializer(serializers.ModelSerializer):
    activities = DayActivitySerializer(many=True, read_only=True)
    class Meta:
        model = Day
        fields = ['date', 'activities']


