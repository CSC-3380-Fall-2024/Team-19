from django.apps import AppConfig


class BusinessConfig(AppConfig):
    default_auto_field: str = 'django.db.models.BigAutoField'
    name: str = 'business'
