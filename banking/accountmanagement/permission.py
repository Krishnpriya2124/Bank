from rest_framework import permissions
class AccountCreation(permissions.BasePermission):
   
    def has_permission(self, request, view):
     
     if request.user.usertype =="customer":
            return True

class AccountHandling(permissions.BasePermission):
    def has_permission(self, request, view):
     if request.user.usertype =="staff":
            return True