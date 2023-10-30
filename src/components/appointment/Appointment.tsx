import { useEffect } from "react";
import "./Appointment.scss";

const Appointment = (props: any) => {
  const months = [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ];

  return (
    <div
      className={`appointment ${
        props.isAvailable ? "appointment--available" : ""
      }`}
    >
      <div className="appointment__date">
        {`${props.date.getDate()} ${months[props.date.getMonth()]} 
        ${props?.date.getFullYear()}`}
      </div>
      <div className="appointment__hour">
        {`${props.date.getHours()} : ${
          props.date.getMinutes() === 0
            ? "0" + props.date.getMinutes()
            : +props.date.getMinutes()
        }`}
      </div>
      <div className="appointment__name">{props.name}</div>
    </div>
  );
};

export default Appointment;
