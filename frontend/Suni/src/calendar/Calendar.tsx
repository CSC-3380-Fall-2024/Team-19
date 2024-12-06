

import {
  Calendar as BigCalendar,
  CalendarProps,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
import "../index.css";

const localizer = momentLocalizer(moment);

export const Calendar = (props: Omit<CalendarProps, "localizer">) => {
  return (
    <BigCalendar
      {...props}
      localizer={localizer}
    />
  );
};