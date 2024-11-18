//instantiate / define reusable event types with expected data values
//redundant (eventItem used instead)
// export type Event = {
//     title: string;
//     start: Date;
//     end: Date;
//     data: { food?: Food; activity?: Activity; transportation?: Transportation; entertainment?: Entertainment; };
//   }
//important things like title, start, end ddate are handled seperately, only focus on individual values here
export type Food = {
    id: number;
    name: string;
    type: string;
    price: number;
    location: string;
    rating: number;
  };


export type Activity = {
    id: number;
    name: string;
    type: string;
    price: number;
    location: string;
    rating: number;
  };
  
    export type Entertainment = {
        id: number;
        name: string;
        type: string;
        price: number;
        location: string;
        rating: number;

    };

    export type Transportation = {
        id: number;
        name: string;
        type: string;
        price: number;
        location: string;
        rating: number;
    };
  //expected eventItem, fill in data with expected type (food, activity, transportation, entertainment)
  export type EventItem = {
    start: Date;
    end: Date;
    title: string;
    resourceID?: number;
    data: { food?: Food; activity?: Activity; transportation?: Transportation; entertainment?: Entertainment; };
    isDraggable?: boolean;
  };


