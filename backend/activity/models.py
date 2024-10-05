from django.db import models
from business.models import BusinessProfile

# Create your models here.

class Activity(models.Model):
    business = models.ForeignKey(BusinessProfile, on_delete=models.CASCADE)
    activity_name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.activity_name