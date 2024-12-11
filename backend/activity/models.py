from decimal import Decimal
from typing import List, Tuple

from django.db import models
from django.db.models.fields.files import ImageFieldFile

from business.models import BusinessProfile

# Create your models here.

class Activity(models.Model):
    business: BusinessProfile = models.ForeignKey(BusinessProfile, on_delete=models.CASCADE, related_name='activities')
    activity_name: str = models.CharField(max_length=100)
    description: str = models.TextField()
    price: Decimal = models.DecimalField(max_digits=5, decimal_places=2)
    outdoors: bool = models.BooleanField(default=False)
    CATEGORY_CHOICES: list[tuple[str, str]] = [
        ('Adventure', 'Adventure'),
        ('Relaxation', 'Relaxation'),
        ('Dining', 'Dining'),
        ('Culture', 'Culture'),
    ]
    category: str = models.CharField(max_length=50, choices=CATEGORY_CHOICES, null=True, blank=True)
    image: ImageFieldFile = models.ImageField(upload_to='activity_images/', null=True, blank=True)

    def __str__(self):
        return self.activity_name
