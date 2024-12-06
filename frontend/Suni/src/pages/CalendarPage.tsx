import BudgetCircle from '../BudgetCircle.tsx'

import cloudBackground from '../assets/backgrounds/clouds-bg.png';

import CombinedCalendar from '../calendar/CombinedCalendar.tsx';


function CalendarPage() {
    return (
      <>
        <div className="bg-fixed bg-cover bg-center bg-no-repeat min-h-screen w-full py-10"
              style={{
              backgroundImage: `url(${cloudBackground})`
        }}>
          <div className="container mx-auto grid lg:grid-cols-12 gap-x-5"> {/*grid grid-cols-1 lg:grid-cols-2(Way to get calendar to fullscreen*/}
              <div className="col-span-9"> 
                <CombinedCalendar/>
              </div>
              <div className="col-span-3">
                <BudgetCircle/>
              </div>
            </div>
          </div>
      </>
    );
  }

  export default CalendarPage


