import BudgetCircle from '../BudgetCircle.tsx'

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
            <div className="container mx-20 p-4">
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

  // import React, { useState } from 'react';
  // import BudgetCircle from '../BudgetCircle';
  // import CombinedCalendar from '../calendar/CombinedCalendar';
  // import cloudBackground from '../assets/backgrounds/clouds.png';
  // import { XCircle, Maximize } from 'lucide-react';
  
  // function CalendarPage() {
  //   const [isFullScreen, setIsFullScreen] = useState(false);
  
  //   const toggleFullScreen = () => {
  //     setIsFullScreen(!isFullScreen);
  //   };
  
  //   return (
  //     <div 
  //       className="bg-fixed bg-cover bg-center bg-no-repeat min-h-screen w-full overflow-hidden"
  //       style={{
  //         backgroundImage: `url(${cloudBackground})`
  //       }}
  //     >
  //       <div className={`container mx-auto px-4 py-8 ${isFullScreen ? 'h-screen' : ''}`}>
  //         <div className={`flex flex-col lg:flex-row gap-6 ${isFullScreen ? 'h-full' : ''}`}>
  //           <div className={`relative bg-blue-100/80 p-4 rounded-xl overflow-hidden ${
  //             isFullScreen ? 'fixed inset-0 z-50 w-screen h-screen' : 'w-full lg:w-2/3 xl:w-3/4 h-[600px] lg:h-[755px]'
  //           }`}>
  //             <button
  //               onClick={toggleFullScreen}
  //               className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md"
  //             >
  //               {isFullScreen ? <XCircle size={24} /> : <Maximize size={24} />}
  //             </button>
  //             <div className="w-full h-full">
  //               <CombinedCalendar />
  //             </div>
  //           </div>
  //           {!isFullScreen && (
  //             <div className="w-full lg:w-1/3 xl:w-1/4 mt-6 lg:mt-0">
  //               <BudgetCircle />
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
  
  // export default CalendarPage;