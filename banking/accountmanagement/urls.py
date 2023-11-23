from django.urls import path
from .views import CreateAccount,CloseAccount,AccountApproval,PendingAccounts,AccountDetails



urlpatterns=[
    
      path('create/', CreateAccount.as_view()),
      path('close/', CloseAccount.as_view()),
      path('approval/', AccountApproval.as_view()),
      path('pendinglist/', PendingAccounts.as_view()),
      path('close/', CloseAccount.as_view()),
      path('accountdetails/', AccountDetails.as_view()),
     ]