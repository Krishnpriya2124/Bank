from django.db import models

from django.db import models
from accountmanagement.models import Account
class transaction(models.Model):
    acc=models.ForeignKey(Account,on_delete=models.CASCADE)
    amount=models.DecimalField(max_digits=10,decimal_places=2,default=0.00)
    trans_type=models.CharField(max_length=25)
    trans_date=models.DateField(auto_now_add=True)

