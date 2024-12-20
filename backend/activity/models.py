from django.db import models
from business.models import BusinessProfile

# Create your models here.

class Activity(models.Model):
    business = models.ForeignKey(BusinessProfile, on_delete=models.CASCADE, related_name='activities')
    activity_name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=5, decimal_places=2)
    outdoors = models.BooleanField(default=False)
    CATEGORY_CHOICES = [
        ('Adventure', 'Adventure'),
        ('Relaxation', 'Relaxation'),
        ('Dining', 'Dining'),
        ('Culture', 'Culture'),
    ]
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, null=True, blank=True)
    image = models.ImageField(upload_to='activity_images/', null=True, blank=True)

    def __str__(self):
        return self.activity_name
