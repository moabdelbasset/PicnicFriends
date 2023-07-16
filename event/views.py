from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.db.models import Q
from . models import Event
from . forms import EventForm



# ALL EVENTS

def all_events(request):
    event = Event.objects.all()

    data = {
        'event': event,
    }
    return render(request, 'events/all_events.html', data)

# ADD EVENT VIEW


def add_event(request):
    if request.method == "POST":
        form = EventForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()                    
        return HttpResponseRedirect('/')
    else:
        form = EventForm()
    
    return render(request, 'events/add_event.html', {'form': form})

# UPDATE AN EVENT VIEW


def update_event(request, event_id):
    event = Event.objects.get(pk=event_id)
    form = EventForm(request.POST or None, instance=event)
    if form.is_valid():
        form.save()
        return redirect('all_events')
    data = {
        'event': event,
        'form': form,
    }
    return render(request, 'events/update_event.html', data)

# DELETE AN EVENT VIEW


def delete_event(request, event_id):
    event = Event.objects.get(pk=event_id)
    event.delete()
    return redirect('all_events')

# SEARCH EVENT VIEW


def search_event(request):
    if request.method == 'POST':
        search_query = request.POST['search_query']
        event = Event.objects.filter(Q(name__icontains=search_query) | Q(description__icontains=search_query))
        return render(request, 'events/all_events.html', {'query': search_query, 'event': event})
    else:
        return render(request, 'events/all_events.html', {})

    
