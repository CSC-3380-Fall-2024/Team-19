# Generated by Django 5.1.3 on 2024-11-12 21:31

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("itinerary", "0002_remove_itinerary_updated_at_alter_itinerary_user"),
    ]

    operations = [
        migrations.AddField(
            model_name="itinerary",
            name="uuid",
            field=models.UUIDField(
                default=uuid.uuid4, editable=False, null=True, unique=True
            ),
        ),
    ]