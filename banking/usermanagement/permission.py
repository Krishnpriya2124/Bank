from rest_framework import permissions

class CustomerHandling(permissions.BasePermission):
    def has_permission(self, request,view):

        if request.user.usertype =="staff" or request.user.usertype =="manager":
            return True
        else:
            return False
        
class ManagerHandling(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True
        

class StaffHandling(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.usertype =="manager":
            return True
        

class Registration(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.usertype =="customer":
            return True
   
    

 