# Generated by Django 5.1.3 on 2024-11-12 21:35

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("itinerary", "0003_itinerary_uuid"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="itinerary",
            name="uuid",
        ),
    ]
