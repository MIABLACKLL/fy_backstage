"""fy_dbms URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path,re_path
from fy_dbms_repair import views
urlpatterns = [
    path(r'login/', views.adminLogin),
    #path(r'user/page/',views.getAllUser),
    path(r'staff/addconvention',views.renderConvention),
    path(r'index/user-list/',views.renderUserList),
    path(r'index/technician-list/',views.renderRapirList),
    path(r'index/',views.renderIndex),
    path(r'index/technician-list/technician-add',views.renderStaffAdd),
    path(r'staff/addMultiple',views.addMultipleStaff),
    path(r'staff/list/',views.getAllStaff),
    path(r'staff/nickname',views.selectStaff),
    path(r'staff/delete',views.deleteStaff),
    path(r'staff/addSingle',views.addSingleStaff),
    path(r'staff/update', views.updateStaff),
    re_path(r'^user/nickname$',views.selectAppUser),
    re_path(r'^index/technician-list/technician-modify$',views.renderStaffUpate)


]
handler404=views.pageNotFound
handler500=views.pageNotFound