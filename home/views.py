from django.shortcuts import render
from profiles.models import Profile

# Home page view here.


def index(request):
    """ A view to return the index page """

    return render(request, 'home/index.html')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        profile = Profile.objects.get(user=self.request.user)
        context["profile"] = profile
