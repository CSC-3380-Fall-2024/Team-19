import {Entertainment} from './eventTypes';


 function EntertainmentEvent({
        entertainment,
      }: {
        entertainment: Entertainment;
      }) {
     const {name, price, location} = entertainment; //unused: type, rating
 //use below to display
    return (
      <>
        <div className="bg-orange-600 h-full" >
            <div className="items-center justify between" >
                <div className="font-xs">
                    {name} 
                </div>
                 <div>
                 </div>
                <div className="font-xs">
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

  export default EntertainmentEvent;
