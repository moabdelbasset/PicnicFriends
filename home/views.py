from django.shortcuts import render
from profiles.models import Profile
from event.models import Event
from django.db.models import Min
from datetime import datetime

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

    def home(request):
        closest_event = Event.objects.filter(event_date__gte=datetime.now()).order_by('event_date').first()
        return render(request, 'home/home.html', {'closest_event': closest_event})

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        profile = Profile.objects.get(user=self.request.user)
        context["profile"] = profile


