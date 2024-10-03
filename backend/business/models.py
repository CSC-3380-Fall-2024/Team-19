from django.db import models
from backend.settings import AUTH_USER_MODEL
# Create your models here.

#Business Database Model
class BusinessProfile(models.Model):
    user = models.OneToOneField(AUTH_USER_MODEL, on_delete=models.CASCADE)
    business_name = models.CharField(max_length=255)
    business_description = models.TextField()
    business_phone_number = models.CharField(max_length=15)
    address = models.CharField(max_length=255)
    website_url = models.URLField(blank=True, null=True)
