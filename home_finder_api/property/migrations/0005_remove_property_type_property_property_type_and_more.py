# Generated by Django 4.2.1 on 2023-11-24 14:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('property', '0004_type_property_type'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='property',
            name='type',
        ),
        migrations.AddField(
            model_name='property',
            name='property_type',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='property_type', to='property.type'),
        ),
        migrations.AlterField(
            model_name='address',
            name='city',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='address',
            name='region',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='address',
            name='specific_location',
            field=models.CharField(blank=True, max_length=40, null=True),
        ),
        migrations.AlterField(
            model_name='address',
            name='zone',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='property',
            name='land_area',
            field=models.FloatField(blank=True, null=True),
        ),
    ]