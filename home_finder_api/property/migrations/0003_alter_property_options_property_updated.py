# Generated by Django 4.2.1 on 2023-11-03 13:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('property', '0002_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='property',
            options={'ordering': ['-updated']},
        ),
        migrations.AddField(
            model_name='property',
            name='updated',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
