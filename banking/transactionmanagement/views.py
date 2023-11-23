from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from accountmanagement.models import Account
from rest_framework import status
from .models import transaction
from .serializers import TransactionSerializer
from django.http import HttpResponse
import csv
from .permission import TransactionHandling
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from usermanagement.models import User
from rest_framework.pagination import PageNumberPagination




class DepositView(APIView):
    permission_classes = [IsAuthenticated, TransactionHandling]

    def post(self, request):
        userid = request.user.id
        try:
            account = Account.objects.get(user=userid)

            deposit_amount = int(request.data.get("amount", 0))
            if account.acc_status == "approved":
                if deposit_amount > 0:
                    account.acc_balance = account.acc_balance + deposit_amount
                    account.save()
                    trans = transaction(
                        trans_type="deposit", amount=deposit_amount, acc_id=account.id
                    )
                    trans.save()
                    return Response({"status": "success"}, status=status.HTTP_200_OK)
                else:
                    return Response(
                        {"status": "error"}, status=status.HTTP_400_BAD_REQUEST
                    )
            else:
                return Response(
                    {"status": "Not Approved Customer"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Account.DoesNotExist:
            return Response(
                {"status": "Account Doesnot Exist"}, status=status.HTTP_403_FORBIDDEN
            )


class WithdrawView(APIView):
    permission_classes = [IsAuthenticated, TransactionHandling]

    def post(self, request):
        userid = request.user.id
        try:
            account = Account.objects.get(user=userid)

            account = Account.objects.get(user=userid)
            withdraw_amount = int(request.data.get("amount", 0.0))

            if account.acc_status == "approved":
                if account.acc_balance > withdraw_amount:
                    account.acc_balance = account.acc_balance - withdraw_amount
                    account.save()
                    trans = transaction(
                        trans_type="withdraw", amount=withdraw_amount, acc_id=account.id
                    )
                    trans.save()
                    return Response({"status": "success"}, status=status.HTTP_200_OK)
                else:
                    return Response(
                        {"status": "insufficient balance"},
                        status=status.HTTP_404_NOT_FOUND,
                    )
            else:
                return Response(
                    {"status": "Not Approved Customer"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Account.DoesNotExist:
            return Response(
                {"status": "Account Doesnot Exist"}, status=status.HTTP_403_FORBIDDEN
            )


class TransactionHistory(APIView):
    permission_classes = [IsAuthenticated, TransactionHandling]

    def get(self, request):
        userid = request.user.id

        account = Account.objects.get(user=userid)

        tran = transaction.objects.filter(acc=account.id)
        print(tran)

        response = HttpResponse(content_type="text/csv")
        response["Content-Disposition"] = 'attachment; filename="export.csv"'
        writer = csv.writer(response)
        writer.writerow(["accountId", "amount", "transaction type", "transactionDate"])
        for transactiondata in tran:
            writer.writerow(
                [
                    transactiondata.acc,
                    transactiondata.amount,
                    transactiondata.trans_type,
                    transactiondata.trans_date,
                ]
            )
        return response

   
class TransactionView(generics.ListAPIView):
    # permission_classes=[IsAuthenticated,TransactionHandling]

    def get(self, request):
        userid = request.user.id

        account = Account.objects.get(user=userid)

        tran = transaction.objects.filter(acc=account.id)
        tran = tran.order_by("-trans_date")
        serializers = TransactionSerializer(tran, many=True)

        return Response(
            {"status": "success", "transaction": serializers.data}, status=200
        )


class TransactionStaffView(generics.ListAPIView):
    # permission_classes=[IsAuthenticated,TransactionHandling]

    def get(self, request):
        paginator = PageNumberPagination()
        tran = transaction.objects.order_by("-trans_date")
        page = paginator.paginate_queryset(tran, request)
        serializers = TransactionSerializer(page, many=True)
        pageset = paginator.get_paginated_response(serializers.data)
        return pageset
