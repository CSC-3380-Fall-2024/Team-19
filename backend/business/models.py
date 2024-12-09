from typing import Any

from django.db import models
from backend.settings import AUTH_USER_MODEL
from django.db.models import OneToOneField
from django.db.models.fields.files import ImageFieldFile


# Create your models here.

#Business Database Model
class BusinessProfile(models.Model):
    user: OneToOneField[Any, Any] = models.OneToOneField(AUTH_USER_MODEL, on_delete=models.CASCADE)
    business_name: str = models.CharField(max_length=255)
    business_description: str = models.TextField()
    business_phone_number: str = models.CharField(max_length=15)
    address: str = models.CharField(max_length=255)
    website_url: str = models.URLField(blank=True, null=True)
    logo: ImageFieldFile = models.ImageField(upload_to='business_images/', null=True, blank=True)

    def __str__(self):
        return self.business_name