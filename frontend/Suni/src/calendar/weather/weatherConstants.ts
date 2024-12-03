
import moment from "moment";
import { WeatherEventItem } from "./weatherTypes";

export const WEATHEREVENTS: WeatherEventItem[] = [
    {
  start: moment("2024-11-11T01:00:00").toDate(),
  end: moment("2024-11-11T11:00:00").toDate(),
    data: {
      morning: {
        temperature: 70,
        weather: "Clear",
      }
    },
    isDraggable: false
  },
  {
    start: moment("2024-11-11T11:00:00").toDate(),
    end: moment("2024-11-11T16:00:00").toDate(),
    data: {
      midday: {
        temperature: 70,
        weather: "Rain",
      }
    },
    isDraggable: false
  },
  {
    start: moment("2024-11-11T16:00:00").toDate(),
    end: moment("2024-11-11T19:00:00").toDate(),
    data: {
      morning: {
        temperature: 70,
        weather: "Clear",
      }
    },
    isDraggable: false
  },
  {
    start: moment("2024-11-11T19:00:00").toDate(),
    end: moment("2024-11-11T22:00:00").toDate(),
    data: {
      morning: {
        temperature: 70,
        weather: "Clear",
      }
    },
    isDraggable: false
  },
];

//   {
//   start: moment("2022-10-12T09:00:00").toDate(),
//   end: moment("2022-10-12T14:59:59").toDate(),
//   data: 
//   {
//       weatherBgEvent: {
//       id: 1,
//       name: "Christmas Holidays",
//       },
//   }
// },

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

