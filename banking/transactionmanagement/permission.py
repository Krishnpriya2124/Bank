from rest_framework import permissions

class TransactionHandling(permissions.BasePermission):
    def has_permission(self, request,view):
        print(request.user)
        if request.user.usertype =="customer":
            return True
        else:
            return False