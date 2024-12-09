from typing import Type, List, Dict

from rest_framework import serializers

from .models import Activity

class CreateActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model: Type[Activity] = Activity
        fields: list[str] = ["activity_name", "description", "price", "outdoors", "category", "image"]
        extra_kwargs: dict[str, dict[str, bool]] = {'business': {'write_only': True}}


class DetailedActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model: Type[Activity] = Activity
        fields: str = "__all__"


