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

  //? means optional, no ? means required
  //isResizable?: boolean;

  // Weather Events
// const initialBackgroundEvents = [
//   {
//   start: moment("2024-11-11T07:00:00").toDate(),
//   end: moment("2024-11-11T11:00:00").toDate(),
//     data: {
//       type: "Morning",
//       weather: "Clear",
//     },
//   },
//   {
//     start: moment("2024-11-11T11:00:00").toDate(),
//     end: moment("2024-11-11T16:00:00").toDate(),
//     data: {
//       type: "Midday",
//       weather: "Clear",
//     },
//   },
//   {
//     start: moment("2024-11-11T16:00:00").toDate(),
//     end: moment("2024-11-11T19:00:00").toDate(),
//     data: {
//       type: "Afternoon",
//       weather: "Clear",
//     },
//   },
//   {
//     start: moment("2024-11-11T19:00:00").toDate(),
//     end: moment("2024-11-11T22:00:00").toDate(),
//     data: {
//       type: "Night",
//       weather: "Clear",
//     },
//   },
// ]

  // const backgroundImages = {
  //   "Morning": "url('./images/clear-morning.png')", // Replace with actual image paths
  //   "Midday": "url('./images/clouds.png')",
  //   "Afternoon": "url('./images/clear-afternoon.png')",
  //   "Night": "url('./images/clear-night.png')",
  // };

    // Custom event components selection / styling
    // const backgroundComponents = {
    //   backgroundEvent: (props: any) => {
    //     const backgroundEventType = props?.event?.data?.type;
    //     switch (backgroundEventType) {
    //       case "Morning":
    //         return <div className="bg-cover flex h-full morning-bg"></div>; /*Finish Implementation tomorrow*/
    //       case "Midday":
    //         return <div className="bg-cover flex h-full midday-bg"></div>;
    //       case "Afternoon":
    //         return <div className="bg-cover flex h-full afternoon-bg"></div>;
    //       case "Night":
    //         return <div className="bg-cover flex h-full night-bg"></div>;
    //       default:
    //         return null;
    //     }
    //   },
    // };

    
  // const backgroundImages = {
  //   "Morning": "url('./images/clear-morning.png')", // Replace with actual image paths
  //   "Midday": "url('./images/clouds.png')",
  //   "Afternoon": "url('./images/clear-afternoon.png')",
  //   "Night": "url('./images/clear-night.png')",
  // };

