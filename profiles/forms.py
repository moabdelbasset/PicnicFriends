from django import forms
from .models import Profile


class ProfileForm(forms.ModelForm):
    """Form to create a profile"""

    class Meta:
        model = Profile
        fields = ["user", "image", "bio", "location"]

        labels = {"user": "User Name", "image": "Image", "bio": "Bio", "location": "location"}