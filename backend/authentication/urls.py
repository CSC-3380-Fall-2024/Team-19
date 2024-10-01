from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import *

urlpatterns = [

    path('admin/register/', UserRegistrationView.as_view(), name='admin_register'),

    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('customer/register/', CustomerSignUpView.as_view(), name='customer_register'),

    path('business/register/', BusinessSignUpView.as_view(), name='customer_register'),

]