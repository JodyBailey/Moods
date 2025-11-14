from django.contrib import admin
from .models import Entry, Emotion, Activity, Contributor

admin.site.register([Entry, Emotion, Activity, Contributor])

# Register your models here.
