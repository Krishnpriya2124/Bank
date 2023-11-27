from django.test import TestCase
from rest_framework.test import APIRequestFactory, APIClient
from .views import *
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from rest_framework.test import force_authenticate
from .models import transaction
from .views import *
from django.urls import reverse

User = get_user_model()

factory = APIRequestFactory()


class TestDetails(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()

        self.user = get_user_model().objects.create_user(
            username="customer@gmail.com", password="customer", usertype="customer"
        )
        self.token, _ = Token.objects.get_or_create(user=self.user)
        self.account = Account.objects.create(
            user=self.user, acc_no="12345", acc_balance=1000, acc_status="approved"
        )

        self.user1 = get_user_model().objects.create_user(
            username="staff@gmail.com", password="staff", usertype="staff"
        )

    def test_DepositInvalidAmt(self):
        data = {"amount": -1}

        request = self.factory.post("transaction/deposit/", data, format="json")

        force_authenticate(request, user=self.user, token=self.token)
        response = DepositView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_DepositValidAmt(self):
        data = {
            "amount": 300,
        }
        request = self.factory.post("transaction/deposit/", data, format="json")

        force_authenticate(request, user=self.user, token=self.token)
        response = DepositView.as_view()(request)
        # print({response.content})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.account.refresh_from_db()
        self.assertEqual(self.account.acc_balance, 1300)

    def test_Deposit_unauthorized(self):
        data = {
            "amount": 300,
        }
        request = self.factory.post("transaction/deposit/", data, format="json")
        response = DepositView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_DepositInvalidUser(self):
        data = {
            "amount": 300,
        }
        request = self.factory.post("transaction/deposit/", data, format="json")

        force_authenticate(request, user=self.user1, token=self.token)
        response = DepositView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.account.refresh_from_db()
        self.assertEqual(self.account.acc_balance, 1000)

    def test_withdrawInvalidAmt(self):
        data = {"amount": -1}

        request = self.factory.post("transaction/withdraw/", data, format="json")

        force_authenticate(request, user=self.user, token=self.token)
        response = DepositView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_withdrawValidAmt(self):
        data = {
            "amount": 300,
        }
        request = self.factory.post("transaction/withdraw/", data, format="json")

        force_authenticate(request, user=self.user, token=self.token)
        response = DepositView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.account.refresh_from_db()

    def test_withdraw_unauthorized(self):
        data = {
            "amount": 300,
        }
        request = self.factory.post("transaction/deposit/", data, format="json")
        response = WithdrawView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.account.refresh_from_db()

    def test_withdrawInsufficientAmt(self):
        data = {
            "amount": 3000,
        }
        request = self.factory.post("transaction/withdraw/", data, format="json")

        force_authenticate(request, user=self.user, token=self.token)
        response = WithdrawView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_withdrawInvalidUser(self):
        data = {
            "amount": 300,
        }
        request = self.factory.post("transaction/deposit/", data, format="json")

        force_authenticate(request, user=self.user1, token=self.token)
        response = WithdrawView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.account.refresh_from_db()


class TestApprovedDetails(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()

        self.user = get_user_model().objects.create_user(
            username="customer@gmail.com", password="customer", usertype="customer"
        )
        self.token, _ = Token.objects.get_or_create(user=self.user)
        self.account = Account.objects.create(
            user=self.user, acc_no="1345", acc_balance=1000, acc_status="pending"
        )

        self.user1 = get_user_model().objects.create_user(
            username="staff@gmail.com", password="staff", usertype="staff"
        )

    def test_withdrawInsufficientAmt(self):
        data = {
            "amount": 300,
        }
        request = self.factory.post("transaction/withdraw/", data, format="json")
        force_authenticate(request, user=self.user, token=self.token)
        response = WithdrawView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)




class TestTransactionStaffView(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = TransactionStaffView.as_view()


        transaction.objects.create(trans_type="withdraw", amount=100,acc=3,trans_date="30-03-2023")
        transaction.objects.create(trans_type="deposit", amount=200,acc=3,trans_date="30-03-2023")

    def test_get_transactions(self):
        request = self.factory.get("transactions/")
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response, Response)


        self.assertIn('results', response.data)

       
        transactions_count = len(response.data['results'])
        self.assertEqual(transactions_count, transaction.objects.count())


        paginator = PageNumberPagination()
        tran = transaction.objects.order_by("-trans_date")
        page = paginator.paginate_queryset(tran, request)
        serializer = TransactionSerializer(page, many=True)
        self.assertEqual(response.data['results'], serializer.data)

  