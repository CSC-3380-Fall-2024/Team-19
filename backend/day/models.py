from django.db import models

from activity.models import Activity


# Create your models here.

class Day(models.Model):
    # customer = models.ForeignKey(CustomerProfile, on_delete=models.CASCADE, related_name='days')
    # should be the iteneary^^^
    day_name = models.CharField(max_length=200)
    date = models.DateField()
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE, null=True)
    # trying to figure out how we're adding the activity models here

    def __str__(self):
        return self.day_name