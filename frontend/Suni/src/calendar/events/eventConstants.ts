 import moment from "moment";
import { EventItem } from "./eventTypes";

// export enum AppointmentStatusCode {
//   Pending = "P",
//   CheckedIn = "CI",
// }

// export const EVENT_STATUS_COLORS = {
//   P: "#bee2fa",
//   CI: "#c7edca",
// };
//holds default events / data to fill events

export const EVENTS: EventItem[] = [
    {
        start: moment("2024-11-20T10:30:00").toDate(),
        end: moment("2024-11-20T11:30:00").toDate(),
        title: "Lunch",
        resourceID: 1,
        data: {
            food: {
                id: 1,
                name: "Quick Lunch",
                type: "Fast Food",
                price: 12,
                location: "Canes",
                rating: 4.5,
            }
        },
        isDraggable: true,
    },
    {
        start: moment("2024-11-20T13:00:00").toDate(),
        end: moment("2024-11-20T18:30:00").toDate(),
        title: "Museum",
        resourceID: 2,
        data: {
          activity: {
            id: 6,
            name: "Museum",
            type: "Art",
            price: 20,
            location: "Museum of Art",
            rating: 3.5,
          }
        },
        isDraggable: true,
    },
    {
        start: moment("2024-11-20T12:10:00").toDate(),
        end: moment("2024-11-20T12:50:00").toDate(),
        title: "Train Ride",
        resourceID: 3,
        data: {
            transportation: {
                id: 5,
                name: "Train",
                type: "Public",
                price: 5,
                location: "Penn Station",
                rating: 4,
            }
        },
        isDraggable: true,
    },
    {
        start: moment("2024-11-18T11:20:00").toDate(),
        end: moment("2024-11-18T12:40:00").toDate(),
        title: "Dinner",
        resourceID: 4,
        data: {
            food: {
                id: 2,
                name: "Lunch",
                type: "Mexican",
                price: 10,
                location: "Taco Bell",
                rating: 4.5,
            },
        },
        isDraggable: true,
    },
    {
      start: moment("2024-11-18T17:20:00").toDate(),
      end: moment("2024-11-18T19:10:00").toDate(),
      title: "Movies",
      resourceID: 5,
      data: {
        entertainment: {
            id: 3,
            name: "Dinner",
            type: "Italian",
            price: 20,
            location: "Chili's",
            rating: 4.5,
      },
    },
    isDraggable: true,
    },
  ];
