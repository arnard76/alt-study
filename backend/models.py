from django.db import models
from django.db.models import Q
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
import json

from django.db.models.fields import related

# categories = Category.objects.filter(name__icontains=query)


class Category(models.Model):
    class Meta:
        verbose_name_plural = 'Categories'

    # if same category is saved into a model, django.db.IntegrityError is raised before it is saved to db
    name = models.CharField(max_length=255, unique=True)
    levels = models.CharField(
        max_length=2048, default='["beginner", "intermediate", "proficient", "advanced"]')

    def __str__(self):
        return self.name

    def set_levels(self, x):
        self.levels = json.dumps(x)

    def get_levels(self):
        return json.loads(self.levels)


class Template(models.Model):
    class Meta:
        abstract = True

    name = models.CharField(max_length=255)
    description = models.CharField(
        max_length=1023, default='This option has no description. Big oof')
    # learning experience provider or job provider aka employer
    provider = models.CharField(max_length=255)
    categories = models.ManyToManyField(Category)

    def __str__(self):
        return "{provider}: {name}".format(provider=self.provider, name=self.name)

    # where x is a list of dictionaries e.g. [{"option_id": 1, "children": ["i2","c3","w1",]}, {}, {}, {}]
    def set_children(self, x):
        self.children = json.dumps(x)

    def get_children(self):
        return json.loads(self.children)


class Course(Template):
    code = models.CharField(max_length=50, unique=True)
    money = models.FloatField()
    degree = models.CharField(max_length=1024)

    def __str__(self):
        return '{provider}: {code}'.format(provider=self.provider, code=self.code)


class Tutoring(Template):  # and Mentoring (not sure the difference)
    class Meta:
        verbose_name_plural = 'Tutors'

    money = models.FloatField()


class Internship(Template):
    # money being received by company / default is $0 or unpaid
    money = models.FloatField(default=0)
    # in number of days / default is 90 days
    duration = models.FloatField(default=90)
    # average of daily hours / default is 6 hours a day
    daily_hours_average = models.FloatField(default=6)


class Job(Template):
    money = models.FloatField()
    # add more job properties/attributes here

    # def __str__(self):
    #     return '[Job] '+super().__str__()


class Option(models.Model):
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    # children = models.CharField(max_length=2048, null=True, default='[]')

    # @classmethod
    # def limit_children_choices(cls):
    # return ~Q(id=cls.id)
    # pass

    # children = models.ManyToManyField(
    #     'self', related_name='parent_option', symmetrical=False, blank=True)

    parent = models.ForeignKey(
        'self', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return "{option}".format(option=self.content_object)

    def get_option_branch(self):
        children = Option.objects.filter(
            parent=self.id)
        childrenList = []
        for child in children:
            childrenList.append(child.get_option_branch())
        return {'option': {'option_id': self.id, 'name': self.content_object.name, 'provider': self.content_object.provider, 'description': self.content_object.description}, 'children': childrenList}


class Pathway(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=1023)
    category = models.ManyToManyField(Category, related_name='pathways')
    pathway = models.TextField(default="{}")

    def __str__(self):
        return "{name}".format(name=self.name)

    # where start_option is an Option object id
    def set_pathway(self, start_option_id):
        pathway = Option.objects.get(id=start_option_id).get_option_branch()
        self.pathway = json.dumps(pathway)
        return self.pathway

    def get_pathway(self):
        return json.loads(self.pathway)
