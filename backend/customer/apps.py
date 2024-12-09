from django.apps import AppConfig


class CustomersConfig(AppConfig):
    default_auto_field: str = 'django.db.models.BigAutoField'
    name: str = 'customer'
