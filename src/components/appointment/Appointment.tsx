import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import authService from "../../services/auth-service";
import databaseService from "../../services/database-service";
import "./Appointment.scss";

const Appointment = (props: any) => {
  const navigate = useNavigate();
  const [isDoctorMode, setIsDoctorMode] = useState(false);

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

  useEffect(() => {
    checkUserRole();
  });

  const { isUserLogged } = useContext(UserContext);

  const checkUserRole = async () => {
    if (isUserLogged) {
      const doctor = await authService.isDoctor();
      const isDoctorMode = doctor ? true : false;
      setIsDoctorMode(isDoctorMode);
    }
  };

  const handleCancelAppointment = async () => {
    try {
      if (isDoctorMode) {
        const res = await databaseService.cancelDoctorAppoitment(props.date);
        if (res) {
          navigate(0);
        }
      } else {
        const res = await databaseService.cancelPatientAppoitment(props.date);
        if (res) {
          navigate(0);
        }
      }
    } catch (error) {
      alert("Wystąpił błąd. Spóbuj ponownie później.");
    }
  };

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
      <div className="appointment__cancel">
        <button
          onClick={handleCancelAppointment}
          className="appointment__button"
        >
          Anuluj wizytę
        </button>
      </div>
    </div>
  );
};

export default Appointment;
