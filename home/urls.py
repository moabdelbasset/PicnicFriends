from django.contrib import admin
from django.urls import path
from . import views
from .views import user_profile_view

urlpatterns = [
    path('', views.index, name='home'),
    path('profiles/', user_profile_view, name='user_profiles'),
]
