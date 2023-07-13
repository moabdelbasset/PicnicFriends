from django.shortcuts import render

# Home page view here.


def index(request):
    """ A view to return the index page """

    return render(request, 'home/index.html')
