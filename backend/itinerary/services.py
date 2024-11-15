from datetime import datetime, timedelta
from unicodedata import category

from itinerary.models import Itinerary
from activity.models import Activity
from day.models import Day
from day.models import DayActivity


def create_itinerary(user, itinerary_title, start_date, end_date, destination, categories):

    itinerary = Itinerary.objects.create(user=user, title=itinerary_title, start_date=start_date, end_date=end_date, destination=destination)

    activities = Activity.objects.filter(category__in=categories)

    if not activities.exists():
        raise Exception("No activities found")

    days = []
    date = start_date
    for i in range((len(activities) // 3) +1):
        days.append(Day.objects.create(itinerary, date=date))
        date += timedelta(days=1)

    time_slots = [
        ("09:00:00", "11:00:00"),
        ("13:00:00", "15:00:00"),
        ("17:00:00", "19:00:00"),
    ]
    for idx, activity in enumerate(activities):
        day = days[idx // 3]  # Distribute activities evenly across days
        start_time, end_time = time_slots[idx % 3]
        DayActivity.objects.create(
            day=day, activity=activity, start_time=start_time, end_time=end_time
        )

    return itinerary
