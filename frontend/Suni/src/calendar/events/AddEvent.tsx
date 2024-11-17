import React, { useState, useEffect } from 'react';
import { EventItem, Food, Activity, Entertainment, Transportation } from './eventTypes';

interface AddEventModalProps {
  onAdd: (event: EventItem) => void;
  isOpen: boolean;
  onClose: () => void;
  initialStartTime?: Date;
  initialEndTime?: Date;
}

const typeOptions = {
  food: ['American', 'Mexican', 'Italian', 'Chinese', 'Japanese', 'Indian', 'Dine-in', 'Fast-food', 'Cafe', 'Bakery'],
  activity: ['Sightseeing', 'Museum', 'Park', 'Beach', 'Hiking', 'Shopping', 'Sports', 'Spa', 'Workshop', 'Tour'],
  entertainment: ['Movie', 'Concert', 'Theater', 'Comedy Show', 'Art Gallery', 'Festival', 'Nightclub', 'Live Music', 'Amusement Park', 'Zoo'],
  transportation: ['Car', 'Bus', 'Train', 'Subway', 'Taxi', 'Ride-share', 'Bicycle', 'Walk', 'Ferry', 'Plane']
};

const AddEventModal: React.FC<AddEventModalProps> = ({ onAdd, isOpen, onClose, initialStartTime, initialEndTime }) => {
  const [title, setTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [category, setCategory] = useState<keyof EventItem['data']>('food');
  const [eventData, setEventData] = useState<EventItem['data']>({});

  useEffect(() => {
    if (initialStartTime && initialEndTime) {
      setEventDate(initialStartTime.toISOString().split('T')[0]);
      setStartTime(initialStartTime.toTimeString().slice(0, 5));
      setEndTime(initialEndTime.toTimeString().slice(0, 5));
    }
  }, [initialStartTime, initialEndTime]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const start = new Date(`${eventDate}T${startTime}`);
    const end = new Date(`${eventDate}T${endTime}`);

    const newEvent: EventItem = {
      title,
      start,
      end,
      resourceID: Date.now(),
      data: {
        [category]: {
          ...eventData[category],
          price: (eventData[category] as any)?.price ? parseFloat((eventData[category] as any).price) : 0,
        }
      },
      isDraggable: true,
    };

    onAdd(newEvent);

    // Reset form
    setTitle('');
    setEventDate('');
    setStartTime('');
    setEndTime('');
    setCategory('food');
    setEventData({});
    onClose();
  };

  const renderCategoryFields = () => {
    switch (category) {
      case 'food':
      case 'activity':
      case 'entertainment':
      case 'transportation':
        return (
          <>
            <input
              type="text"
              placeholder="Name"
              value={(eventData[category] as any)?.name || ''}
              onChange={(e) => setEventData({ ...eventData, [category]: { ...(eventData[category] as any), name: e.target.value } })}
              className="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
            <div className="col-span-1 relative">
              <input
                type="text"
                placeholder="Type"
                value={(eventData[category] as any)?.type || ''}
                onChange={(e) => setEventData({ ...eventData, [category]: { ...(eventData[category] as any), type: e.target.value } })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                list={`${category}-types`}
              />
              <datalist id={`${category}-types`}>
                {typeOptions[category].map((option) => (
                  <option key={option} value={option} />
                ))}
              </datalist>
            </div>
            <div className="col-span-1 relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">$</span>
              <input
                type="text"
                placeholder="0.00"
                value={(eventData[category] as any)?.price || ''}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9.]/g, '');
                  const parts = value.split('.');
                  if (parts.length > 1) {
                    parts[1] = parts[1].slice(0, 2);
                  }
                  const formattedValue = parts.join('.');
                  setEventData({ ...eventData, [category]: { ...(eventData[category] as any), price: formattedValue } });
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full pl-7 p-2.5"
              />
            </div>
            <input
              type="text"
              placeholder="Location"
              value={(eventData[category] as any)?.location || ''}
              onChange={(e) => setEventData({ ...eventData, [category]: { ...(eventData[category] as any), location: e.target.value } })}
              className="col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
            <select
              value={(eventData[category] as any)?.rating || ''}
              onChange={(e) => setEventData({ ...eventData, [category]: { ...(eventData[category] as any), rating: Number(e.target.value) } })}
              className="col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            >
              <option value="">Select Rating</option>
              {[1, 2, 3, 4, 5].map((rating) => (
                <option key={rating} value={rating}>{rating}</option>
              ))}
            </select>
          </>
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-600 bg-opacity-50 flex">
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
        <div className="flex justify-between items-center pb-4">
          <h3 className="text-lg font-semibold">Create New Event</h3>
          <button
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Event Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as keyof EventItem['data'])}
              className="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              required
            >
              <option value="food">Food</option>
              <option value="activity">Activity</option>
              <option value="entertainment">Entertainment</option>
              <option value="transportation">Transportation</option>
            </select>
            {renderCategoryFields()}
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;