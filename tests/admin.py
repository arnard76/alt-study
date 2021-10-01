from django.contrib import admin
from .models import *


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name']


@admin.register(Job1)
class JobAdmin(admin.ModelAdmin):
    list_display = ['name', 'money']


# admin.site.register(Option, admin.ModelAdmin)
admin.site.register(Option2, admin.ModelAdmin)
admin.site.register(Job2, JobAdmin)
