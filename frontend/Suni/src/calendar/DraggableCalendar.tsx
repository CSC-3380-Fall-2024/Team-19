import React, { useState, useCallback } from 'react'
import { Calendar, momentLocalizer, SlotInfo } from 'react-big-calendar'
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { EventItem,} from './events/eventTypes'
import { EVENTS } from './events/eventConstants'
import FoodEvent from './events/FoodEvent'
import ActivityEvent from './events/ActivityEvent'
import EntertainmentEvent from './events/EntertainmentEvent'
import TransportationEvent from './events/TransportationEvent'
import AddEvent from './events/AddEvent'

// import {WeatherEventItem} from './weather/weatherTypes'
// import {WEATHEREVENTS} from './weather/weatherConstants'
// import MorningEvent from './weather/MorningEvent'
// import MiddayEvent from './weather/MiddayEvent'
// import AfternoonEvent from './weather/AfternoonEvent'
// import NightEvent from './weather/NightEvent'

const localizer = momentLocalizer(moment)



const initialWeatherEvents = [
  {
  title: "Morning",
  start: moment("2024-11-11T07:00:00").toDate(),
  end: moment("2024-11-11T11:00:00").toDate(),
    data: {
      type: "Morning",
      weather: "Clear",
    },
  },
  {
    title: "Midday",
    start: moment("2024-11-11T11:00:00").toDate(),
    end: moment("2024-11-11T16:00:00").toDate(),
    data: {
      type: "Midday",
      weather: "Clear",
    },
  },
  {
    title: "Afternoon",
    start: moment("2024-11-11T16:00:00").toDate(),
    end: moment("2024-11-11T19:00:00").toDate(),
    data: {
      type: "Afternoon",
      weather: "Clear",
    },
  },
  {
    title: "Night",
    start: moment("2024-11-11T19:00:00").toDate(),
    end: moment("2024-11-11T22:00:00").toDate(),
    data: {
      type: "Night",
      weather: "Clear",
    },
  },
  
]

type CalendarEvent = EventItem;
//type WeatherEvent = WeatherEventItem

const DnDCalendar = withDragAndDrop<CalendarEvent, object>(Calendar as any);

export default function DraggableCalendar() {
  const [events, setEvents] = useState<EventItem[]>(EVENTS)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);

  //const [backgroundEvents, setBackgroundEvents] = useState<WeatherEventItem[]>(WEATHEREVENTS);
  const [backgroundEvents, setBackgroundEvents] = useState(initialWeatherEvents);


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


  // const BackgroundEventComponent: React.FC<{ backgroundEvent: WeatherEvent }> = ({ backgroundEvent }) => {
  //   if (backgroundEvent.data.morning) {
  //     return <MorningEvent morning={backgroundEvent.data.morning} />;
  //   }
  //   if (backgroundEvent.data.midday) {
  //     return <MiddayEvent midday={backgroundEvent.data.midday} />;
  //   }
  //   if (backgroundEvent.data.afternoon) {
  //     return <AfternoonEvent afternoon={backgroundEvent.data.afternoon} />;
  //   }
  //   if (backgroundEvent.data.night) {
  //     return <NightEvent night={backgroundEvent.data.night} />;
  //   }
  //   return <div></div>;
  // };

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

  // handleAddWeatherEvent for weather events
// const handleAddWeatherEvent = (newWeatherEvent: WeatherEventItem) => {
//   if (selectedSlot) {
//     const weatherEventWithSlotInfo: WeatherEventItem = {
//       ...newWeatherEvent,
//       start: selectedSlot.start,
//       end: selectedSlot.end,
//       //id: Date.now().toString(), // Adding an id to the weather event
//     };
//     setBackgroundEvents((prev) => [...prev, weatherEventWithSlotInfo]);
//     setSelectedSlot(null);
//   } else {
//     setBackgroundEvents((prev) => [
//       ...prev,
//       { ...newWeatherEvent, id: Date.now().toString() },
//     ]);
//   }
//   setIsAddModalOpen(false);

  //   EVENTS.reduce(
//         (acc, event) => {
//             if (event?.data?.food) acc.foods.push(event);
//             if (event?.data?.activity) acc.activities.push(event);
//             if (event?.data?.transportation) acc.transportations.push(event);
//             if (event?.data?.entertainment) acc.entertainments.push(event);
//             return acc;
//         },
//         { foods: [] as EventItem[], activities: [] as EventItem[], transportations: [] as EventItem[], entertainments: [] as EventItem[] }
//     );

  return (
    <div className="h-screen p-4 bg-gray-100">
      <AddEvent 
        onAdd={handleAddEvent}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        initialStartTime={selectedSlot?.start}
        initialEndTime={selectedSlot?.end}
      />
      
      <DnDCalendar
        localizer={localizer}
        events={events}
        //backgroundEvents={initialWeatherEvents}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        resizable
        selectable
        onSelectSlot={handleSelectSlot}
        style={{ height: 'calc(100% - 40px)' }}
        defaultView="week"
        min={moment("2022-10-10T08:00:00").toDate()}
        max={moment("2022-10-10T23:00:00").toDate()}
        className="bg-white shadow-lg rounded-lg overflow-hidden mt-2"
        components={{
          event: EventComponent
        }}
      />
    </div>
  )
}