from django.shortcuts import render
from .serializers import AccountSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from accountmanagement.permission import AccountCreation, AccountHandling
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics
from usermanagement.models import User
from .models import Account

import random


class CreateAccount(generics.ListAPIView):
    permission_classes = [IsAuthenticated, AccountCreation]

    def post(self, request):
        userid = request.user.id
        print(userid)
        acc_type = request.data.get("acc_type")
        acc_no = self.generate_unique_account_number()
        try:
            user = User.objects.get(id=userid)
            print(user)

            try:
                account = Account.objects.get(user=user)
                return Response(
                    "Account already exist", status=status.HTTP_400_BAD_REQUEST
                )
            except Account.DoesNotExist:
                account = Account.objects.create(
                    user=user, acc_type=acc_type, acc_no=acc_no
                )
                return Response("account created successfully")

        except User.DoesNotExist:
            return Response("User not found", status=status.HTTP_404_NOT_FOUND)

    def generate_unique_account_number(self):
        while True:
            acc_no = random.randint(450000000, 5500000000)
            if not Account.objects.filter(acc_no=acc_no).exists():
                return acc_no


class CloseAccount(generics.ListAPIView):
    permission_classes = [IsAuthenticated, AccountCreation]

    def get(self, request):
        userid = request.user.id
        account = Account.objects.get(user=userid)
        serializers = AccountSerializer(account)
        return Response({"status": "success", "User": serializers.data}, status=200)

    def patch(self, request):
        try:
            userid = request.user.id
            account = Account.objects.get(user=userid)
            if account.acc_balance != 0.0:
                return Response("please withdraw the money")
            else:
                if account.acc_status == "closed":
                    return Response(
                        {"status": "Account Already Closed"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                else:
                    account.acc_status = "closed"
                    account.save()
                    return Response(
                        {"status": "account closed"}, status=status.HTTP_200_OK
                    )

        except Account.DoesNotExist:
            return Response(
                {"status": "account doestnot exist"}, status=status.HTTP_404_NOT_FOUND
            )


class AccountApproval(APIView):
    permission_classes = [IsAuthenticated, AccountHandling]

    def patch(self, request):
        try:
            id = request.data.get("id")
            account = Account.objects.get(id=id)
            account.acc_status = "approved"
            account.save()
            return Response({"status": "account aproved"}, status=status.HTTP_200_OK)
        except Account.DoesNotExist:
            return Response(
                {"status": "account doestnot exist"}, status=status.HTTP_400_BAD_REQUEST
            )


class PendingAccounts(generics.ListAPIView):
    permission_classes = [IsAuthenticated, AccountHandling]

    def get(self, request):
        result = Account.objects.filter(acc_status="pending")
        serializers = AccountSerializer(result, many=True)
        return Response({"status": "success", "customer": serializers.data}, status=200)


class AccountDetails(generics.ListAPIView):
    permission_classes = [IsAuthenticated, AccountCreation]

    def get(self, request):
        userid = request.user.id
        account = Account.objects.get(user=userid)
        serializers = AccountSerializer(account)
        return Response({"status": "success", "customer": serializers.data}, status=200)
