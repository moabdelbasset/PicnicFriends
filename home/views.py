from django.shortcuts import render
from .models import UserProfile


# Home page view here.

def index(request):
    """ A view to return the index page """

    return render(request, 'home/index.html')

# User profile view


def user_profile_view(request):
    profiles = UserProfile.objects.all()
    return render(request, 'user_profile.html', {'profiles': profiles})
