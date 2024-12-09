from datetime import date, datetime
from typing import Any
from uuid import UUID

from django.db import models
from django.db.models import JSONField

from customer.models import CustomerProfile
import uuid



class Itinerary(models.Model):
    user: CustomerProfile = models.ForeignKey(CustomerProfile, related_name="itineraries", on_delete=models.CASCADE)
    uuid: UUID = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, null=True)
    title: str = models.CharField(max_length=255)
    start_date: date = models.DateField()
    end_date: date = models.DateField()
    destination: str = models.CharField(max_length=255)
    daily_budget: int = models.IntegerField(default=0)
    trip_total: int = models.IntegerField(default=0)
    activity_types: JSONField | Any = models.JSONField(default=dict, blank=True, null=True)
    meal_types: JSONField | Any = models.JSONField(default=dict, blank=True, null=True)
    interests: JSONField | Any = models.JSONField(default=dict, blank=True, null=True)
    created_at: datetime = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.title

