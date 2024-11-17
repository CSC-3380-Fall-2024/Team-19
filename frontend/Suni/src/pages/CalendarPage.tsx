import BudgetCircle from '../BudgetCircle.tsx'


import DraggableCalendar from '../calendar/DraggableCalendar.tsx'



function CalendarPage() {
    return (
      <>
    <div className="inline-flex gap-6 my-16">
          <div className="ml-15ç w-[1000px] h-[755px] bg-blue-100/80 p-5 rounded-xl overflow-hidden">
            <DraggableCalendar/> {/* calendar beind displayed(default to week view) */}
          </div>
          <div className="">
            <BudgetCircle/>
          </div>
        </div>
      </>

    );
  }

  export default CalendarPage

  // <div className="min-h-screen bg-[#202124] flex items-center justify-center p-4">
  // <div className="ml-20 w-[1000px] h-[600px] bg-blue-100/80 p-5 rounded-xl overflow-hidden"></div>