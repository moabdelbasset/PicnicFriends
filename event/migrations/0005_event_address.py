# Generated by Django 3.2 on 2023-07-15 13:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0004_alter_event_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='address',
            field=models.CharField(max_length=150, null=True),
        ),
    ]