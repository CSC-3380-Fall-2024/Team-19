from rest_framework import serializers

from .models import Activity

class CreateActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ["activity_name", "description", "price", "outdoors", "category", "image"]
        extra_kwargs = {'business': {'write_only': True}}


class DetailedActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = "__all__"


