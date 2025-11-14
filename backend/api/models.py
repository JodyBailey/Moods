from django.db import models
from django.core.validators import MaxLengthValidator
from django.contrib.auth.models import User

class Entry(models.Model):
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['date', 'user'], name="unique_entry_date")
        ]
    
    class SentimentChoices(models.IntegerChoices):
        HORRIBLE = 1
        VERY_BAD = 2
        BAD = 3
        KINDA_BAD = 4
        FINE = 5
        KINDA_GOOD = 6
        GOOD = 7
        VERY_GOOD = 8
        AMAZING = 9

    user = models.ForeignKey(
        User, related_name="entries", on_delete=models.CASCADE)
    sentiment = models.IntegerField(choices=SentimentChoices, null=False)
    date = models.DateField()
    edited = models.BooleanField(default=False)
    text = models.TextField(max_length=500, validators=[
        MaxLengthValidator(500, "Entry can not have more than 500 characters")
    ], null=True, blank=True)

    def __str__(self):
        return f'{self.user.username}\'s {self.get_sentiment_display()} entry on {self.date}'


class Activity(models.Model):
    entry = models.ForeignKey(
        Entry, related_name="activities", on_delete=models.CASCADE)
    name = models.CharField(max_length=50, validators=[
        MaxLengthValidator(
            50, "Activity name can not have more than 50 characters"),
    ])

    def __str__(self):
        return f'{self.name} activity for entry {self.entry.id}'


class Emotion(models.Model):
    entry = models.ForeignKey(
        Entry, related_name="emotions", on_delete=models.CASCADE)
    name = models.CharField(max_length=50, validators=[
        MaxLengthValidator(
            50, "Emotion name can not have more than 50 characters"),
    ])

    def __str__(self):
        return f'{self.name} emotion for entry {self.entry.id}'


class Contributor(models.Model):
    entry = models.ForeignKey(
        Entry, related_name="contributors", on_delete=models.CASCADE)
    name = models.CharField(max_length=50, validators=[
        MaxLengthValidator(
            50, "Contributor name can not have more than 50 characters"),
    ])

    def __str__(self):
        return f'{self.name} contributor for entry {self.entry.id}'
