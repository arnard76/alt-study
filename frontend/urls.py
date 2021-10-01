from django.urls import path
from .views import *

urlpatterns = [
    path('', index),
    path('pathway/<int:pathway_id>/', index),
    path('option/<str:option_type>/<int:option_id>/', index),
]
