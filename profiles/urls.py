from django.urls import path
from .views import (
    ProfileView,
    EditProfile
    )

urlpatterns = [
    path('user/<slug:pk>/', ProfileView.as_view(), name="profile"),
    path('edit/<int:pk>/', EditProfile.as_view(), name='profile_edit'),
]
