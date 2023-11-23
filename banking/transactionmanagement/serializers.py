from rest_framework import serializers  
from .models import transaction


class TransactionSerializer(serializers.ModelSerializer): 
    class Meta:
        model=transaction
        fields=('__all__')