import BudgetCircle from '../BudgetCircle.tsx'

import cloudBackground from '../assets/backgrounds/clouds-bg.png';

import CombinedCalendar from '../calendar/CombinedCalendar.tsx';


function CalendarPage() {
    return (
      <>
        <div className="bg-fixed bg-cover bg-center bg-no-repeat min-h-screen w-full"
              style={{
              backgroundImage: `url(${cloudBackground})`
        }}>
          <div className="grid grid-cols-12 gap-x-5"> {/*grid grid-cols-1 lg:grid-cols-2(Way to get calendar to fullscreen*/}
            <div className="col-span-1 shrink"></div> {/*empty for grid spacing */}
              <div className="col-span-6"> {/*column1 (2 spaces)*/}
               <div className="m-1 size-full"><CombinedCalendar/></div>
              </div>
              <div className="col-span-3">{/*column 2(1 space) */}
                <div className="m-1"><BudgetCircle/></div>
              </div>
            <div className="col-span-1 shrink"></div> {/*empty for grid spacing */}

            </div>
          </div>
      </>
    );
  }

  export default CalendarPage

  //old implementation
        //     {/* <div className="relative min-h-screen w-full"> */}
        //     <div className="container mx-20 p-4 inline-flex gap-6 my-16 ">
        //       {/* <div className="inline-flex gap-6 my-16"> */}
        //         <div className="ml-0  bg-blue-100/80 p-5 rounded-xl overflow-hidden">
        //           <CombinedCalendar/> {/* calendar beind displayed(default to week view) */}
        //         </div>
        //         <div >
        //           <BudgetCircle/>
        //         </div>
        //       </div>
        //     </div>
        //   {/* </div> */}
        // {/* </div>  */}

