from django.urls import path

from .views import DepositView,WithdrawView,TransactionHistory,TransactionView,TransactionStaffView


urlpatterns=[
    
      path('deposit/', DepositView.as_view() ,name="deposit"),
      path('withdraw/', WithdrawView.as_view()),
      path('statement/', TransactionHistory.as_view()),
      path('transactions/', TransactionView.as_view()),
      path('transactionsview/', TransactionStaffView.as_view()),
      
     
      
]