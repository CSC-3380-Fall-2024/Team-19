from rest_framework import serializers

from .models import Activity





class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['activity_name', 'description','price', 'business']


