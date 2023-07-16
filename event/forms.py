from django import forms
from django.forms.widgets import FileInput
from django.forms import ModelForm
from .models import Event


# EVENT FORM

class EventForm(forms.ModelForm):
    class Meta:
        model = Event
        fields = ('name', 'image', 'event_date', 'author', 'phone',
                  'email', 'address',
                  'longitude', 'latitude', 'attendees',
                  'description',
                  )

        labels = {
            'name': '',
            'image': '',
            'event_date': '',
            'author': '',
            'phone': '',
            'email': '',
            'address': '',
            'longitude': '',
            'latitude': '',
            'attendees': '',            
            'description': '',
        }

        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control \
                text-mute mb-3', 'placeholder': 'Event Name'}),
            'image': forms.FileInput(),            
            'author': forms.Select(attrs={'class': 'form-control \
                text-mute mb-2', 'placeholder': 'Organizer'}),
            'phone': forms.TextInput(attrs={'class': 'form-control \
                text-mute mb-3', 'placeholder': 'Phone no.'}),
            'email': forms.EmailInput(attrs={'class': 'form-control \
                mb-3', 'placeholder': 'Email'}),
            'address': forms.TextInput(attrs={'class': 'form-control \
                text-mute mb-3', 'placeholder': 'Ex: street, no, town, zipcode'}),
            'longitude': forms.TextInput(attrs={'class': 'form-control \
                text-mute mb-3', 'placeholder': 'Longitude'}),
            'latitude': forms.TextInput(attrs={'class': 'form-control \
                text-mute mb-3', 'placeholder': 'Latitude'}),
            'event_date': forms.TextInput(attrs={'type': 'datetime-local', 'class': 'form-control \
                text-mute mb-3 mt-3', 'placeholder': 'Event Date'}),
            'attendees': forms.NumberInput(attrs={'min': "0", 'class': 'form-control\
                text-mute mb-3', 'placeholder': 'Attendees'}),
            'description': forms.Textarea(attrs={
                'class': 'form-control', 'placeholder': 'Decribe Event'}),
         }