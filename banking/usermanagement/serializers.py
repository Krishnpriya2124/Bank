from rest_framework import serializers  
from .models import User
from django.contrib.auth import get_user_model

from rest_framework.response import Response



class UserSerializer(serializers.ModelSerializer):
    email=serializers.EmailField()
    
    class Meta:
        model=User
        fields=('__all__')
  

    def create(self, validated_data):
                username=validated_data['username']
               
                email=validated_data['email']
                password=validated_data['password']
                user=User.objects.create_user(username=username,password=password,email=email)
                user.save()
                return user
   
            
   
    
    
