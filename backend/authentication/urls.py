from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import *

urlpatterns = [

    path('admin/register/', UserRegistrationView.as_view(), name='admin_register'),

    path('customer/register/', CustomerSignUpView.as_view(), name='customer_register'),

    path('business/register/', BusinessSignUpView.as_view(), name='customer_register'),

    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', MyTokenRefreshView.as_view(), name='token_refresh'),

    path('api-auth/', include('rest_framework.urls')),



]