# Generated by Django 5.1.1 on 2024-10-08 14:02

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('activity', '0002_rename_name_activity_activity_name'),
        ('business', '0002_rename_business_businessprofile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='business',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='activities', to='business.businessprofile'),
        ),
    ]
