import {Activity} from './eventTypes';

function ActivityEvent({
    activity,
  }: {
    activity: Activity;
  }) {
 const {name, price, location} = activity; //unused type, rating
//use below to display
return (
  <>
    <div className="bg-blue-400 h-full " >
        <div className="items-center justify between" >
            <div className="font-bold align-top">
                {name} 
            </div>
             {/* <div>
              
             </div> */}
            <div className="font-xs ">
                ${price}
            </div>            
            <div className="font-xs">
                {location}
            </div>
        </div> 
    </div>
  </>
);
}

export default ActivityEvent;




// function ActivityEvent({ activity }: { activity: Activity }) {
//     return (
//       <>
//       <div className="bg-green-100 h-full items-center justify-center flex"></div>
//          <div className="font-bold text-sm text-center">
//             {activity.name}
//             {activity.type}
//             {activity.location}
//             {activity.price}
//          </div>
//       </>
//     );
//   }

//   export default ActivityEvent;

