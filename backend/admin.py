from django.contrib import admin
from .models import *


# @admin.register(Option)
class TemplateAdmin(admin.ModelAdmin):
    class Meta:
        list_display = ['name', 'provider']


admin.site.register(Option, TemplateAdmin)
admin.site.register(Course, TemplateAdmin)
admin.site.register(Internship, TemplateAdmin)
admin.site.register(Tutoring, TemplateAdmin)
admin.site.register(Job, TemplateAdmin)
admin.site.register(Category)
admin.site.register(Pathway)
