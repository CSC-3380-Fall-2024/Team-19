from typing import Type, List

from rest_framework import serializers
from activity.serializer import DetailedActivitySerializer

from .models import *
from .models import DayActivity


class DayActivitySerializer(serializers.ModelSerializer):
    activity: DetailedActivitySerializer = DetailedActivitySerializer(read_only=True)
    class Meta:
        model: Type[DayActivity] = DayActivity
        fields: list[str] = ['activity', 'start_time', 'end_time', 'date']

# class DaySerializer(serializers.ModelSerializer):
#     activities: DayActivitySerializer = DayActivitySerializer(many=True, read_only=True)
#     class Meta:
#         model: Type[Day] = Day
#         fields: list[str] = ['date', 'activities']


