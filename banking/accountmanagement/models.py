from django.db import models

from django.db import models
from usermanagement.models import User
import random

class Account(models.Model):
    status=(('pending','pending'),('approved','approved'))
    user=models.ForeignKey(User,on_delete=models.CASCADE,blank=True)
    acc_type=models.CharField(max_length=25) 
    acc_no=models.BigIntegerField()
    acc_balance=models.DecimalField(max_digits=10,decimal_places=2,default=0.00)
    acc_status=models.CharField(default="pending",max_length=20,choices=status)
