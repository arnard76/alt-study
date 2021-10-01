from django.urls import path
from .views import *

urlpatterns = [
    path('get-categories/', GetCategories.as_view()),
    path('get-pathways/', GetPathways.as_view()),
    # path('get-options/', GetOptions.as_view()),
    path('create-courses/', create_courses),
]
