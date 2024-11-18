# Generated by Django 5.1.3 on 2024-11-12 21:31

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("customer", "0004_alter_customerprofile_user"),
        ("itinerary", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="itinerary",
            name="updated_at",
        ),
        migrations.AlterField(
            model_name="itinerary",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="itineraries",
                to="customer.customerprofile",
            ),
        ),
    ]