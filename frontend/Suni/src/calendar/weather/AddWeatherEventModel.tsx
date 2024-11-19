import React, { useState } from 'react'
import { WeatherEventItem, Morning, Midday, Afternoon, Night } from './weatherTypes'

interface AddWeatherEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (event: WeatherEventItem) => void;
}

const timeOfDayOptions = ['morning', 'midday', 'afternoon', 'night'] as const;
type TimeOfDay = typeof timeOfDayOptions[number];

const weatherConditions = {
  morning: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy'],
  midday: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy', 'Stormy'],
  afternoon: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy', 'Stormy'],
  night: ['Clear', 'Partly Cloudy', 'Cloudy', 'Rainy'],
};

export default function AddWeatherEventModal({ isOpen, onClose, onAdd }: AddWeatherEventModalProps) {
  const [startDate, setStartDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endDate, setEndDate] = useState('')
  const [endTime, setEndTime] = useState('')
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('morning')
  const [temperature, setTemperature] = useState('')
  const [condition, setCondition] = useState<string>(weatherConditions[timeOfDay][0])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const weatherData = {
      temperature: parseInt(temperature),
      condition: condition,
    };
    const newEvent: WeatherEventItem = {
      start: new Date(`${startDate}T${startTime}`),
      end: new Date(`${endDate}T${endTime}`),
      data: { [timeOfDay]: weatherData as Morning | Midday | Afternoon | Night },
      isDraggable: false,
    }
    onAdd(newEvent)
    onClose()
    // Reset form
    setStartDate('')
    setStartTime('')
    setEndDate('')
    setEndTime('')
    setTimeOfDay('morning')
    setTemperature('')
    setCondition(weatherConditions['morning'][0])
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add Weather Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
              <input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
              <input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div>
            <label htmlFor="timeOfDay" className="block text-sm font-medium text-gray-700">Time of Day</label>
            <select
              id="timeOfDay"
              value={timeOfDay}
              onChange={(e) => {
                setTimeOfDay(e.target.value as TimeOfDay)
                setCondition(weatherConditions[e.target.value as TimeOfDay][0])
              }}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {timeOfDayOptions.map((time) => (
                <option key={time} value={time}>
                  {time.charAt(0).toUpperCase() + time.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">Temperature (°C)</label>
            <input
              id="temperature"
              type="number"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="condition" className="block text-sm font-medium text-gray-700">Weather Condition</label>
            <select
              id="condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {weatherConditions[timeOfDay].map((cond) => (
                <option key={cond} value={cond}>
                  {cond}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


// import React, { useState } from 'react'
// import { WeatherEventItem, Morning, Midday, Afternoon, Night } from './weatherTypes'

// interface AddWeatherEventModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onAdd: (event: WeatherEventItem) => void;
// }

// const timeOfDayOptions = ['morning', 'midday', 'afternoon', 'night'] as const;
// type TimeOfDay = typeof timeOfDayOptions[number];

// const weatherConditions = {
//   morning: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy'],
//   midday: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy', 'Stormy'],
//   afternoon: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy', 'Stormy'],
//   night: ['Clear', 'Partly Cloudy', 'Cloudy', 'Rainy'],
// };

// export default function AddWeatherEventModal({ isOpen, onClose, onAdd }: AddWeatherEventModalProps) {
//   const [startDate, setStartDate] = useState('')
//   const [startTime, setStartTime] = useState('')
//   const [endDate, setEndDate] = useState('')
//   const [endTime, setEndTime] = useState('')
//   const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('morning')
//   const [temperature, setTemperature] = useState('')
//   const [condition, setCondition] = useState<string>(weatherConditions[timeOfDay][0])

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     const weatherData = {
//       temperature: parseInt(temperature),
//       condition: condition,
//     };
//     const newEvent: WeatherEventItem = {
//       start: new Date(`${startDate}T${startTime}`),
//       end: new Date(`${endDate}T${endTime}`),
//       data: { [timeOfDay]: weatherData as Morning | Midday | Afternoon | Night },
//       isDraggable: false,
//     }
//     onAdd(newEvent)
//     onClose()
//     // Reset form
//     setStartDate('')
//     setStartTime('')
//     setEndDate('')
//     setEndTime('')
//     setTimeOfDay('morning')
//     setTemperature('')
//     setCondition(weatherConditions['morning'][0])
//   }

//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg w-96">
//         <h2 className="text-xl font-bold mb-4">Add Weather Event</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
//               <input
//                 id="startDate"
//                 type="date"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 required
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//               />
//             </div>
//             <div>
//               <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
//               <input
//                 id="startTime"
//                 type="time"
//                 value={startTime}
//                 onChange={(e) => setStartTime(e.target.value)}
//                 required
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//               />
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
//               <input
//                 id="endDate"
//                 type="date"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 required
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//               />
//             </div>
//             <div>
//               <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
//               <input
//                 id="endTime"
//                 type="time"
//                 value={endTime}
//                 onChange={(e) => setEndTime(e.target.value)}
//                 required
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//               />
//             </div>
//           </div>
//           <div>
//             <label htmlFor="timeOfDay" className="block text-sm font-medium text-gray-700">Time of Day</label>
//             <select
//               id="timeOfDay"
//               value={timeOfDay}
//               onChange={(e) => {
//                 setTimeOfDay(e.target.value as TimeOfDay)
//                 setCondition(weatherConditions[e.target.value as TimeOfDay][0])
//               }}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//             >
//               {timeOfDayOptions.map((time) => (
//                 <option key={time} value={time}>
//                   {time.charAt(0).toUpperCase() + time.slice(1)}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">Temperature (°C)</label>
//             <input
//               id="temperature"
//               type="number"
//               value={temperature}
//               onChange={(e) => setTemperature(e.target.value)}
//               required
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//             />
//           </div>
//           <div>
//             <label htmlFor="condition" className="block text-sm font-medium text-gray-700">Weather Condition</label>
//             <select
//               id="condition"
//               value={condition}
//               onChange={(e) => setCondition(e.target.value)}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//             >
//               {weatherConditions[timeOfDay].map((cond) => (
//                 <option key={cond} value={cond}>
//                   {cond}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="flex justify-end space-x-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Add Event
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }