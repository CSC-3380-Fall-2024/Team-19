from backend.settings import AUTH_USER_MODEL
from django.db import models

#Customer Database Model
class CustomerProfile(models.Model):
    user = models.OneToOneField(AUTH_USER_MODEL, on_delete=models.CASCADE)
    preferences = models.JSONField(default=dict, blank=True, null=True)
