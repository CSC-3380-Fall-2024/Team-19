# Generated by Django 5.1.1 on 2024-10-01 04:46

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("authentication", "0006_alter_user_role_customer_delete_student"),
    ]

    operations = [
        migrations.AlterField(
            model_name="customer",
            name="user",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL
            ),
        ),
    ]
