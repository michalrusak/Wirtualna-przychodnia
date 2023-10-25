import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CalendarForm from "../../components/calendarForm/CalendarForm";
import DoctorForm from "../../components/doctorForm/DoctorForm";
import HourForm from "../../components/hourForm/HourForm";
import { UserContext } from "../../context/UserContext";
import { RouterEnum } from "../../enums/RouterEnum";
import authService from "../../services/auth-service";
import "./NewAppointment.scss";
import databaseService from "../../services/database-service";

const NewAppointment = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date(NaN));
  const [fullDate, setFullDate] = useState(new Date(NaN));
  const [hour, setHour] = useState("");
  const [isDoctor, setIsDoctor] = useState(false);

  const { isUserLogged } = useContext(UserContext);

  const checkUserRole = async () => {
    if (isUserLogged) {
      const doctor = await authService.isDoctor();
      const isDoctor = doctor ? true : false;
      setIsDoctor(isDoctor);
    } else {
      navigate(RouterEnum.login);
    }
  };
  // 1. zrobić dodawanie nowej pustej wizyty
  // 2. pobieranie wizytw zalezności od doktora

  const handleSetAppointment = async () => {
    try {
      console.log(fullDate);
      if (isDoctor) {
        databaseService.setEmptyAppointement(fullDate);
      } else {
        databaseService.setAppointment(fullDate);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const tabExample: String[] = [
    "8:00",
    "8:30",
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
  ];

  useEffect(() => {
    checkUserRole();
    document.title = "Nowa wizyta | Wirtulna przychodnia";
    // console.log(date);
    // console.log(hour);
    setFullDate(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        Number(hour.split(":")[0]),
        Number(hour.split(":")[1])
      )
    );

    // console.log(
    //   new Date(
    //     date.getFullYear(),
    //     date.getMonth(),
    //     date.getDate(),
    //     Number(hour.split(":")[0]),
    //     Number(hour.split(":")[1])
    //   )
    // );
  }, [date, hour]);

  return (
    <div className="new-appointment">
      <h2 className="new-appointment__title">Dodaj nową wizytę</h2>
      {isDoctor ? null : (
        <div className="new-appointment__dropdown-container">
          <DoctorForm />
        </div>
      )}
      <div className="new-appointment__calendar-container">
        <CalendarForm setAppointmentDate={(x: Date) => setDate(new Date(x))} />
      </div>
      <div className="new-appointment__hours-container">
        <HourForm
          setHour={(hour: string) => setHour(hour)}
          hoursArray={tabExample}
        />
      </div>
      <div className="new-appointment__button-container">
        <button
          disabled={!fullDate.getHours()}
          onClick={handleSetAppointment}
          className="new-appointment__button"
        >
          {isDoctor ? "Dodaj wizytę" : "Umów wizytę"}
        </button>
      </div>
    </div>
  );
};

export default NewAppointment;
