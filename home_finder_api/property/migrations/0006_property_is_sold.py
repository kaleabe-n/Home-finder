# Generated by Django 4.2.1 on 2023-12-04 12:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('property', '0005_remove_property_type_property_property_type_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='property',
            name='is_sold',
            field=models.BooleanField(default=True),
        ),
    ]