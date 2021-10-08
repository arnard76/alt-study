from django.http import HttpResponse
from .serializers import *
from .models import *
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
import json


def update_pathway(request, pathway_id=None):
    print(pathway_id)
    pathwayObj = Pathway.objects.get(id=pathway_id)
    first_option_id = pathwayObj.get_pathway()['option']['option_id']
    pathwayObj.set_pathway(first_option_id)
    pathwayObj.save()
    print(pathwayObj)
    return HttpResponse("<span style='font-weight: 700;'>This only updates the pathway if the first option in the pathway is still the same.</span><br><br>{pathway}".format(pathway=pathwayObj.pathway))


class GetCategories(generics.ListAPIView):
    serializer_class = CategorySerializer

    def get_queryset(self, *args,  **kwargs):
        # queryset_list = super(GetCategories, self).get_queryset(*args, **kwargs)
        queryset_list = Category.objects.all()
        query = self.request.GET.get("query")
        if query:
            queryset_list = queryset_list.filter(
                name__icontains=query
            )
        return queryset_list


class GetPathways(generics.ListAPIView):
    # overide get and post methods (sends to correct method automatically)
    serializer_class = PathwaySerializer

    def get_queryset(self, *args,  **kwargs):
        # queryset_list = super(GetCategories, self).get_queryset(*args, **kwargs)
        queryset_list = Pathway.objects.all()
        category_id = self.request.GET.get("category_id")
        pathway_id = self.request.GET.get("pathway_id")
        if category_id:
            queryset_list = queryset_list.filter(
                category=category_id
            )
        elif pathway_id:
            temp = Pathway.objects.filter(
                id=pathway_id
            )
            if len(temp) <= 1:
                queryset_list = temp

        print(queryset_list)
        return queryset_list


class GetOptions2(generics.ListAPIView):
    # overide get and post methods (sends to correct method automatically)
    # serializer_class = OptionSerializer

    def get_queryset(self, *args,  **kwargs):
        queryset_list = Option.objects.all()
        option_id = self.request.GET.get("option_id")
        if option_id:
            queryset_list = queryset_list.filter(
                id=option_id
            )
        print(queryset_list)
        return queryset_list


def create_courses(request):
    return HttpResponse('course to create')
