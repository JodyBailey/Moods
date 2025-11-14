import math

from functools import reduce
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Entry
from .serializers import UserSerializer, EntrySerializer, StatisticsSerializer


class RegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class EntryListView(generics.ListAPIView):
    serializer_class = EntrySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Entry.objects.filter(user=self.request.user).order_by('-date')


class EntryCreateView(generics.CreateAPIView):
    serializer_class = EntrySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Entry.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            return serializer.save(user=self.request.user)
        else:
            print(f'Error creating entry: {serializer.errors}')


class EntryUpdateView(generics.UpdateAPIView):
    serializer_class = EntrySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Entry.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        if serializer.is_valid():
            return serializer.save(user=self.request.user)
        else:
            print(f'Error updating entry: {serializer.errors}')


class EntryDeleteView(generics.DestroyAPIView):
    serializer_class = EntrySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Entry.objects.filter(user=self.request.user)


class StatisticsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        entries = request.user.entries.all().order_by('date')

        if len(entries) == 0:
            return Response({
                'error': 'No entries'
            })

        emotions = [
            emotion for entry in entries for emotion in entry.emotions.all()]
        activities = [
            activity for entry in entries for activity in entry.activities.all()]
        contributors = [
            contributor for entry in entries for contributor in entry.contributors.all()]

        unique_emotions_count = self.get_unique_count(emotions)
        unique_activities_count = self.get_unique_count(activities)
        unique_contributors_count = self.get_unique_count(contributors)

        average_mood = self.get_average_mood_score(entries)
        contributor_scores = self.get_contributor_scores(contributors)
        main_contributors = self.main_contributors(
            contributor_scores)
        average_mood_timeline = self.get_average_mood_timeline(entries)

        return Response(StatisticsSerializer({
            'average_mood_score': average_mood,
            'activities_count': unique_activities_count,
            'emotions_count': unique_emotions_count,
            'contributors_count': unique_contributors_count,
            'main_contributors': main_contributors,
            'average_mood_timeline': average_mood_timeline
        }).data)

    def get_average_mood_timeline(self, entries):
        def acc_func(prev, curr):
            # curr[0] = index, curr[1] = entry
            if prev == None:
                return {'timeline': [{'date': curr[1].date, 'average': float(curr[1].sentiment)}], 'total': curr[1].sentiment}

            prev['total'] += curr[1].sentiment
            prev['timeline'].append(
                {'date': curr[1].date, 'average': round(prev['total'] / (curr[0] + 1), 2)})

            return prev

        average_mood_timeline = reduce(acc_func, list(
            enumerate(entries)), None)['timeline']

        return average_mood_timeline

    def get_unique_count(self, records):
        unique_count = {}

        for record in records:
            if record.name in unique_count.keys():
                unique_count[record.name] += 1
            else:
                unique_count[record.name] = 1

        return unique_count

    def get_average_mood_score(self, entries):
        total_score = reduce(
            lambda total, entry: entry.sentiment + total, entries, 0)

        return round(total_score / len(entries), 1)

    def get_contributor_scores(self, contributors):
        scores = {}

        for contributor in contributors:
            if contributor.name in scores.keys():
                scores[contributor.name]['total_score'] += int(
                    contributor.entry.sentiment)
                scores[contributor.name]['count'] += 1
            else:
                scores[contributor.name] = {}
                scores[contributor.name]['total_score'] = int(
                    contributor.entry.sentiment)
                scores[contributor.name]['count'] = 1

        for contributor in scores:
            scores[contributor] = round(
                scores[contributor]['total_score'] / scores[contributor]['count'], 1)

        return scores

    def main_contributors(self, contributor_scores):
        """Gets the contributors that contributed the most to a good and bad mood"""
        top_and_bottom_scores = {
            'top': [],
            'bottom': []
        }

        # We can not accurately guage what contributed the most to a good or bad mood if we only have one contributor
        if len(contributor_scores) == 1:
            return top_and_bottom_scores

        top_score = reduce(
            lambda prev, curr: contributor_scores[curr] if contributor_scores[curr] > prev else prev, contributor_scores, 0)
        bottom_score = reduce(lambda prev, curr: prev if prev <
                              contributor_scores[curr] else contributor_scores[curr], contributor_scores, math.inf)

        for contributor in contributor_scores:
            if contributor_scores[contributor] == top_score:
                top_and_bottom_scores['top'].append(
                    [contributor, contributor_scores[contributor]])
            elif contributor_scores[contributor] == bottom_score:
                top_and_bottom_scores['bottom'].append(
                    [contributor, contributor_scores[contributor]])

        return top_and_bottom_scores
