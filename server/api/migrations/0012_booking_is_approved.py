# Generated by Django 5.1.5 on 2025-02-20 10:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0011_booking"),
    ]

    operations = [
        migrations.AddField(
            model_name="booking",
            name="is_approved",
            field=models.BooleanField(default=False),
        ),
    ]
