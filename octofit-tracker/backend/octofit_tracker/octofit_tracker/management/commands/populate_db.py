from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from datetime import date


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        User.objects.all().delete()

        self.stdout.write('Cleared existing data.')

        # Create users (superhero theme)
        users_data = [
            {'name': 'Tony Stark', 'email': 'tony@avengers.com', 'password': 'ironman123'},
            {'name': 'Steve Rogers', 'email': 'steve@avengers.com', 'password': 'cap123'},
            {'name': 'Natasha Romanoff', 'email': 'natasha@avengers.com', 'password': 'widow123'},
            {'name': 'Bruce Wayne', 'email': 'bruce@gotham.com', 'password': 'batman123'},
            {'name': 'Clark Kent', 'email': 'clark@dailyplanet.com', 'password': 'superman123'},
            {'name': 'Diana Prince', 'email': 'diana@themyscira.com', 'password': 'wonder123'},
        ]
        users = []
        for data in users_data:
            user = User.objects.create(**data)
            users.append(user)
        self.stdout.write(f'Created {len(users)} users.')

        # Create teams
        team_marvel = Team.objects.create(name='Team Marvel')
        team_marvel.members.set(users[:3])

        team_dc = Team.objects.create(name='Team DC')
        team_dc.members.set(users[3:])

        self.stdout.write('Created 2 teams: Team Marvel and Team DC.')

        # Create activities
        activities_data = [
            {
                'name': 'Running',
                'description': 'Outdoor or treadmill running to improve cardiovascular fitness.',
                'schedule': 'Mondays and Wednesdays at 6am',
                'max_attendance': 20,
            },
            {
                'name': 'Walking',
                'description': 'Brisk walking sessions for all fitness levels.',
                'schedule': 'Daily at 7am',
                'max_attendance': 30,
            },
            {
                'name': 'Strength Training',
                'description': 'Weight and resistance training for building muscle and endurance.',
                'schedule': 'Tuesdays and Thursdays at 5pm',
                'max_attendance': 15,
            },
            {
                'name': 'Yoga',
                'description': 'Mindful yoga sessions for flexibility, balance, and relaxation.',
                'schedule': 'Fridays at 8am',
                'max_attendance': 20,
            },
            {
                'name': 'Manga Maniacs',
                'description': 'Explore the fantastic stories of the most interesting characters from Japanese Manga (graphic novels).',
                'schedule': 'Tuesdays at 7pm',
                'max_attendance': 15,
            },
        ]
        activities = []
        for data in activities_data:
            activity = Activity.objects.create(**data)
            activities.append(activity)
        self.stdout.write(f'Created {len(activities)} activities.')

        # Create workouts
        workouts_data = [
            {'user': users[0], 'activity': 'Running', 'duration': 30, 'date': date(2024, 1, 15)},
            {'user': users[1], 'activity': 'Strength Training', 'duration': 45, 'date': date(2024, 1, 16)},
            {'user': users[2], 'activity': 'Yoga', 'duration': 60, 'date': date(2024, 1, 17)},
            {'user': users[3], 'activity': 'Walking', 'duration': 40, 'date': date(2024, 1, 15)},
            {'user': users[4], 'activity': 'Running', 'duration': 50, 'date': date(2024, 1, 16)},
            {'user': users[5], 'activity': 'Strength Training', 'duration': 35, 'date': date(2024, 1, 17)},
        ]
        for data in workouts_data:
            Workout.objects.create(**data)
        self.stdout.write(f'Created {len(workouts_data)} workouts.')

        # Create leaderboard entries
        leaderboard_data = [
            {'user': users[0], 'score': 1500},
            {'user': users[1], 'score': 1350},
            {'user': users[2], 'score': 1200},
            {'user': users[3], 'score': 1100},
            {'user': users[4], 'score': 950},
            {'user': users[5], 'score': 800},
        ]
        for data in leaderboard_data:
            Leaderboard.objects.create(**data)
        self.stdout.write(f'Created {len(leaderboard_data)} leaderboard entries.')

        self.stdout.write(self.style.SUCCESS('Successfully populated the database!'))
