import {Food} from './eventTypes';


 function FoodEvent({
        food,
      }: {
        food: Food;
      }) {
     const {name, price, location} = food; //type, rating not used
 //use below to display
    return (
      <>
        <div className="bg-green-600 h-full" >
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

  export default FoodEvent;


//   <div className="bg-gray-100 h-full items-center justify-center flex"></div>
//   <div className="font-bold text-sm text-center">
//      {food.name};
//      {food.price}
//   </div>
// function FoodEvent({ food }: { food: Food }) {
