# Generated by Django 3.2.7 on 2021-09-27 09:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('contenttypes', '0002_remove_content_type_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('levels', models.CharField(default='["beginner", "intermediate", "proficient", "advanced"]', max_length=2048)),
            ],
            options={
                'verbose_name_plural': 'Categories',
            },
        ),
        migrations.CreateModel(
            name='Tutoring',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.CharField(default='This option has no description. Big oof', max_length=1023)),
                ('provider', models.CharField(max_length=255)),
                ('money', models.FloatField()),
                ('categories', models.ManyToManyField(to='backend.Category')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Pathway',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.CharField(max_length=1023)),
                ('pathway', models.CharField(default='[]', max_length=200)),
                ('category', models.ManyToManyField(to='backend.Category')),
            ],
        ),
        migrations.CreateModel(
            name='Option',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('object_id', models.PositiveIntegerField()),
                ('content_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contenttypes.contenttype')),
            ],
        ),
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.CharField(default='This option has no description. Big oof', max_length=1023)),
                ('provider', models.CharField(max_length=255)),
                ('money', models.FloatField()),
                ('categories', models.ManyToManyField(to='backend.Category')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Internship',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.CharField(default='This option has no description. Big oof', max_length=1023)),
                ('provider', models.CharField(max_length=255)),
                ('money', models.FloatField(default=0)),
                ('duration', models.FloatField(default=90)),
                ('daily_hours_average', models.FloatField(default=6)),
                ('categories', models.ManyToManyField(to='backend.Category')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.CharField(default='This option has no description. Big oof', max_length=1023)),
                ('provider', models.CharField(max_length=255)),
                ('code', models.CharField(max_length=50, unique=True)),
                ('money', models.FloatField()),
                ('degree', models.CharField(max_length=1024)),
                ('categories', models.ManyToManyField(to='backend.Category')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
