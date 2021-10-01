# Generated by Django 3.2.7 on 2021-09-27 23:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0007_alter_option_children'),
    ]

    operations = [
        migrations.AlterField(
            model_name='option',
            name='children',
            field=models.ManyToManyField(blank=True, related_name='children_options', to='backend.Option'),
        ),
    ]
