from django.shortcuts import render


def index(request, *args, **kwargs):
    print(args, kwargs)
    return render(request, './frontend/index.html')
