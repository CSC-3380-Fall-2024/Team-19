import {Morning} from './weatherTypes';


 function MorningEvent({
        morning,
      }: {
        morning: Morning;
      }) {
     const {id, weather} = morning; //type, rating not used
 //use below to display
    return (
      <>
        <div className="bg-green-600 h-full" >
            <div className="items-center justify between" >
                <div className="font-xs">
                    {id}
                </div>
                <div className="font-xs">
                    {weather}
                </div>            

            </div> 
        </div>
      </>
    );
  }

  export default MorningEvent;

  // id: 1,
  // name: "Quick Lunch",
  // type: "Fast Food",
  // price: 12,
  // location: "Canes",
  // rating: 4.5,