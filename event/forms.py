from django import forms
from django.forms import ModelForm
from .models import Event


# EVENT FORM

class EventForm(forms.ModelForm):
    class Meta:
        model = Event
        fields = ('name', 'description', 'author', 'phone',
                  'email',
                  'longitude', 'latitude', 'event_date',
                  )

        labels = {
            'name': '',
            'description': '',
            'author': '',
            'phone': '',
            'email': '',
            'longitude': '',
            'latitude': '',
            'event_date': '',
        }

        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control \
                text-mute mb-3', 'placeholder': 'Event Name'}),
            'description': forms.Textarea(attrs={
                'class': 'form-control', 'placeholder': 'Decribe Event'}),
            'author': forms.TextInput(attrs={'class': 'form-control \
                text-mute mb-3', 'placeholder': 'Organizer'}),
            'phone': forms.TextInput(attrs={'class': 'form-control \
                text-mute mb-3', 'placeholder': 'Phone no.'}),
            'email': forms.EmailInput(attrs={'class': 'form-control \
                mb-3', 'placeholder': 'Email'}),
            'longitude': forms.TextInput(attrs={'class': 'form-control \
                text-mute mb-3', 'placeholder': 'Longitude'}),
            'latitude': forms.TextInput(attrs={'class': 'form-control \
                text-mute mb-3', 'placeholder': 'Latitude'}),
            'event_date': forms.TextInput(attrs={'type':'datetime-local', 'class': 'form-control \
                text-mute mb-3', 'placeholder': 'Event Date'}),
            
         }

        