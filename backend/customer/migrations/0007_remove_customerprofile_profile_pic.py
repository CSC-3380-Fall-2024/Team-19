# Generated by Django 5.1.3 on 2024-11-17 17:43

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("customer", "0006_rename_image_customerprofile_profile_pic"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="customerprofile",
            name="profile_pic",
        ),
    ]