from django.shortcuts import render
from django.http import HttpResponseRedirect
from . models import Event
from . forms import EventForm


# ADD EVENT VIEW


def add_event(request):
    if request.method == "POST":
        form = EventForm(request.POST or None)
        if form.is_valid():
            form.save()            
        return HttpResponseRedirect('/')
    else:
        form = EventForm()
    
    return render(request, 'events/add_event.html', {'form': form})