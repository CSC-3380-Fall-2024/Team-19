# Generated by Django 5.1.1 on 2024-10-28 19:54

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("day", "0004_remove_day_date"),
    ]

    operations = [
        migrations.AddField(
            model_name="day",
            name="date",
            field=models.DateField(blank=True, null=True),
        ),
    ]
