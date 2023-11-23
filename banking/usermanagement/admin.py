

from typing import Any
from django.contrib import admin
from django.db.models.query import QuerySet
from django.http.request import HttpRequest

# Register your models here.
from .models import User
# from .models import Login

class AdminView(admin.ModelAdmin):
    list_display=['username','email','password','first_name','last_name']
    def get_queryset(self, request):
        queryset=super(AdminView,self).get_queryset(request)
        queryset=queryset.filter(usertype='manager')| queryset.filter(usertype='staff')
        return queryset
admin.site.register(User,AdminView) 