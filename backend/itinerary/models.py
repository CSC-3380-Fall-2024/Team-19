from django.db import models
from customer.models import CustomerProfile
import uuid



class Itinerary(models.Model):
    user = models.ForeignKey(CustomerProfile, related_name="itineraries", on_delete=models.CASCADE)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, null=True)
    title = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    destination = models.CharField(max_length=255)
    daily_budget = models.IntegerField(default=0)
    trip_total = models.IntegerField(default=0)
    activity_types = models.JSONField(default=dict, blank=True, null=True)
    meal_types = models.JSONField(default=dict, blank=True, null=True)
    interests = models.JSONField(default=dict, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.title

