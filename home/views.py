from django.shortcuts import render
from profiles.models import Profile
from event.models import Event

# Home page view here.


def index(request):
    """ A view to return the index page """    

    events_script = list(Event.objects.values(
        'id',
        'name',
        'image',
        'event_date',
        'latitude',
        'longitude')[:20])

    data = {
        'events_script': events_script,
    }

    return render(request, 'home/index.html', data)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        profile = Profile.objects.get(user=self.request.user)
        context["profile"] = profile


