from django.contrib import admin
from .models import Event


class EventtAdmin(admin.ModelAdmin):
    list_display = (
        'name', 'author', 'event_date', 'updated_date')

    list_filter = ('name', 'author', 'event_date', 'updated_date')

    readonly_fields = ('id',)


admin.site.register(Event, EventtAdmin)
