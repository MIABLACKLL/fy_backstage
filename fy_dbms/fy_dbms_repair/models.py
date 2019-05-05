# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class FyComputer(models.Model):
    computer_id = models.AutoField(primary_key=True)
    user_id = models.IntegerField()
    brand = models.CharField(max_length=16)
    model = models.CharField(max_length=16)
    buy_time = models.IntegerField()
    time = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'fy_computer'


class FyConfig(models.Model):
    key = models.CharField(unique=True, max_length=50)
    type = models.CharField(max_length=10)
    value = models.TextField()
    description = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'fy_config'


class FyOrder(models.Model):
    order_id = models.AutoField(primary_key=True)
    number = models.CharField(unique=True, max_length=16)
    user_id = models.IntegerField()
    staff_id = models.IntegerField()
    time = models.IntegerField()
    status = models.IntegerField()
    vip = models.IntegerField()
    distribute_time = models.IntegerField()
    computer_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'fy_order'


class FyOrderextend(models.Model):
    orderextend_id = models.AutoField(primary_key=True)
    order_id = models.IntegerField()
    description = models.TextField()

    class Meta:
        managed = False
        db_table = 'fy_orderextend'


class FyStaff(models.Model):
    staff_id = models.AutoField(primary_key=True)
    email = models.CharField(max_length=64)
    user_id = models.IntegerField(unique=True)
    status = models.IntegerField()
    last_time = models.IntegerField()
    refuse_order_id = models.IntegerField()
    month_refuse_max = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'fy_staff'


class FyUser(models.Model):
    user_id = models.AutoField(primary_key=True)
    ucid = models.CharField(unique=True, max_length=32)

    class Meta:
        managed = False
        db_table = 'fy_user'


class FyUserextend(models.Model):
    userextend_id = models.AutoField(primary_key=True)
    user_id = models.IntegerField(unique=True)
    name = models.CharField(max_length=16)
    phone = models.CharField(max_length=16)
    register_time = models.IntegerField()
    vip = models.TextField()  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'fy_userextend'


class FyWxpush(models.Model):
    id = models.IntegerField(primary_key=True)
    openid = models.CharField(unique=True, max_length=50)
    formid = models.CharField(max_length=50)
    expire_time = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'fy_wxpush'


class FyWxuser(models.Model):
    user_id = models.CharField(unique=True, max_length=50)
    openid = models.CharField(unique=True, max_length=50)
    last_update = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'fy_wxuser'
