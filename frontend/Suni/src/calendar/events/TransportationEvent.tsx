import {Transportation} from './eventTypes';


 function TransportationEvent({
        transportation,
      }: {
        transportation: Transportation;
      }) {
     const {name, price, location} = transportation; //type, rating unused
 //use below to display
    return (
      <>
        <div className="bg-gray-600 h-full" >
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

  export default TransportationEvent;
