from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [  
    path('add_event', views.add_event, name='add_event'),

]
