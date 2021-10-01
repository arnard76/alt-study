from rest_framework import serializers
from .models import *


# class OptionObjectRelatedField(serializers.RelatedField):
#     def to_representation(self, value):
#         if isinstance(value, Course):
#             return 'Course: ' + value.name
#         elif isinstance(value, Job):
#             return 'Job: ' + value.name
#         elif isinstance(value, Internship):
#             return 'Internship: ' + value.name
#         elif isinstance(value, Tutoring):
#             return 'Tutoring: ' + value.name
#         raise Exception('Unexpected type of tagged object')


# class OptionSerializer(serializers.HyperlinkedModelSerializer):
#     actor = OptionObjectRelatedField(read_only=True)
#     target = OptionObjectRelatedField(read_only=True)

#     class Meta:
#         model = Option
#         fields = ('url', 'actor', 'verb', 'target', 'pub_date')


class PathwaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Pathway
        fields = ('id', 'name', 'description', 'pathway')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'levels')


# example of serializer that sends payload i.e. post request
# class CreatePathwaySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Pathway
#         fields = ('id', 'name', 'desc', 'pathway')  # inputs of pathway
