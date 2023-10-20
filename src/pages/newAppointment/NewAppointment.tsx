import { useEffect, useState } from "react";
import CalendarForm from "../../components/calendarForm/CalendarForm";
import "./NewAppointment.scss";
import HourForm from "../../components/hourForm/HourForm";

const NewAppointment = () => {
  const [date, setDate] = useState(new Date(NaN));
  // const [fullDate, setfullDate] = useState(new Date(NaN));
  const [hour, setHour] = useState("");

  const tabExample = ["8:30", "9:00", "10:00", "11:20"];

  useEffect(() => {
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
      <div>
        <div className="new-appointment__container">
          <CalendarForm
            setAppointmentDate={(x: Date) => setDate(new Date(x))}
          />
          <HourForm
            setHour={(hour: string) => setHour(hour)}
            hoursArray={tabExample}
          />
        </div>
      </div>
    </div>
  );
};

export default NewAppointment;
