from django.db import models

# Create your models here.

class Day(models.Model):
    # customer = models.ForeignKey(CustomerProfile, on_delete=models.CASCADE, related_name='days')
    # should be the iteneary^^^
    day_name = models.CharField(max_length=200)
    # trying to figure out how we're adding the activity models here

    def __str__(self):
        return self.day_name