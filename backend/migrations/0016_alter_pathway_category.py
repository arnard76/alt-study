# Generated by Django 3.2.7 on 2021-09-29 04:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0015_alter_pathway_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pathway',
            name='category',
            field=models.ManyToManyField(related_name='pathways', to='backend.Category'),
        ),
    ]
