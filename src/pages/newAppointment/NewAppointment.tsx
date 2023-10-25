import { useContext, useEffect, useState } from "react";
import CalendarForm from "../../components/calendarForm/CalendarForm";
import "./NewAppointment.scss";
import HourForm from "../../components/hourForm/HourForm";
import DoctorForm from "../../components/doctorForm/DoctorForm";
import { UserContext } from "../../context/UserContext";
import authService from "../../services/auth-service";
import { useNavigate } from "react-router-dom";
import { RouterEnum } from "../../enums/RouterEnum";

const NewAppointment = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date(NaN));
  // const [fullDate, setfullDate] = useState(new Date(NaN));
  const [hour, setHour] = useState("");
  const [isDoctor, setIsDoctor] = useState(false);

  const { isUserLogged } = useContext(UserContext);

  const checkUserRole = async () => {
    if (isUserLogged) {
      const doctor = await authService.isDoctor();
      // console.log(doctor ? "to jest leakrz" : "zwykły uzyt");
      const isDoctor = doctor ? true : false;
      setIsDoctor(isDoctor);
    } else {
      navigate(RouterEnum.login);
    }
  };

  const tabExample = ["8:30", "9:00", "10:00", "11:20"];

  useEffect(() => {
    checkUserRole();
    document.title = "Nowa wizyta | Wirtulna przychodnia";
    console.log(date);
    console.log(hour);
    // setfullDate(
    //   new Date(
    //     date.getFullYear(),
    //     date.getMonth(),
    //     date.getDate(),
    //     Number(hour.split(":")[0]),
    //     Number(hour.split(":")[1])
    //   )
    // );
    // console.log(fullDate);
    console.log(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        Number(hour.split(":")[0]),
        Number(hour.split(":")[1])
      )
    );
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
        <button className="new-appointment__button">Umów wizytę</button>
      </div>
    </div>
  );
};

export default NewAppointment;
