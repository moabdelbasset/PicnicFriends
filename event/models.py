from django.db import models
from django.contrib.auth.models import User

# EVENT MODEL


class Event(models.Model):
    name = models.CharField(max_length=150, null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    image = models.ImageField(upload_to="images/", null=True, blank=True)
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True)
    phone = models.CharField(max_length=20, null=False, blank=False)
    email = models.EmailField(max_length=254, null=False, blank=False)
    address = models. CharField(max_length=150, null=True, blank=False)
    longitude = models.FloatField()
    latitude = models.FloatField()
    attendees = models.IntegerField(default=0)
    event_date = models.DateTimeField()
    updated_date = models.DateTimeField(null=True)

    def __str__(self):
        return self.name
