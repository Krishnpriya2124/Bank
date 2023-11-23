from django.urls import path
from .views import UserRegistration
from .views import ListView,ManagerView,StaffView,CustomerUpdateView,StaffUpdateView,SearchView,UserTokenObtainPairView


urlpatterns=[
    
      path('api/register/', UserRegistration.as_view()),
      path('customerlist/', ListView.as_view()),
      path('managerlist/', ManagerView.as_view()),
      path('stafflist/', StaffView.as_view()),
      path('updatecustomer/', CustomerUpdateView.as_view()),
      path('updatestaff/', StaffUpdateView.as_view()),
       path('search/', SearchView.as_view()),
      # path('api/login/', UserTokenObtainPairView.as_view(), name='token_obtain_pair'),

      
]