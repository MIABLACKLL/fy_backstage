import os,django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "fy_dbms.settings")# project_name 项目名称
django.setup()
from fy_dbms_repair import models
from django.test import TestCase
import json
# Create your tests here.


def getAllStaff():
    staff_list = models.FyStaff.objects.all().values('user_id','staff_id','email')
    staff_msg_list = []
    for staff in staff_list:
        try:
            staff_msg = models.FyUserextend.objects.get(user_id=staff['user_id'])
            staff_dict ={'staff_id': staff['staff_id'], 'name': staff_msg.name, 'phone': staff_msg.phone,
                         'eamil': staff['email']}
            staff_msg_list.append(staff_dict)
        except models.FyUserextend.DoesNotExist:
            print("查无此数据")

    print(staff_msg_list)


def getAllUser():
    user_set = models.FyUserextend.objects.all().values('user_id','name','phone','vip')
    print(list(user_set))


def addSingleStaff():
    staff_name="弋金凤"
    staff_email="327821546@qq.com"
    staff_phone="13060012956"
    try:
        staff_msg=models.FyUserextend.objects.get(name=staff_name,phone=staff_phone)
    except models.FyUserextend.DoesNotExist:
        print("未注册")
    try:
        models.FyStaff.objects.get(user_id=staff_msg.user_id)
    except models.FyStaff.DoesNotExist:
        models.FyStaff.objects.get_or_create(email=staff_email,user_id=staff_msg.user_id,
                                             last_time=0,status=0, refuse_order_id=0)
        print("添加成功")
    except:
        print("error")
    else:
        print("该用户已被添加")


getAllStaff()
getAllUser()
'''
addSingleStaff()
test=['name','test']
test_json=json.dumps(test)
print(test_json)
a=json.dumps(['1','2','3'])
print(json.loads(a)[0])
models.FyStaff.objects.get(user_id='1').delete()

a=json.dumps('abcd')
print(a)
'''