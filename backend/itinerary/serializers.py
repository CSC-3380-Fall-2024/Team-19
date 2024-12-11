from rest_framework import serializers

from .models import Itinerary
from day.serializers import DaySerializer

class ItinerarySerializer(serializers.ModelSerializer):
    days = DaySerializer(many=True, read_only=True)
    class Meta:
        model = Itinerary
        fields = ['title', 'start_date', 'end_date', 'destination', 'created_at', 'days','daily_budget','trip_total'
            ,'activity_types', 'meal_types', 'interests']
