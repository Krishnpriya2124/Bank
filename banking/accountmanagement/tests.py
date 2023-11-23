from django.test import TestCase
from rest_framework.test import APIRequestFactory
from .views import CreateAccount, PendingAccounts, CloseAccount, AccountApproval
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from rest_framework.test import force_authenticate
from .models import Account

User = get_user_model()

factory = APIRequestFactory()


class TestAcccountCreation(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = get_user_model().objects.create_user(
            username="customer@gmail.com",
            password="customerpassword",
            usertype="customer",
        )
        self.user1 = get_user_model().objects.create_user(
            username="staff@gmail.com", password="staffpassword", usertype="staff"
        )
        self.user2 = get_user_model().objects.create_user(
            username="manager@gmail.com", password="managerpassword", usertype="manager"
        )
        self.token, _ = Token.objects.get_or_create(user=self.user)
        self.token1, _ = Token.objects.get_or_create(user=self.user1)
        self.token1, _ = Token.objects.get_or_create(user=self.user2)

    def test_AccountCreate(self):
        data = {"acc_type": "savings"}
        request = factory.post("account/create/", data, format="json")
        force = force_authenticate(request, user=self.user, token=self.token)
        print(force)
        view = CreateAccount.as_view()
        response = view(request)
        print(response)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_AccountCreate(self):
        data = {"acc_type": "savings"}
        request = factory.post("account/create/", data, format="json")
        # force=force_authenticate(request, user=self.user, token=self.token)
        # print(force)
        view = CreateAccount.as_view()
        response = view(request)
        print(response)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_AccountCreate(self):
        data = {"acc_type": "savings"}
        request = factory.post("account/create/", data, format="json")
        force = force_authenticate(request, user=self.user1, token=self.token1)
        view = CreateAccount.as_view()
        response = view(request)
        print(response)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class TestAcccountView(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()

        self.user1 = User.objects.create_user(
            username="staff@gmail.com", password="staffpassword", usertype="staff"
        )
        self.token1, _ = Token.objects.get_or_create(user=self.user1)

    def test_get_pendingaccount_list(self):
        request = factory.get("account/pendinglist/", format="json")
        force_authenticate(request, user=self.user1, token=self.token1)
        response = PendingAccounts.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestAcccountClose(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = get_user_model().objects.create_user(
            username="manager@gmail.com",
            password="managerpassword",
            usertype="customer",
        )
        self.token, _ = Token.objects.get_or_create(user=self.user)
        self.account = Account.objects.create(
            user=self.user, acc_status="approved", acc_no=45345
        )

    def test_close(self):
        data = {"acc_status": "closed"}
        request = factory.patch("account/close/", data, format="json")
        force = force_authenticate(request, user=self.user, token=self.token)
        print(force)
        view = CloseAccount.as_view()
        response = view(request)
        print(response)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_close(self):
        data = {"acc_status": "closed"}
        request = factory.patch("account/close/", data, format="json")
        view = CloseAccount.as_view()
        response = view(request)
        print(response)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestAcccountApproval(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = get_user_model().objects.create_user(
            username="staff@gmail.com", password="staffpassword", usertype="staff"
        )
        self.user1 = get_user_model().objects.create_user(
            username="customer@gmail.com",
            password="customerpassword",
            usertype="customer",
        )
        self.token, _ = Token.objects.get_or_create(user=self.user)
        self.token1, _ = Token.objects.get_or_create(user=self.user1)
        self.account = Account.objects.create(
            user=self.user, acc_status="pending", acc_no=45345
        )

    def test_account_approval(self):
        data = {"acc_status": "approved"}
        id = self.token.user.id
        request = factory.patch(f"account/approval/{id}", data, format="json")
        force = force_authenticate(request, user=self.user, token=self.token)
        print(force)
        view = AccountApproval.as_view()
        response = view(request, id)
        print(response)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_account_approval(self):
        data = {"acc_status": "approved"}
        id = self.token.user.id
        request = factory.patch(f"account/approval/{id}", data, format="json")

        view = AccountApproval.as_view()
        response = view(request, id)
        print(response)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_account_approval(self):
        data = {"acc_status": "approved"}
        id = self.token.user.id
        request = factory.patch(f"account/approval/{id}", data, format="json")
        force = force_authenticate(request, user=self.user1, token=self.token1)
        print(force)
        view = AccountApproval.as_view()
        response = view(request, id)
        print(response)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

