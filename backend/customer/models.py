from typing import Any

from backend.settings import AUTH_USER_MODEL
from django.db import models
from django.db.models import OneToOneField, JSONField


#Customer Database Model
class CustomerProfile(models.Model):
    user: OneToOneField[Any, Any] = models.OneToOneField(AUTH_USER_MODEL, on_delete=models.CASCADE)
    preferences: JSONField | Any = models.JSONField(default=dict, blank=True, null=True)


    def __str__(self):
        return self.user.username