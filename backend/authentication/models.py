from django.contrib.admindocs.utils import ROLES
from django.contrib.auth.models import AbstractUser
from django.db import models


#Abstract User Model which handles authentication
class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = 'ADMIN', 'Admin'
        CUSTOMER = 'CUSTOMER', 'Customer'
        BUSINESS = 'BUSINESS', 'Business'

    base_role = Role.ADMIN

    role = models.CharField(max_length=50, choices=Role.choices)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.role = self.base_role
        return super().save(*args, **kwargs)





