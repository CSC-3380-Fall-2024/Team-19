import React, { useState, useCallback } from 'react'
import { Calendar, momentLocalizer, SlotInfo } from 'react-big-calendar'
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { EventItem } from './events/eventTypes'
import { WeatherEventItem } from './weather/weatherTypes'
import { EVENTS } from './events/eventConstants'
import FoodEvent from './events/FoodEvent'
import ActivityEvent from './events/ActivityEvent'
import EntertainmentEvent from './events/EntertainmentEvent'
import TransportationEvent from './events/TransportationEvent'
import AddEvent from './events/AddEvent'
import AddWeatherEventModal from './weather/AddWeatherEventModel'

const localizer = momentLocalizer(moment)

type CalendarEvent = EventItem;

const DnDCalendar = withDragAndDrop<CalendarEvent, object>(Calendar as any);

export default function CombinedCalendar() {
  const [events, setEvents] = useState<EventItem[]>(EVENTS)
  const [weatherEvents, setWeatherEvents] = useState<WeatherEventItem[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isWeatherModalOpen, setIsWeatherModalOpen] = useState(false)
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

  const WeatherEventWrapper: React.FC<{ event: WeatherEventItem }> = ({ event }) => {
    const getWeatherColor = (condition: string) => {
      switch (condition) {
        case "Sunny": return "bg-yellow-200";
        case "Partly Cloudy": return "bg-blue-100";
        case "Cloudy": return "bg-gray-200";
        case "Rainy": return "bg-blue-200";
        case "Stormy": return "bg-purple-200";
        case "Clear": return "bg-indigo-100";
        default: return "bg-transparent";
      }
    };

    const getWeatherEmoji = (condition: string) => {
      switch (condition) {
        case "Sunny": return "☀️";
        case "Partly Cloudy": return "⛅";
        case "Cloudy": return "☁️";
        case "Rainy": return "🌧️";
        case "Stormy": return "⛈️";
        case "Clear": return "🌙";
        default: return "";
      }
    };

    const timeOfDay = Object.keys(event.data)[0] as keyof WeatherEventItem['data'];
    const weatherData = event.data[timeOfDay];

    return (
      <div className={`h-full w-full ${getWeatherColor(weatherData?.condition || '')} bg-opacity-50 flex items-center justify-center`}>
        <span className="text-2xl">{getWeatherEmoji(weatherData?.condition || '')}</span>
        <span className="ml-2">{weatherData?.temperature}°C</span>
      </div>
    );
  };

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

  const handleAddWeatherEvent = (newEvent: WeatherEventItem) => {
    setWeatherEvents((prev) => [...prev, newEvent])
    setIsWeatherModalOpen(false)
  }

  return (
    <div className="h-screen p-4 bg-gray-100">
      <div className="mb-4 flex space-x-2">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Add Event
        </button>
        <button
          onClick={() => setIsWeatherModalOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Add Weather Event
        </button>
      </div>
      
      <DnDCalendar
        localizer={localizer}
        events={events}
        //@ts-ignore
        backgroundEvents={weatherEvents}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        resizable
        selectable
        onSelectSlot={handleSelectSlot}
        style={{ height: 'calc(100% - 80px)' }}
        defaultView="week"
        views={['week', 'day']}
        min={new Date(2022, 9, 10, 8, 0)} // October 10, 2022, 8:00 AM
        max={new Date(2022, 9, 10, 23, 0)} // October 10, 2022, 11:00 PM
        className="bg-white shadow-lg rounded-lg overflow-hidden mt-2"
        components={{
          event: EventComponent,
          //@ts-ignore
          backgroundEvent: WeatherEventWrapper as any
        }}
      />

      <AddEvent 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddEvent}
        initialStartTime={selectedSlot?.start}
        initialEndTime={selectedSlot?.end}
      />

      <AddWeatherEventModal
        isOpen={isWeatherModalOpen}
        onClose={() => setIsWeatherModalOpen(false)}
        onAdd={handleAddWeatherEvent}
      />
    </div>
  )
}