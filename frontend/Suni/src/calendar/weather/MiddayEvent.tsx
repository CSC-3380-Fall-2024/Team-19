import {Midday} from './weatherTypes';


function MiddayEvent({
  midday,
}: {
  midday: Midday;
}) {
const {id, weather} = midday; //type, rating not used
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

export default MiddayEvent;
