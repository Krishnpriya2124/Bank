
from django.test import TestCase

from rest_framework.test import APIRequestFactory
from rest_framework import status
from .models import User
from .views import UserRegistration
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from .views import StaffView,ListView,ManagerView,CustomerUpdateView,StaffUpdateView
from rest_framework.test import force_authenticate
from django.urls import reverse

# Create your tests here.
User=get_user_model()
factory=APIRequestFactory()
class TestUserSignUp(TestCase):
          
         


    def test_post(self):
         data={
             "username":"liya@gmail.com",
             "password":"123",
             "usertype":"customer",
             "email":"liya@gmail.com",
             "first_name":"liya"
         }
         request=factory.post('api/register/',data,format='json')
         view=UserRegistration.as_view()
         response=view(request)
         self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_post(self):
         data={
             "username":" ",
             "password":"short",
             "usetype":"test",
             "email":"Invalid",
             "first_name":"liya"
         }
         request=factory.post('api/register/',data,format='json')
         view=UserRegistration.as_view()
         response=view(request)
         self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class TestUserView(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        
        self.user1 = User.objects.create_user(username="staff@gmail.com",password="staffpassword",usertype='staff')
        self.user2 = User.objects.create_user(username="manager@gmail.com",password="managerpassword",usertype='manager')
        self.user3 = User.objects.create_user(username="customer@gmail.com",password="customerpassword",usertype='customer')
      
        self.token1, _ = Token.objects.get_or_create(user=self.user1)
        self.token2, _ = Token.objects.get_or_create(user=self.user2)
        self.token3, _ = Token.objects.get_or_create(user=self.user3)
        
      
      

    def test_get_customer_list(self):
        request=factory.get('customerlist/',format='json')
        force_authenticate(request, user=self.user1, token=self.token1)
        response = ListView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_customer_list(self):
        request=factory.get('customerlist/',format='json')
        # force_authenticate(request, user=self.user1, token=self.token1)
        response = ListView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_get_customer_list(self):
        request=factory.get('customerlist/',format='json')
        force_authenticate(request, user=self.user3, token=self.token3)
        response = ListView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_staff_list(self):
        request=factory.get('stafflist/',format='json')
        force_authenticate(request, user=self.user2, token=self.token2)
        response = ListView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_staff_list(self):
        request=factory.get('stafflist/',format='json')
        # force_authenticate(request, user=self.user2, token=self.token2)
        response = ListView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_staff_list(self):
        request=factory.get('stafflist/',format='json')
        force_authenticate(request, user=self.user3, token=self.token3)
        response = ListView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

class TestAcccountClose(TestCase):

    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = get_user_model().objects.create_user(username="customer@gmail.com",password="customerpassword",usertype="customer")
        self.user1 = get_user_model().objects.create_user(username="staff@gmail.com",password="staffpassword",usertype="staff")
        self.user2 = get_user_model().objects.create_user(username="manager@gmail.com",password="managerpassword",usertype="manager")
        self.token1, _ = Token.objects.get_or_create(user=self.user1)
        self.token2, _ = Token.objects.get_or_create(user=self.user2)
        self.token,_=Token.objects.get_or_create(user=self.user)
   
    def test_customerupdate(self):

        data={
             
             
                'first_name' : 'amal'
                
     
                        
        }
        id=self.token.user.id
        print("ID:>>>>>",id)
        request=factory.patch(f'updatecustomer/{id}',data,format='json')
        force=force_authenticate(request, user=self.user1, token=self.token1)
        print(force)
        view= CustomerUpdateView.as_view()
        response=view(request,id)
       
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data)

    def test_customerupdate(self):

        data={
             
             
                'first_name' : 'amal'
                
     
                        
        }
        id=self.user.id
        print("ID:>>>>>",id)
        request=factory.patch(f'updatecustomer/{id}',data,format='json')
        force=force_authenticate(request, user=self.user2, token=self.token2)
        print(force)
        view= CustomerUpdateView.as_view()
        response=view(request,id)
        # response.render()
        # print(response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_customerupdate(self):

        data={
             
             
                'first_name' : 'amal'
                
     
                        
        }
        id=self.user.id
        print("ID:>>>>>",id)
        request=factory.patch(f'updatecustomer/{id}',data,format='json')
        # force=force_authenticate(request, user=self.user2, token=self.token2)
        # print(force)
        view= CustomerUpdateView.as_view()
        response=view(request,id)
        # response.render()
        # print(response.content)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    
    def test_customerupdate(self):
        self.user = get_user_model().objects.create_user(username="custome@gmail.com",password="customerpassword",usertype="staff")
        data={
             
             
                'first_name' : 'amal'
                
     
                        
        }
        id=self.user.id
        print("ID:>>>>>",id)
        request=factory.patch(f'updatecustomer/{id}',data,format='json')
        force=force_authenticate(request, user=self.user2, token=self.token2)
        print(force)
        view= CustomerUpdateView.as_view()
        response=view(request,id)
        # response.render()
        # print(response.content)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_staffupdate(self):

        data={
             
             
                'first_name' : 'amal'
                
     
                        
        }
        id=self.token1.user.id
        print("ID:>>>>>",id)
        request=factory.patch(f'updatestaff/{id}',data,format='json')
        force=force_authenticate(request, user=self.user2, token=self.token2)
        print(force)
        view= StaffUpdateView.as_view()
        response=view(request,id)
        # response.render()
        # print(response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_staffupdate(self):

        data={
             
             
                'first_name' : 'amal'
                
     
                        
        }
        id=self.token1.user.id
        print("ID:>>>>>",id)
        request=factory.patch(f'updatestaff/{id}',data,format='json')
   
        view= StaffUpdateView.as_view()
        response=view(request,id)
       
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_staffupdate(self):

        data={
             
             
                'first_name' : 'amal'
                
     
                        
        }
        id=self.token1.user1.id
        print("ID:>>>>>",id)
        request=factory.patch(f'updatestaff/{id}',data,format='json')
        force=force_authenticate(request, user=self.user, token=self.token)
        print(force)
        view= StaffUpdateView.as_view()
        response=view(request,id)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_customerupdate(self):
        self.user1 = get_user_model().objects.create_user(username="staf@gmail.com",password="staffpassword",usertype="customer")
        data={
             
             
                'first_name' : 'amal'
                
     
                        
        }
        id=self.user1.id
        print("ID:>>>>>",id)
        request=factory.patch(f'updatecustomer/{id}',data,format='json')
        force=force_authenticate(request, user=self.user2, token=self.token2)
        print(force)
        view= CustomerUpdateView.as_view()
        response=view(request,id)
        # response.render()
        # print(response.content)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)




         





























