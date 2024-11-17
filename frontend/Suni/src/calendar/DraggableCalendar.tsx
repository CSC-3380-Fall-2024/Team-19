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

const localizer = momentLocalizer(moment)

type CalendarEvent = EventItem;

const DnDCalendar = withDragAndDrop<CalendarEvent, object>(Calendar as any);

export default function DraggableCalendar() {
  const [events, setEvents] = useState<EventItem[]>(EVENTS)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);

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