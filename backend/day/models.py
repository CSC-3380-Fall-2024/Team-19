from enum import unique

from django.db import models

from activity.models import Activity
from itinerary.models import Itinerary

# Create your models here.

class Day(models.Model):
    itinerary = models.ForeignKey(Itinerary, related_name="days", on_delete=models.CASCADE, null=True)
    date = models.DateField()

    def __str__(self):
        return f"{self.itinerary.title} - {self.date}"

class DayActivity(models.Model):
    day = models.ForeignKey(Day, related_name="activities", on_delete=models.CASCADE)
    activity = models.ForeignKey(Activity, related_name="days", on_delete=models.CASCADE)
    start_time = models.TimeField()
    end_time = models.TimeField()
    def __str__(self):
        return f"{self.day} - {self.activity}"