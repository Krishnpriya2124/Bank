from django.shortcuts import render
from rest_framework import status
from .models import User
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from .permission import CustomerHandling, ManagerHandling, StaffHandling, Registration
from rest_framework import filters
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from accountmanagement.models import Account
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class UserRegistration(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        password = request.data.get("password")
        try:
            validate_password(password)
        except ValidationError as error:
            return Response(
                {"message": error.messages}, status=status.HTTP_400_BAD_REQUEST
            )
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"status": "success", "data": serializer.data},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"status": "error", "data": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST,
            )


class ListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated, CustomerHandling]

    def get(self, request):
        paginator = PageNumberPagination()
        result = User.objects.filter(usertype="customer")
        page = paginator.paginate_queryset(result, request)
        serializers = UserSerializer(page, many=True)
        response_data = {
            "count": paginator.page.paginator.count,
            "num_pages": paginator.page.paginator.num_pages,
            "current_page": paginator.page.number,
            "next_page": paginator.get_next_link(),
            "previous_page": paginator.get_previous_link(),
            "results": serializers.data,
        }
        return Response(response_data, status=status.HTTP_200_OK)


class ManagerView(generics.ListAPIView):
    permission_classes = [IsAuthenticated, ManagerHandling]
    def get(self, request):
        result = User.objects.filter(usertype="manager")
        serializers = UserSerializer(result, many=True)
        return Response({"status": "success", "customer": serializers.data}, status=200)


class StaffView(generics.ListAPIView):
    permission_classes = [IsAuthenticated, StaffHandling]

    def get(self, request):
        result = User.objects.filter(usertype="staff")
        serializers = UserSerializer(result, many=True)
        return Response({"status": "success", "customer": serializers.data}, status=200)


class CustomerUpdateView(APIView):
    permission_classes = [IsAuthenticated, CustomerHandling]

    def patch(self, request):
        try:
            id = request.data.get("id")
            print(id)
            user = User.objects.get(id=id)
            if user.usertype == "customer":
                serializer = UserSerializer(user, data=request.data, partial=True)
                if serializer.is_valid():
                    if serializer.save():
                        return Response(
                            {"status": "updated successfully", "data": serializer.data},
                            status=status.HTTP_200_OK,
                        )

                else:
                    return Response(
                        {"status": "error", "data": serializer.errors},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

            else:
                return Response(
                    {"status": "access denaid"}, status=status.HTTP_400_BAD_REQUEST
                )

        except User.DoesNotExist:
            return Response(
                {"status": "user doestnot exist"}, status=status.HTTP_400_BAD_REQUEST
            )


class StaffUpdateView(APIView):
    permission_classes = [IsAuthenticated, StaffHandling]

    def patch(self, request):
        try:
            id = request.data.get("id")
            print(id)
            user = User.objects.get(id=id)
            if user.usertype == "staff":
                serializer = UserSerializer(user, data=request.data, partial=True)
                if serializer.is_valid():
                    if serializer.save():
                        return Response(
                            {"status": "updated successfully", "data": serializer.data},
                            status=status.HTTP_200_OK,
                        )

                else:
                    return Response(
                        {"status": "error", "data": serializer.errors},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

            else:
                return Response(
                    {"status": "access denaid"}, status=status.HTTP_400_BAD_REQUEST
                )

        except User.DoesNotExist:
            return Response(
                {"status": "user doestnot exist"}, status=status.HTTP_400_BAD_REQUEST
            )


class SearchView(generics.ListAPIView):
    permission_classes = [IsAuthenticated, StaffHandling]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["usertype"]


class UserTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user=User):
        token = super().get_token(user)
        token["username"] = user.username
        token["usertype"] = user.usertype
        if user.usertype == "customer":
            try:
                account = Account.objects.get(user=user.id)
                print(account)
                token["acc_no"] = account.acc_no

            except Account.DoesNotExist:
                token["acc_no"] = ""
        return token


class UserTokenObtainPairView(TokenObtainPairView):
    serializer_class = UserTokenObtainPairSerializer
