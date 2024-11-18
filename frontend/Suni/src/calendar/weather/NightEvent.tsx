import {Night} from './weatherTypes';


function NightEvent({
  night,
}: {
  night: Night;
}) {
const {id, weather} = night; //type, rating not used
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

export default NightEvent;
