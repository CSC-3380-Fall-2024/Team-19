# Generated by Django 5.1.3 on 2024-11-12 16:51

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("day", "0007_day_activity"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="day",
            name="day_name",
        ),
    ]
