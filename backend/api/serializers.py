from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Entry, Emotion, Activity, Contributor


class UserSerializer(serializers.ModelSerializer):
    confirmed_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'confirmed_password']
        extra_kwargs = {'password': {'write_only': True},
                        'confirmed_password': {'write_only': True}}

    def create(self, validated_data):
        user = User(email=validated_data['email'],
                    username=validated_data['username'])
        user.set_password(validated_data['password'])
        user.save()

        return user

    def validate(self, attrs):
        if attrs['password'] != attrs['confirmed_password']:
            raise serializers.ValidationError('Passwords must match')

        return attrs


class EmotionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Emotion
        fields = ['id', 'name']


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['id', 'name']


class ContributorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contributor
        fields = ['id', 'name']


class EntrySerializer(serializers.ModelSerializer):
    activities = ActivitySerializer(many=True)
    emotions = EmotionSerializer(many=True)
    contributors = ContributorSerializer(many=True)

    class Meta:
        model = Entry
        fields = ['id', 'user', 'sentiment', 'date', 'edited',
                  'text', 'activities', 'emotions', 'contributors']
        read_only_fields = ['user']
        
    def validate(self, attrs):
        if not attrs['emotions'] or not attrs['activities'] or not attrs['contributors']:
            raise serializers.ValidationError('Emotions, activities, and contributors are required')

        return attrs

    def create(self, validated_data):
        emotions_data = validated_data.pop('emotions')
        activities_data = validated_data.pop('activities')
        contributors_data = validated_data.pop('contributors')
        user_data = validated_data.pop('user')

        entry = Entry.objects.create(**validated_data, user=user_data)

        for emotion_data in emotions_data:
            Emotion.objects.create(**emotion_data, entry=entry)

        for activity_data in activities_data:
            Activity.objects.create(**activity_data, entry=entry)

        for contributor_data in contributors_data:
            Contributor.objects.create(**contributor_data, entry=entry)
        
        return entry

    def update(self, instance, validated_data):
        emotions_data = validated_data.pop('emotions')
        activities_data = validated_data.pop('activities')
        contributors_data = validated_data.pop('contributors')

        instance.sentiment = validated_data.get('sentiment', instance.sentiment)
        instance.date = validated_data.get('date', instance.date)
        instance.text = validated_data.get('text', instance.text)
        instance.edited = True

        instance.save()

        existing_emotion_names = [emotion.name for emotion in instance.emotions.all()]
        existing_activity_names = [activity.name for activity in instance.activities.all()]
        existing_contributor_names = [contributor.name for contributor in instance.contributors.all()]

        emotions_data_names = [emotion.get('name') for emotion in emotions_data]
        activity_data_names = [activity.get('name') for activity in activities_data]
        contributor_data_names = [contributor.get('name') for contributor in contributors_data]

        # Create emotions, activities, and contributors which have been added
        for name in emotions_data_names:
            if name not in existing_emotion_names:
                Emotion.objects.create(entry=instance, name=name)

        for name in activity_data_names:
            if name not in existing_activity_names:
                Activity.objects.create(entry=instance, name=name)

        for name in contributor_data_names:
            if name not in existing_contributor_names:
                Contributor.objects.create(entry=instance, name=name)

        # Delete emotions, activities, and contributors which are no longer present
        for name in existing_emotion_names:
            if name not in emotions_data_names:
                Emotion.objects.get(name=name, entry=instance).delete()

        for name in existing_activity_names:
            if name not in activity_data_names:
                Activity.objects.get(name=name, entry=instance).delete()

        for name in existing_contributor_names:
            if name not in contributor_data_names:
                Contributor.objects.get(name=name, entry=instance).delete()

        return instance
    
    
class StatisticsSerializer(serializers.Serializer):
    averageMoodScore = serializers.FloatField(source='average_mood_score')
    activitiesCount = serializers.DictField(source='activities_count')
    emotionsCount = serializers.DictField(source='emotions_count')
    contributorsCount = serializers.DictField(source='contributors_count')
    mainContributors = serializers.DictField(source='main_contributors')
    averageMoodTimeline = serializers.ListField(source='average_mood_timeline')
