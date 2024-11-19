import {Afternoon} from './weatherTypes';


function AfternoonEvent({
  afternoon,
}: {
  afternoon: Afternoon;
}) {
const {id, weather} = afternoon; //type, rating not used
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

export default AfternoonEvent;
