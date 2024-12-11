import BudgetCircle from '../BudgetCircle'
import cloudBackground from '../assets/backgrounds/clouds-bg.png'
import CombinedCalendar from '../calendar/CombinedCalendar'

function CalendarPage() {
  return (
    <div 
      className="bg-fixed bg-cover bg-center bg-no-repeat min-h-screen w-full py-10 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${cloudBackground})`
      }}
    >
      <div className="container mx-auto flex flex-col lg:flex-row gap-8">
        <div className="flex-grow lg:w-2/3 xl:w-3/4">
          <CombinedCalendar />
        </div>
        <div className="lg:w-1/3 xl:w-1/4">
          <BudgetCircle />
        </div>
      </div>
    </div>
  )
}

export default CalendarPage