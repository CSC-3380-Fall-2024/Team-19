import React, { useState, useCallback, useEffect } from 'react'
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
// import useAxiosPrivate from '../hooks/useAxiosPrivate.ts';

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
//   const axiosPrivate = useAxiosPrivate();
//   const [trip, setTrip] = useState([])

//     try {
//         useEffect(() => {
//             axiosPrivate.get("/customer/profile/info",)
//                 .then((response) => {
//                     setTrip(response.data.itineraries);
//                 })
//         }, []);
//     }catch(err) {
//         console.log(err);
//     }
// console.log(trip);

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

//date is off by 
  const specifiedDate = new Date('2024-12-10T12:00:00'); // Specify the day you want to set (e.g., December 11, 2024)

  const slotPropGetter = useCallback(
    (date: Date) => {
      // Check if the date matches the specified date
      const isSameDay = date.toDateString() === specifiedDate.toDateString();

      if (isSameDay) {
        const hour = date.getHours();
        let backgroundImage = '';
        let textColorClass = ''; // set rbc-label text color 
        
        // Apply weather background based on the hour
        if (hour < 6) {
          backgroundImage = `url(${nightClear})`;
          textColorClass = 'text-white';
        } else if (hour < 12) {
          backgroundImage = `url(${clouds})`;
          textColorClass = 'text-black';
        } else if (hour < 18) {
          backgroundImage = `url(${rain})`;
          textColorClass = 'text-black';
        } else {
          backgroundImage = `url(${nightClouds})`;
          textColorClass = 'text-white';
        }

        return {
          className: `${textColorClass}`, // Change rbc-label color to fit with background
          style: {
            backgroundImage,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          },
        };
      }

      // Default behavior (for other days)
      return {};
    },
    [specifiedDate] // Dependency to ensure the specifiedDate is used correctly in the callback
  );

  // const slotPropGetter = useCallback(
  //   (date: Date) => {
  //     const hour = date.getHours();
      
  //     let backgroundImage = '';
  //     let textColorClass = ''; // set rbc-label text color 
  //     if (hour < 6) {
  //       backgroundImage = `url(${nightClear})`
  //       textColorClass = 'text-white'; 
  //     } else if (hour < 12) {
  //       backgroundImage = `url(${clouds})`
  //       textColorClass = 'text-black'; 
  //     } else if (hour < 18) {
  //       backgroundImage = `url(${rain})`
  //       textColorClass = 'text-black'; 
  //     } else {
  //       backgroundImage = `url(${nightClouds})`
  //       textColorClass = 'text-white'; 
  //     }
  
  //     return {
  //       className: `${textColorClass}`, // change rbc-label color to fit with background
  //       style: {
  //         backgroundImage,
  //         backgroundSize: 'cover',
  //         backgroundPosition: 'center',
  //         backgroundRepeat: 'no-repeat',
  //       },
  //     };
  //   },
  //   []
  // );

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
    <div className="h-[calc(100vh-15vh)] bg-sky-blue"> {/* Default: h-755px (Min: h-500px ) / outside box  */}
      
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
        // style={{ height: 'calc(100% - 80px)' }}
        defaultView="week"
        views={['week', 'day']}
        //toolbar={false}

        className="bg-white shadow-lg rounded-lg overflow-auto"
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

    //   //Night(EARLY morning) 12am - 6am
    //   switch (hour) {
    //     case 0:
    //       backgroundImage = `url(${nightClear})`;
    //       textColorClass = 'text-white';
    //       break;
    //     case 1:
    //       backgroundImage = `url(${nightClear})`;
    //       textColorClass = 'text-white';
    //       break;
    //     case 2:
    //       backgroundImage = `url(${nightClear})`;
    //       textColorClass = 'text-white';
    //       break;
    //     case 3:
    //       backgroundImage = `url(${nightClear})`;
    //       textColorClass = 'text-white';
    //       break;
    //     case 4:
    //       backgroundImage = `url(${nightClear})`;
    //       textColorClass = 'text-white';
    //       break;
    //     case 5:
    //       backgroundImage = `url(${nightClear})`;
    //       textColorClass = 'text-white';
    //       break;
    //     case 6:
    //       backgroundImage = `url(${clouds})`;
    //       textColorClass = 'text-black';
    //       break;
    //     default:
    //       backgroundImage = `url(${nightClear})`; // Default case for unexpected hour value
    //       textColorClass = 'text-white';
    //       break;
    //     }
    //   //Morning 7am - 11am
    //   switch (hour) {
    //     case 7:
    //       backgroundImage = `url(${clouds})`;
    //       textColorClass = 'text-black';
    //       break;
    //     case 8:
    //       backgroundImage = `url(${clouds})`;
    //       textColorClass = 'text-black';
    //       break;
    //     case 9:
    //       backgroundImage = `url(${clouds})`;
    //       textColorClass = 'text-black';
    //       break;
    //     case 10:
    //       backgroundImage = `url(${clouds})`;
    //       textColorClass = 'text-black';
    //       break;
    //     case 11:
    //       backgroundImage = `url(${clouds})`;
    //       textColorClass = 'text-black';
    //       break;
    //     default:
    //       backgroundImage = `url(${nightClear})`; // Default case for unexpected hour value
    //       textColorClass = 'text-white';
    //       break;
    //   }
    //   //Midday 12pm - 3pm
    //   switch (hour) {
    //     case 12:
    //       backgroundImage = `url(${rain})`;
    //       textColorClass = 'text-black';
    //       break;
    //     case 13:
    //       backgroundImage = `url(${rain})`;
    //       textColorClass = 'text-black';
    //       break;
    //     case 14:
    //       backgroundImage = `url(${rain})`;
    //       textColorClass = 'text-black';
    //       break;
    //     case 15:
    //       backgroundImage = `url(${rain})`;
    //       textColorClass = 'text-black';
    //       break;
    //     default:
    //       backgroundImage = `url(${nightClear})`; // Default case for unexpected hour value
    //       textColorClass = 'text-white';
    //       break;
    //   }
    //   //Afternoon 4pm - 7pm
    // switch (hour) {
    //     case 16:
    //       backgroundImage = `url(${rain})`;
    //       textColorClass = 'text-black';
    //       break;
    //     case 17:
    //       backgroundImage = `url(${rain})`;
    //       textColorClass = 'text-black';
    //       break;
    //     case 18:
    //       backgroundImage = `url(${nightClouds})`;
    //       textColorClass = 'text-white';
    //       break;
    //     case 19:
    //       backgroundImage = `url(${nightClouds})`;
    //       textColorClass = 'text-white';
    //       break;
    //     default:
    //       backgroundImage = `url(${nightClear})`; // Default case for unexpected hour value
    //       textColorClass = 'text-white';
    //       break;
    //   }
    //   switch (hour) {
    //     case 20:
    //       backgroundImage = `url(${nightClouds})`;
    //       textColorClass = 'text-white';
    //       break;
    //     case 21:
    //       backgroundImage = `url(${nightClouds})`;
    //       textColorClass = 'text-white';
    //       break;
    //     case 22:
    //       backgroundImage = `url(${nightClouds})`;
    //       textColorClass = 'text-white';
    //       break;
    //     case 23:
    //       backgroundImage = `url(${nightClouds})`;
    //       textColorClass = 'text-white';
    //       break;
    //     default:
    //       backgroundImage = `url(${nightClear})`; // Default case for unexpected hour value
    //       textColorClass = 'text-white';
    //       break;
    //   }