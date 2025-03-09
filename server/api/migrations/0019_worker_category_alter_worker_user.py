# Generated by Django 5.1.5 on 2025-03-06 08:50

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0018_worker_username"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name="worker",
            name="category",
            field=models.ForeignKey(
                default=None,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="workers",
                to="api.servicecategory",
            ),
        ),
        migrations.AlterField(
            model_name="worker",
            name="user",
            field=models.OneToOneField(
                default=None,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="worker",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
