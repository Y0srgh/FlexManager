# Generated by Django 5.1.2 on 2024-10-21 05:54

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_rename_numberofpostedvideo_user_coins_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='last_coin_allocation',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
