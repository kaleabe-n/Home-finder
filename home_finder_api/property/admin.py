from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Property)
admin.site.register(PropertyImage)
admin.site.register(Address)
admin.site.register(Type)