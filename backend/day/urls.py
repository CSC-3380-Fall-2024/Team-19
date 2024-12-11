from django.urls import path, include
from .views import *

urlpatterns = [

    path("add", AddDay.as_view(), name="add_day"),
    #
    # path("list", ListDay.as_view(), name="list_day"),
    #
    # path("update", UpdateDay.as_view(), name="update_day"),
    #
    # path("delete/<int:pk>", DeleteDay.as_view(), name="delete_day"),




]