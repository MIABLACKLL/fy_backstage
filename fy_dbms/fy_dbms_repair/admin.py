from django.contrib import admin

# Register your models here.
from fy_dbms_repair import models

admin.site.register(models.FyStaff)
admin.site.register(models.FyUser)
admin.site.register(models.FyUserextend)