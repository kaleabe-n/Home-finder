# Generated by Django 5.0.1 on 2024-02-08 10:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('property', '0007_alter_property_is_sold'),
    ]

    operations = [
        migrations.AddField(
            model_name='property',
            name='description',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
    ]
