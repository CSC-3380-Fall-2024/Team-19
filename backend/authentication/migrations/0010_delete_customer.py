# Generated by Django 5.1.1 on 2024-10-03 05:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0009_alter_business_business_name'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Customer',
        ),
    ]