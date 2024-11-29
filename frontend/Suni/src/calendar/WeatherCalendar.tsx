// import React, { useState, useCallback } from 'react'
// import { Calendar, momentLocalizer } from 'react-big-calendar'
// import moment from 'moment'
// import 'react-big-calendar/lib/css/react-big-calendar.css'
// import { WeatherEventItem } from './weather/weatherTypes'
// import AddWeatherEventModal from './weather/AddWeatherEventModel'

// const localizer = momentLocalizer(moment)

// interface WeatherCalendarProps {
//   onWeatherEventsChange: (events: WeatherEventItem[]) => void;
// }

// export default function WeatherCalendar({ onWeatherEventsChange }: WeatherCalendarProps) {
//   const [weatherEvents, setWeatherEvents] = useState<WeatherEventItem[]>([])
//   const [isModalOpen, setIsModalOpen] = useState(false)

//   const handleAddWeatherEvent = (newEvent: WeatherEventItem) => {
//     const updatedEvents = [...weatherEvents, newEvent]
//     setWeatherEvents(updatedEvents)
//     onWeatherEventsChange(updatedEvents)
//   }

//   const WeatherEventWrapper: React.FC<{ event: WeatherEventItem }> = ({ event }) => {
//     const getWeatherColor = (condition: string) => {
//       switch (condition) {
//         case "Sunny": return "bg-yellow-200";
//         case "Partly Cloudy": return "bg-blue-100";
//         case "Cloudy": return "bg-gray-200";
//         case "Rainy": return "bg-blue-200";
//         case "Stormy": return "bg-purple-200";
//         case "Clear": return "bg-indigo-100";
//         default: return "bg-transparent";
//       }
//     };

//     // const getWeatherEmoji = (condition: string) => {
//     //   switch (condition) {
//     //     case "Sunny": return "☀️";
//     //     case "Partly Cloudy": return "⛅";
//     //     case "Cloudy": return "☁️";
//     //     case "Rainy": return "🌧️";
//     //     case "Stormy": return "⛈️";
//     //     case "Clear": return "🌙";
//     //     default: return "";
//     //   }
//     // };

//     const timeOfDay = Object.keys(event.data)[0] as keyof WeatherEventItem['data'];
//     const weatherData = event.data[timeOfDay];

//     // const eventPropGetter = useCallback((backgroundEvent: WeatherEventItem) => {
//     //   return {
//     //     style: {
//     //       backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     //       border: '1px solid #ccc',
//     //       borderRadius: '4px',
//     //       color: 'black',
//     //       padding: '2px 5px',
//     //     },
//     //   };
//     // }, []);


//     return (
//       <div className={`h-full w-full ${getWeatherColor(weatherData?.condition || '')} bg-opacity-50 flex items-center justify-center`}>
//         {/* <span className="text-2xl">{getWeatherEmoji(weatherData?.condition || '')}</span> */}
//         <span className="ml-2">{weatherData?.temperature}°C</span>
//       </div>
//     );
//   };

//   return (
//     <div className="h-screen p-4 bg-gray-100">
//       <div className="mb-4">
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         >
//           Add Weather Event
//         </button>
//       </div>
//       {/* <Calendar
//         localizer={localizer}
//         events={[]}
//         backgroundEvents={weatherEvents}
//         style={{ height: 'calc(100% - 80px)' }}
//         className="bg-white shadow-lg rounded-lg overflow-hidden mt-2"
//         components={{
//           //@ts-ignore
//           backgroundEvent: WeatherEventWrapper
//         }}
//       /> */}
//       <AddWeatherEventModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onAdd={handleAddWeatherEvent}
//       />
//     </div>
//   )
// }