from rest_framework import serializers
from activity.serializer import DetailedActivitySerializer

from .models import *


class DayActivitySerializer(serializers.ModelSerializer):
    activity = DetailedActivitySerializer(read_only=True)
    class Meta:
        model = DayActivity
        fields = ['activity', 'start_time', 'end_time']

class DaySerializer(serializers.ModelSerializer):
    activities = DayActivitySerializer(many=True, read_only=True)
    class Meta:
        model = Day
        fields = ['date', 'activities']


