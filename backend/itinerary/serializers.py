from typing import List, Any, Type

from rest_framework import serializers

from .models import Itinerary
from day.serializers import DayActivitySerializer

class ItinerarySerializer(serializers.ModelSerializer):
    activities = DayActivitySerializer(many=True, read_only=True)
    class Meta:
        model: Type[Itinerary] = Itinerary
        fields: list[str | Any] = ['title', 'start_date', 'end_date', 'destination', 'created_at', 'activities','daily_budget','trip_total'
            ,'activity_types', 'meal_types', 'interests']
