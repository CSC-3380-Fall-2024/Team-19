'use client'

import {useState, useEffect, useRef, useContext} from 'react'
import { MapPin, Plane, Car, PersonStanding, DollarSign, Utensils, Heart, Footprints, Check, MoreHorizontal } from 'lucide-react'


interface TripDetails {
  location: string
  dates: {
    arrive: string
    leave: string
  }
  transportation: string
  budget: {
    tripTotal: string
    dailyTotal: string
  }
  interests: string[]
  activities: string[]
  meals: string[]
}

const popularDestinations = [
  'Tokyo, Japan',
  'Paris, France',
  'New York City, USA',
  'Rome, Italy',
  'London, UK',
  'Barcelona, Spain',
  'Sydney, Australia',
  'Dubai, UAE',
  'Rio de Janeiro, Brazil',
  'Amsterdam, Netherlands'
]

export default function Component() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [tripDetails, setTripDetails] = useState<TripDetails>({
    location: '',
    dates: {
      arrive: '',
      leave: ''
    },
    transportation: '',
    budget: {
      tripTotal: '',
      dailyTotal: ''
    },
    interests: [],
    activities: [],
    meals: []
  })
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredDestinations, setFilteredDestinations] = useState<string[]>([])
  const suggestionRef = useRef<HTMLDivElement>(null)

  const steps = [
    'Location',
    'Date',
    'Transportation',
    'Budget',
    'Interests',
    'Activities',
    'Meals',
    'Pick your Trip!'
  ]



  const handleNext = () => {
    setCurrentStep(prev => {
      const nextStep = Math.min(steps.length - 1, prev + 1)
      setCompletedSteps(prevCompleted => [...new Set([...prevCompleted, prev])])
      return nextStep
    })
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(0, prev - 1))
  }

  const updateTripDetails = (update: Partial<TripDetails>) => {
    setTripDetails(prev => ({ ...prev, ...update }))
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    updateTripDetails({ location: value })
    const filtered = popularDestinations.filter(dest => 
      dest.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredDestinations(filtered)
    setShowSuggestions(true)
  }

  const handleSuggestionClick = (destination: string) => {
    updateTripDetails({ location: destination })
    setShowSuggestions(false)
  }

  const renderQuizContent = () => {
    switch (currentStep) {
      case 0: // Location
        return (
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700 ">Where do you want to go?</span> 
              <div className="relative">
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter a destination"
                  value={tripDetails.location}
                  onChange={handleLocationChange} 
                  onFocus={() => setShowSuggestions(true)}
                />
                {showSuggestions && filteredDestinations.length > 0 && (
                  <div 
                    ref={suggestionRef}
                    className="absolute z-10 w-full bg-white mt-1 rounded-md shadow-lg max-h-60 overflow-auto"
                  >
                    {filteredDestinations.map((dest, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-gray-900"
                        onClick={() => handleSuggestionClick(dest)}
                      >
                        {dest}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </label>
          </div>
        )
      case 1: // Date
        return (
          <div className="space-y-4"> 
            <label className="block">
              <span className="text-gray-700">Arrival Date</span>
              <div className="relative">
                <input
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={tripDetails.dates.arrive}
                  onChange={(e) => updateTripDetails({ dates: { ...tripDetails.dates, arrive: e.target.value } })}
                /> 
              </div>
            </label>
            <label className="block">
              <span className="text-gray-700">Departure Date</span>
              <div className="relative">
                <input
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={tripDetails.dates.leave}
                  onChange={(e) => updateTripDetails({ dates: { ...tripDetails.dates, leave: e.target.value } })}
                />
              </div>
            </label>
          </div>
        )
      case 2: // Transportation
        return (
          <div className="grid gap-6 md:grid-cols-3">
            {['Public Transit', 'Driving/Rentals', 'Walking'].map((option) => (
              <button
                key={option}
                onClick={() => updateTripDetails({ transportation: option })}
                className={`group relative overflow-hidden rounded-xl bg-white p-4 shadow-lg transition hover:scale-105 ${
                  tripDetails.transportation === option ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
                  <div className="flex h-full items-center justify-center">
                    {option === 'Public Transit' && <Plane className="h-12 w-12 text-blue-500" />}
                    {option === 'Driving/Rentals' && <Car className="h-12 w-12 text-blue-500" />}
                    {option === 'Walking' && <PersonStanding className="h-12 w-12 text-blue-500" />}
                  </div>
                </div>
                <p className="mt-2 text-center font-semibold text-blue-900">{option}</p>
              </button>
            ))}
          </div>
        )
      case 3: // Budget
        return (
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700">Total Trip Budget</span>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter total budget"
                value={tripDetails.budget.tripTotal}
                onChange={(e) => updateTripDetails({ budget: { ...tripDetails.budget, tripTotal: e.target.value } })}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Daily Budget</span>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter daily budget"
                value={tripDetails.budget.dailyTotal}
                onChange={(e) => updateTripDetails({ budget: { ...tripDetails.budget, dailyTotal: e.target.value } })}
              />
            </label>
          </div>
        )
      case 4: // Interests
        const interestOptions = ['Culture', 'Nature', 'Adventure', 'Relaxation', 'Food', 'History']
        return (
          <div className="grid gap-4 md:grid-cols-3">
            {interestOptions.map((interest) => (
              <button
                key={interest}
                onClick={() => {
                  const newInterests = tripDetails.interests.includes(interest)
                    ? tripDetails.interests.filter(i => i !== interest)
                    : [...tripDetails.interests, interest]
                  updateTripDetails({ interests: newInterests })
                }}
                className={`rounded-lg border p-4 text-center transition ${
                  tripDetails.interests.includes(interest)
                    ? 'bg-blue-100 border-blue-500'
                    : 'border-gray-300 hover:border-blue-500'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        )
      case 5: // Activities
        const activityOptions = ['Sightseeing', 'Museums', 'Hiking', 'Beach', 'Shopping', 'Local Events']
        return (
          <div className="grid gap-4 md:grid-cols-3">
            {activityOptions.map((activity) => (
              <button
                key={activity}
                onClick={() => {
                  const newActivities = tripDetails.activities.includes(activity)
                    ? tripDetails.activities.filter(a => a !== activity)
                    : [...tripDetails.activities, activity]
                  updateTripDetails({ activities: newActivities })
                }}
                className={`rounded-lg border p-4 text-center transition ${
                  tripDetails.activities.includes(activity)
                    ? 'bg-blue-100 border-blue-500'
                    : 'border-gray-300 hover:border-blue-500'
                }`}
              >
                {activity}
              </button>
            ))}
          </div>
        )
      case 6: // Meals
        const mealOptions = ['Local Cuisine', 'Fine Dining', 'Street Food', 'Vegetarian', 'Seafood', 'International']
        return (
          <div className="grid gap-4 md:grid-cols-3">
            {mealOptions.map((meal) => (
              <button
                key={meal}
                onClick={() => {
                  const newMeals = tripDetails.meals.includes(meal)
                    ? tripDetails.meals.filter(m => m !== meal)
                    : [...tripDetails.meals, meal]
                  updateTripDetails({ meals: newMeals })
                }}
                className={`rounded-lg border p-4 text-center transition ${
                  tripDetails.meals.includes(meal)
                    ? 'bg-blue-100 border-blue-500'
                    : 'border-gray-300 hover:border-blue-500'
                }`}
              >
                {meal}
              </button>
            ))}
          </div>
        )
      case 7: // Pick your Trip
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Your Trip is Ready!</h2>
            <p className="text-lg mb-6">Based on your preferences, we've created the perfect itinerary for you.</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              View Your Itinerary
            </button>
          </div>
        )
      default:
        return null
    } 
  }

  const isStepCompleted = (index: number) => {
    return completedSteps.includes(index)
  }

  const isStepSkipped = (index: number) => {
    return index < currentStep && !isStepCompleted(index)
  }

  return (
    <div>
      <main className="container mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-[1fr,400px]">
          {/* Main Content */}
          <div className="rounded-3xl bg-blue-100/80 p-8 px-12 backdrop-blur-sm">
            {/* Timeline */}
            <div className="mb-8 overflow-x-auto">
              <div className="flex min-w-max justify-between">
                {steps.map((step, index) => (
                  <div 
                    key={step} 
                    className="flex flex-col items-center w-32"
                    onClick={() => setCurrentStep(index)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setCurrentStep(index)
                      }
                    }}
                  >
                    <div className="flex items-center">  {/* Timeline bubbles*/}
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 cursor-pointer ${
                          index === currentStep
                            ? 'border-blue-500 bg-blue-500 text-white'
                            : isStepCompleted(index)
                            ? 'border-green-500 bg-green-500 text-white'
                            : isStepSkipped(index)
                            ? 'border-yellow-500 bg-yellow-500 text-white'
                            : 'border-blue-200 bg-white text-blue-200'
                        }`}
                      >
                        {isStepCompleted(index) ? (
                          <Check className="h-4 w-4" />
                        ) : isStepSkipped(index) ? (
                          <MoreHorizontal className="h-4 w-4" />
                        ) : (
                          <span className="text-xs">{index + 1}</span>
                        )}
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`h-1 w-24 ${
                            index < currentStep 
                              ? isStepCompleted(index) && isStepCompleted(index + 1)
                                ? 'bg-green-500'
                                : 'bg-yellow-500'
                                : 'bg-blue-200'
                          }`}
                        />
                      )}
                    </div>
                    <span className="mt-2 text-center text-xs text-blue-800 cursor-pointer">{step}</span>  {/* Timeline Title Text */}
                  </div>
                ))}
              </div>
            </div>, 

            {/* Dynamic Title */}
            <h1 className="mb-8 text-center text-4xl font-bold text-blue-900">
              {steps[currentStep]}
            
            </h1>

            {/* Quiz Content */}
            {renderQuizContent()}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              <button
                onClick={handleBack}
                className="rounded-lg bg-white px-8 py-2 font-semibold text-blue-900 shadow-md hover:bg-blue-50"
                disabled={currentStep === 0}
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="rounded-lg bg-white px-8 py-2 font-semibold text-blue-900 shadow-md hover:bg-blue-50"
                disabled={currentStep === steps.length - 1}
              >
                Next
              </button>
            </div>

            {currentStep === steps.length - 1 && (
              <div className="mt-4 text-center">
                <button className="rounded-lg bg-blue-500 px-8 py-2 font-semibold text-white shadow-md hover:bg-blue-600">
                  Finish Quiz
                </button>
              </div>
            )}
          </div>

          {/* Trip Summary Sidebar */}
          <div className="rounded-3xl bg-blue-100/80 p-8 backdrop-blur-sm">
            <h2 className="mb-6 text-3xl font-bold text-blue-900">Your Trip so Far</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg text-blue-800">Location</h3>
                <div className="flex items-center gap-2 text-xl font-semibold">
                  <MapPin className="h-5 w-5" />
                  {tripDetails.location || 'Not selected yet'}
                </div>
              </div>

              <div>
                <h3 className="text-lg text-blue-800">Date</h3>
                <div className="space-y-1">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-blue-700">Arrive Date</p>
                      <p className="font-semibold">{tripDetails.dates.arrive || 'Not set'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-700">Leave Date</p>
                      <p className="font-semibold">{tripDetails.dates.leave || 'Not set'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg text-blue-800">Transportation</h3>
                <p className="text-xl font-semibold">{tripDetails.transportation || 'Not selected yet'}</p>
              </div>

              <div>
                <h3 className="text-lg text-blue-800">Budget</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-blue-700">Trip Total:</p>
                    <p className="font-semibold text-green-600">{tripDetails.budget.tripTotal || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-700">Daily Total:</p>
                    <p className="font-semibold text-green-600">{tripDetails.budget.dailyTotal || 'Not set'}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg text-blue-800">Interests</h3>
                {tripDetails.interests.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {tripDetails.interests.map((interest) => (
                      <span key={interest} className="rounded-full bg-blue-200 px-3 py-1 text-sm text-blue-800">
                        {interest}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No interests selected yet</p>
                )}
              </div>

              <div>
                <h3 className="text-lg text-blue-800">Activities</h3>
                {tripDetails.activities.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {tripDetails.activities.map((activity) => (
                      <span key={activity} className="rounded-full bg-blue-200 px-3 py-1 text-sm text-blue-800">
                        {activity}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No activities selected yet</p>
                )}
              </div>

              <div>
                <h3 className="text-lg text-blue-800">Meals</h3>
                {tripDetails.meals.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {tripDetails.meals.map((meal) => (
                      <span key={meal} className="rounded-full bg-blue-200 px-3 py-1 text-sm text-blue-800">
                        {meal}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No meal preferences selected yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}