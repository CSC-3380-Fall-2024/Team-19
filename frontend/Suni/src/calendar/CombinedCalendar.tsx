import React, { useState, useCallback } from 'react'
import { Calendar, momentLocalizer, SlotInfo } from 'react-big-calendar'
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { EventItem } from './events/eventTypes'
import { EVENTS } from './events/eventConstants'
import FoodEvent from './events/FoodEvent'
import ActivityEvent from './events/ActivityEvent'
import EntertainmentEvent from './events/EntertainmentEvent'
import TransportationEvent from './events/TransportationEvent'
import AddEvent from './events/AddEvent'
// import AddWeatherEventModal from './weather/AddWeatherEventModel'

import clouds from '../assets/backgrounds/clouds.png';
import morningClear from '../assets/weather/morning-clear.png';
import middayClear from '../assets/weather/midday-clear.jpg';
import afternoonClear from '../assets/weather/afternoon-clear.png';
import nightClear from  '../assets/weather/night-clear.png';
import nightClouds from '../assets/weather/night-clouds.png';
import rain from '../assets/weather/rain.png';


const localizer = momentLocalizer(moment)

type CalendarEvent = EventItem;

const DnDCalendar = withDragAndDrop<CalendarEvent, object>(Calendar as any);

export default function CombinedCalendar() {
  const [events, setEvents] = useState<EventItem[]>(EVENTS)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null)

  const EventComponent: React.FC<{ event: CalendarEvent }> = ({ event }) => {
    if (event.data.food) {
      return <FoodEvent food={event.data.food} />;
    }
    if (event.data.activity) {
      return <ActivityEvent activity={event.data.activity} />;
    }
    if (event.data.entertainment) {
      return <EntertainmentEvent entertainment={event.data.entertainment} />;
    }
    if (event.data.transportation) {
      return <TransportationEvent transportation={event.data.transportation} />;
    }
    return <div>{event.title}</div>;
  }

  const onEventDrop: withDragAndDropProps['onEventDrop'] = useCallback(
    (data: any) => {
      const { event, start, end } = data
      setEvents((currentEvents) => 
        currentEvents.map((ev) => 
          ev.resourceID === event.resourceID ? { ...ev, start, end } : ev
        )
      )
    },
    []
  )

  const onEventResize: withDragAndDropProps['onEventResize'] = useCallback(
    (data: any) => {
      const { event, start, end } = data
      setEvents((currentEvents) => 
        currentEvents.map((ev) => 
          ev.resourceID === event.resourceID ? { ...ev, start, end } : ev
        )
      )
    },
    []
  )

  const handleSelectSlot = useCallback(
    (slotInfo: SlotInfo) => {
      setSelectedSlot(slotInfo);
      setIsAddModalOpen(true);
    },
    []
  )

  const handleAddEvent = (newEvent: EventItem) => {
    if (selectedSlot) {
      const eventWithSlotInfo: EventItem = {
        ...newEvent,
        start: selectedSlot.start,
        end: selectedSlot.end,
        resourceID: Date.now(),
      };
      setEvents((prev) => [...prev, eventWithSlotInfo]);
      setSelectedSlot(null);
    } else {
      setEvents((prev) => [...prev, { ...newEvent, resourceID: Date.now() }]);
    }
    setIsAddModalOpen(false);
  }



  const slotPropGetter = useCallback(
    (date: Date) => {
      const hour = date.getHours();
      
      let backgroundImage = '';
      let textColorClass = ''; // set rbc-label text color 
      if (hour < 6) {
        backgroundImage = `url(${nightClear})`
        textColorClass = 'text-white'; 
      } else if (hour < 12) {
        backgroundImage = `url(${clouds})`
        textColorClass = 'text-black'; 
      } else if (hour < 18) {
        backgroundImage = `url(${rain})`
        textColorClass = 'text-black'; 

      } else {
        backgroundImage = `url(${nightClouds})`
        textColorClass = 'text-white'; 
      }
  
      return {
        className: `${textColorClass}`, // change rbc-label color to fit with background
        style: {
          backgroundImage,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        },
      };
    },
    []
  );

  const slotGroupPropGetter = useCallback(
    () => ({
      style: {
        minHeight: 75,
      },
    }),
    []
  )

  const scrollToTime = new Date('2024-11-28T08:00:00');
  return (
    <div className="h-screen p-4 bg-gray-100">
      
{/* This is the calendar being displayed */}
      <DnDCalendar
        localizer={localizer}
        events={events}
        slotPropGetter={slotPropGetter}
        slotGroupPropGetter={slotGroupPropGetter}
        scrollToTime={scrollToTime}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        step={60}
        timeslots={1}
        resizable
        selectable
        onSelectSlot={handleSelectSlot}
        style={{ height: 'calc(100% - 80px)' }}
        defaultView="week"
        views={['week', 'day']}

        className="bg-white shadow-lg rounded-lg overflow-hidden mt-2"
        components={{
          event: EventComponent,
        }}
      />

      <AddEvent 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddEvent}
        initialStartTime={selectedSlot?.start}
        initialEndTime={selectedSlot?.end}
      />
    </div>
  )
}