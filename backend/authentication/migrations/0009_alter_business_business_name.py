# Generated by Django 5.1.1 on 2024-10-01 06:18

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        (
            "authentication",
            "0008_remove_customer_student_id_customer_preferences_and_more",
        ),
    ]

    operations = [
        migrations.AlterField(
            model_name="business",
            name="business_name",
            field=models.CharField(max_length=255),
        ),
    ]