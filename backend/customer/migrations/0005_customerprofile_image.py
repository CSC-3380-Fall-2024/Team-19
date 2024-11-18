# Generated by Django 5.1.3 on 2024-11-17 17:30

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("customer", "0004_alter_customerprofile_user"),
    ]

    operations = [
        migrations.AddField(
            model_name="customerprofile",
            name="image",
            field=models.ImageField(
                blank=True,
                null=True,
                upload_to="profile_pics/",
                verbose_name="Profile pic",
            ),
        ),
    ]