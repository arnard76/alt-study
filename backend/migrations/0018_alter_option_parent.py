# Generated by Django 3.2.7 on 2021-09-30 09:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0017_alter_pathway_pathway'),
    ]

    operations = [
        migrations.AlterField(
            model_name='option',
            name='parent',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='backend.option'),
        ),
    ]
