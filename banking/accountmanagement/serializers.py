from rest_framework import serializers  
from .models import Account

import random



class AccountSerializer(serializers.ModelSerializer):
    acc_no=serializers.CharField(default=random.randint(10000,99999)) 
    class Meta:
        model=Account
        fields='__all__'