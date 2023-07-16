from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [ 
    path('events', views.all_events, name='all_events'), 
    path('add_event', views.add_event, name='add_event'),
    path('show_event/<event_id>', views.show_event, name='show_event'),
    path('update_event/<event_id>', views.update_event, name='update_event'),
    path('delete_event/<event_id>', views.delete_event, name='delete_event'),
    path('search_event/', views.search_event, name='search_event'),
]
