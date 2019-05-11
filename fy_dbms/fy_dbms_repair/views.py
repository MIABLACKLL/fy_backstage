from django.contrib import auth
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.http import HttpResponse,Http404
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from fy_dbms_repair import models
from django.core import serializers
import urllib
import json
import time

def pageNotFound(request,**kwargs):
    return render(request,'404.html')

@login_required
def renderIndex(request):
    return render(request,'index.html')
@login_required
def renderRapirList(request):
    return render(request,'technician-list.html')
@login_required
def renderConvention(request):
    return render(request,'addconvention.html')
@login_required
def renderStaffAdd(request):
    return render(request,'technician-add.html')
@login_required
def renderStaffUpate(request):
    return render(request,'technician-modify.html')

@csrf_exempt
def adminLogin(request):
    if request.method == 'POST':
        username = request.POST.get('username', '')
        password = request.POST.get('password', '')
        user = auth.authenticate(username=username,password=password)
        if user is not None and user.is_active:
            auth.login(request,user)
            return HttpResponse(json.dumps({'status':True,'data':username},ensure_ascii=False))
        else:
            return HttpResponse(json.dumps({'status':False},ensure_ascii=False))
    if request.method == 'GET':
        auth.logout(request)
        return render(request, 'login.html')


@csrf_exempt
@login_required
def renderUserList(request):
    user_db_list=models.FyUserextend.objects.all()
    user_temp_list=[]
    for user in user_db_list:
        vip_str='是' if user.vip=='\x01' else '否'
        user_temp_list.append({'user_id':user.user_id,'name':user.name,'phone':user.phone,'vip':vip_str})
    paginator=Paginator(user_temp_list,1)
    # 获取当前的页码数，默认为1
    page = request.GET.get("page", 1)
    # 把当前的页码数转换为整数类型
    currentPage = int(page)
    # 设定显示范围
    page_range = list(range(max(currentPage - 1, 1), currentPage)) + \
                 list(range(currentPage, min(currentPage + 1, paginator.num_pages) + 1))
    try:
        user_list = paginator.page(page)  # 获取当前页码的记录
    except PageNotAnInteger:
        user_list = paginator.page(1)  # 如果用户输入的页码不是整数时,显示第1页的内容
    except EmptyPage:
        user_list = paginator.page(paginator.num_pages)  # 如果用户输入的页码不是整数时,显示第1页的内容
    return render(request,'user-list.html',locals())

'''
def adminLogout(request):
    auth.logout(request)
    return HttpResponseRedirect('/login')
@login_required
@csrf_exempt
def getAllUser(request):
    if request.method=='POST':
        user_list = models.FyUserextend.objects.all().values('user_id','name','phone','vip')
        user_list = list(user_list)
        return HttpResponse(json.dumps(user_list,ensure_ascii=False), content_type="application/json.charset=utf-8")
    else:
        return render(request, 'user-list.html')

'''

@login_required
@csrf_exempt
def getAllStaff(request):
    if request.method=='POST':
        staff_list = models.FyStaff.objects.all().values('user_id','staff_id','email','status','last_time')
        staff_msg_list = []
        for staff in staff_list:
            try:
                staff_msg = models.FyUserextend.objects.get(user_id=staff['user_id'])
            except models.FyUserextend.DoesNotExist:
                continue
            staff_dict = {'staff_id': staff['staff_id'], 'name': staff_msg.name, 'phone': staff_msg.phone,
                         'email': staff['email'],'status':staff['status'],'last_time':time.asctime(time.localtime(staff['last_time']))}
            staff_msg_list.append(staff_dict)
        return HttpResponse(json.dumps(staff_msg_list,ensure_ascii=False), content_type="application/json.charset=utf-8")
    else:
        return render(request, 'technician-list.html')



@login_required
@csrf_exempt
def selectAppUser(request):
    if request.method=='GET':
        user_name=request.GET.get('nickname','')
        user_name = urllib.parse.unquote(user_name)
        user_queryset=models.FyUserextend.objects.filter(name__contains=user_name)
        user_queryset=serializers.serialize("json",user_queryset)
        user_queryset=json.loads(user_queryset)
        user_list=[]
        for user in user_queryset:
            user_list.append(user['fields'])
        return HttpResponse(json.dumps(user_list,ensure_ascii=False),content_type="application/json.charset=utf-8")
    if request.method == 'POST':
            return HttpResponse(json.dumps("Can not be posted!", ensure_ascii=False)
                                ,content_type="application/json.charset=utf-8")


@login_required
@csrf_exempt
def selectStaff(request):
    if request.method=='POST':
        staff_name=request.POST.get('name','')
        staff_list = models.FyUserextend.objects.filter(name__contains=staff_name)
        staff_msg_list = []
        for staff in staff_list:
            try:
                staff_msg = models.FyStaff.objects.get(user_id=staff.user_id)
            except models.FyStaff.DoesNotExist:
                continue
            staff_dict = {'staff_id': staff_msg.staff_id, 'name': staff.name, 'phone': staff.phone,
                          'email': staff_msg.email, 'status': staff_msg.status, 'last_time': time.asctime(time.localtime(staff_msg.last_time))}
            staff_msg_list.append(staff_dict)
        return HttpResponse(json.dumps(staff_msg_list, ensure_ascii=False),content_type="application/json.charset=utf-8")
    if request.method=='GET':
        return HttpResponse(json.dumps("Only can be posted!", ensure_ascii=False),
                            content_type="application/json.charset=utf-8")


@login_required
@csrf_exempt
def addSingleStaff(request):
    if request.method=='POST':
        staff_name=request.POST.get('name','')
        staff_email=request.POST.get('email','')
        staff_phone=request.POST.get('phone','')
        staff_status=request.POST.get('status','')
        try:
            staff_msg=models.FyUserextend.objects.get(name=staff_name,phone=staff_phone)
        except models.FyUserextend.DoesNotExist:
            return HttpResponse(json.dumps("该手机号未在小程序中注册！", ensure_ascii=False),
                                content_type="application/json.charset=utf-8")
        try:
            models.FyStaff.objects.get(user_id=staff_msg.user_id)
        except models.FyStaff.DoesNotExist:
            models.FyStaff.objects.create(email=staff_email, user_id=staff_msg.user_id,
                                                 last_time=0, status=staff_status, refuse_order_id=0)
            return HttpResponse(json.dumps("添加成功", ensure_ascii=False),
                                content_type="application/json.charset=utf-8")
        except:
            return HttpResponse(json.dumps("发生未知错误，请稍后重试或联系管理员！", ensure_ascii=False),
                                content_type="application/json.charset=utf-8")
        else:
            return HttpResponse(json.dumps("该维修员已存在！",ensure_ascii=False),
                                content_type="application/json.charset=utf-8")
    if request.method=='GET':
        return HttpResponse(json.dumps("Only can be posted!", ensure_ascii=False),
                            content_type="application/json.charset=utf-8")


@login_required
@csrf_exempt
def addMultipleStaff(request):
    if request.method == 'POST':
        #return HttpResponse(request.body,content_type="application/json.charset=utf-8")
        staff_msg_json=json.loads(request.body)
        invalid_name={}
        for staff_msg in staff_msg_json:
            try:
                user_msg = models.FyUserextend.objects.get(name=staff_msg['name'], phone=staff_msg['phone'])
            except KeyError:
                return HttpResponse(json.dumps("Excel格式错误！请参考批量添加公约", ensure_ascii=False),
                                    content_type="application/json.charset=utf-8")
            except models.FyUserextend.DoesNotExist:
                invalid_name[staff_msg['phone']]=staff_msg['name']
                continue
            try:
                models.FyStaff.objects.get(user_id=user_msg.user_id)
            except models.FyStaff.DoesNotExist:
                try:
                    models.FyStaff.objects.create(email=staff_msg['email'], user_id=user_msg.user_id, status=staff_msg['status'],
                                                        last_time=0, refuse_order_id=0)
                except KeyError:
                    return HttpResponse(json.dumps("Excel格式错误！请参考批量添加公约", ensure_ascii=False),
                                        content_type="application/json.charset=utf-8")
            except:
                return HttpResponse(json.dumps("发生未知错误，请稍后重试或联系管理员！", ensure_ascii=False),
                                    content_type="application/json.charset=utf-8")
        if invalid_name:
            return HttpResponse(json.dumps(str(invalid_name)+"用户未在小程序中注册", ensure_ascii=False),
                                content_type="application/json.charset=utf-8")
        else:
            return HttpResponse(json.dumps("导入成功！", ensure_ascii=False),
                                content_type="application/json.charset=utf-8")
    if request.method == 'GET':
        return HttpResponse(json.dumps("Only can be posted!", ensure_ascii=False),
                            content_type="application/json.charset=utf-8")

@login_required
@csrf_exempt
def deleteStaff(request):
    if request.method=='POST':
        request_str=request.body
        try:
            # 解析字符串将返回列表最后一位元素后的','删去
            request_str=request_str[:len(request_str)-3]+request_str[len(request_str)-2:]
            request_dict = json.loads(request_str)
            staff_id_list = request_dict['data']
        except json.decoder.JSONDecodeError:
            return HttpResponse(json.dumps("未选择任何技术员！", ensure_ascii=False),
                                content_type="application/json.charset=utf-8")
        for staff_id_dict in staff_id_list:
            for key in staff_id_dict:
                try:
                    models.FyStaff.objects.get(staff_id=staff_id_dict[key]).delete()
                except models.FyStaff.DoesNotExist:
                    continue
                except :
                    return HttpResponse(json.dumps("发生未知错误，请联系管理员或重试！", ensure_ascii=False),
                                        content_type="application/json.charset=utf-8")
        return HttpResponse(json.dumps("删除成功！", ensure_ascii=False),content_type="application/json.charset=utf-8")
    if request.method=='GET':
        return HttpResponse(json.dumps("Only can be posted!", ensure_ascii=False),
                            content_type="application/json.charset=utf-8")


@login_required
@csrf_exempt
def updateStaff(request):
    if request.method == 'POST':
        staff=json.loads(request.body)
        try:
            models.FyStaff.objects.filter(staff_id=staff['staff_id']).update(email=staff['email'],status=staff['status'])
            #models.FyUserextend.objects.get(user_id=staff['user_id']).update(name=staff['name'],phone=staff['phone'])
        except models.FyStaff.DoesNotExist:
            return HttpResponse(json.dumps("该技术员不存在！", ensure_ascii=False),
                                content_type="application/json.charset=utf-8")
        except :
            return HttpResponse(json.dumps("发生未知错误，请稍后重试或联系管理员！", ensure_ascii=False),
                                content_type="application/json.charset=utf-8")
        else:
            return HttpResponse(json.dumps("修改成功！", ensure_ascii=False),
                                content_type="application/json.charset=utf-8")
    if request.method=='GET':
        return HttpResponse(json.dumps("Only can be posted!", ensure_ascii=False),
                            content_type="application/json.charset=utf-8")
