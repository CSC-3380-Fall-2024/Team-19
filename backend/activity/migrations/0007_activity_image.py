# Generated by Django 5.1.1 on 2024-11-04 20:50

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("activity", "0006_remove_activity_indoors"),
    ]

    operations = [
        migrations.AddField(
            model_name="activity",
            name="image",
            field=models.ImageField(blank=True, null=True, upload_to="images/"),
        ),
    ]
