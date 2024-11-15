# Generated by Django 5.1.3 on 2024-11-14 16:36

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("activity", "0011_remove_activity_indoors_activity_outdoors"),
        ("day", "0009_day_itinerary_remove_day_activity_day_activity"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="day",
            name="activity",
        ),
        migrations.CreateModel(
            name="DayActivity",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("start_time", models.TimeField()),
                ("end_time", models.TimeField()),
                (
                    "activity",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="days",
                        to="activity.activity",
                    ),
                ),
                (
                    "day",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="activities",
                        to="day.day",
                    ),
                ),
            ],
        ),
    ]
