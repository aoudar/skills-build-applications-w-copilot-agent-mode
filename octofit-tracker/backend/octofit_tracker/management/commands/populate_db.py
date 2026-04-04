from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models


from octofit_tracker.models import Team, Activity, Workout, Leaderboard

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write(self.style.WARNING('Deleting old data...'))
        # Delete all data
        get_user_model().objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        self.stdout.write(self.style.SUCCESS('Creating test data...'))

        # Create Teams
        marvel = Team.objects.create(name='Team Marvel')
        dc = Team.objects.create(name='Team DC')

        # Create Users
        users = [
            {'email': 'ironman@marvel.com', 'username': 'ironman', 'team': marvel},
            {'email': 'captain@marvel.com', 'username': 'captain', 'team': marvel},
            {'email': 'batman@dc.com', 'username': 'batman', 'team': dc},
            {'email': 'superman@dc.com', 'username': 'superman', 'team': dc},
        ]
        user_objs = []
        for u in users:
            user = get_user_model().objects.create_user(email=u['email'], username=u['username'], password='password', team=u['team'])
            user_objs.append(user)

        # Create Activities
        Activity.objects.create(user=user_objs[0], type='run', duration=30, calories=200)
        Activity.objects.create(user=user_objs[1], type='cycle', duration=45, calories=350)
        Activity.objects.create(user=user_objs[2], type='swim', duration=60, calories=400)
        Activity.objects.create(user=user_objs[3], type='yoga', duration=50, calories=150)

        # Create Workouts
        Workout.objects.create(name='Morning Cardio', description='Cardio for all heroes', suggested_by=user_objs[0])
        Workout.objects.create(name='Strength Training', description='Strength for all heroes', suggested_by=user_objs[2])

        # Create Leaderboard
        Leaderboard.objects.create(team=marvel, points=550)
        Leaderboard.objects.create(team=dc, points=550)

        self.stdout.write(self.style.SUCCESS('Database populated with test data.'))


