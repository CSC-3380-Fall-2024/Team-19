import BudgetCircle from '../BudgetCircle.tsx'
import DraggableCalendar from '../calendar/DraggableCalendar.tsx'

import cloudBackground from '../assets/backgrounds/clouds.png';

import CombinedCalendar from '../calendar/CombinedCalendar.tsx';


function CalendarPage() {
    return (
      <>
        <div className="bg-fixed bg-cover bg-center bg-no-repeat min-h-screen w-full"
              style={{
              backgroundImage: `url(${cloudBackground})`
        }}>
          <div className="relative min-h-screen w-full">
            <div className="container mx-8 p-4">
              <div className="inline-flex gap-6 my-16">
                <div className="ml-0 w-[1200px] h-[755px] bg-blue-100/80 p-5 rounded-xl overflow-hidden">
                  <CombinedCalendar/> {/* calendar beind displayed(default to week view) */}
                </div>
                <div >
                  <BudgetCircle/>
                </div>
              </div>
            </div>
          </div>
        </div> 
      </>
    );
  }

  export default CalendarPage

  // <div className="min-h-screen bg-[#202124] flex items-center justify-center p-4">
  // <div className="ml-20 w-[1000px] h-[600px] bg-blue-100/80 p-5 rounded-xl overflow-hidden"></div>

        // <div className="bg-fixed bg-cover bg-center bg-no-repeat min-h-screen w-full"
        //        style={{
        //         backgroundImage: `url(${cloudBackground})`
        //       }}>
        //     <div className="relative min-h-screen w-full">
        //       <div className="container mx-auto p-4">
        //         {/* CONTENT */}
        //       </div>
        //     </div>
        //   </div> 