from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponseRedirect
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from django.db.models import Q
from . models import Event
from . forms import EventForm


# ALL EVENTS


def all_events(request):
    event = Event.objects.all()
    page_num = request.GET.get('page', 1)
    paginator = Paginator(event, 2)

    try:
        page_obj = paginator.page(page_num)
    except PageNotAnInteger:
        # if page is not an integer, deliver the first page
        page_obj = paginator.page(1)
    except EmptyPage:
        # if the page is out of range, deliver the last page
        page_obj = paginator.page(paginator.num_pages)

    data = {
        'event':  page_obj,        
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

# SHOW EVENT DETAILS


def show_event(request, event_id):
    event = get_object_or_404(Event, pk=event_id)

    data = {
        'event': event,
    }
    return render(request, 'events/show_event.html', data)

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
