from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import User, Team, Activity, Workout, Leaderboard
from datetime import date


class ActivityModelTest(TestCase):
    def setUp(self):
        self.activity = Activity.objects.create(
            name='Running',
            description='Outdoor running session.',
            schedule='Mondays at 6am',
            max_attendance=20
        )

    def test_activity_creation(self):
        self.assertEqual(self.activity.name, 'Running')
        self.assertEqual(self.activity.max_attendance, 20)

    def test_activity_str(self):
        self.assertEqual(str(self.activity), 'Running')


class MangaManiacsActivityTest(TestCase):
    def setUp(self):
        self.activity = Activity.objects.create(
            name='Manga Maniacs',
            description='Explore the fantastic stories of the most interesting characters from Japanese Manga (graphic novels).',
            schedule='Tuesdays at 7pm',
            max_attendance=15
        )

    def test_manga_maniacs_creation(self):
        self.assertEqual(self.activity.name, 'Manga Maniacs')
        self.assertEqual(
            self.activity.description,
            'Explore the fantastic stories of the most interesting characters from Japanese Manga (graphic novels).'
        )
        self.assertEqual(self.activity.schedule, 'Tuesdays at 7pm')
        self.assertEqual(self.activity.max_attendance, 15)

    def test_manga_maniacs_str(self):
        self.assertEqual(str(self.activity), 'Manga Maniacs')


class ActivityAPITest(APITestCase):
    def setUp(self):
        Activity.objects.create(
            name='Running',
            description='Outdoor running session.',
            schedule='Mondays at 6am',
            max_attendance=20
        )
        Activity.objects.create(
            name='Manga Maniacs',
            description='Explore the fantastic stories of the most interesting characters from Japanese Manga (graphic novels).',
            schedule='Tuesdays at 7pm',
            max_attendance=15
        )

    def test_get_activities(self):
        url = reverse('activity-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_activities_contains_manga_maniacs(self):
        url = reverse('activity-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        if isinstance(data, dict) and 'results' in data:
            activities = data['results']
        else:
            activities = data
        names = [a['name'] for a in activities]
        self.assertIn('Manga Maniacs', names)

    def test_manga_maniacs_details(self):
        url = reverse('activity-list')
        response = self.client.get(url)
        data = response.json()
        if isinstance(data, dict) and 'results' in data:
            activities = data['results']
        else:
            activities = data
        manga = next((a for a in activities if a['name'] == 'Manga Maniacs'), None)
        self.assertIsNotNone(manga)
        self.assertEqual(manga['schedule'], 'Tuesdays at 7pm')
        self.assertEqual(manga['max_attendance'], 15)


class UserAPITest(APITestCase):
    def setUp(self):
        User.objects.create(name='Tony Stark', email='tony@avengers.com', password='ironman123')

    def test_get_users(self):
        url = reverse('user-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class LeaderboardAPITest(APITestCase):
    def setUp(self):
        user = User.objects.create(name='Tony Stark', email='tony@avengers.com', password='ironman123')
        Leaderboard.objects.create(user=user, score=1500)

    def test_get_leaderboard(self):
        url = reverse('leaderboard-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
