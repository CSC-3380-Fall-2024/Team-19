# Generated by Django 5.1.1 on 2024-10-28 20:10

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("activity", "0006_remove_activity_indoors"),
        ("day", "0006_alter_day_date"),
    ]

    operations = [
        migrations.AddField(
            model_name="day",
            name="activity",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="activity.activity",
            ),
        ),
    ]