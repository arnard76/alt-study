from django.db import models


class Category(models.Model):
    class Meta:
        verbose_name_plural = "Categories"

    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


# Abstract Model - Option1 and child class Job1
class Option1(models.Model):
    name = models.CharField(max_length=255, null=True)
    categories = models.ManyToManyField(Category)

    class Meta:
        abstract = True
        verbose_name_plural = 'Options'

    def __str__(self):
        return self.name


class Job1(Option1):
    # option = models.OneToOneField(Option, on_delete=models.CASCADE)
    money = models.FloatField()
    hours = models.IntegerField(default=40)
    duration = models.IntegerField()  # number of days e.g. 90 for 3 months

    class Meta(Option1.Meta):
        ordering = ['-name']
        verbose_name_plural = 'Jobs'


# Multi-table Model inheritance - unrelated Category model
# notice that Option2 has its own table but Option1 does not
class Option2(models.Model):
    name = models.CharField(max_length=255, null=True)
    categories = models.ManyToManyField(Category)

    class Meta:
        verbose_name_plural = "Options - 2"

    def __str__(self):
        return self.name


class Job2(Option2):
    option2_ptr = models.OneToOneField(
        Option2, on_delete=models.CASCADE, parent_link=True, primary_key=True)

    money = models.FloatField()
    hours = models.IntegerField(default=40)
    duration = models.IntegerField()  # number of days e.g. 90 for 3 months

    class Meta:
        verbose_name_plural = "Jobs - 2"
