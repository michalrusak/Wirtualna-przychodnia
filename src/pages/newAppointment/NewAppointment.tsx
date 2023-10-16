import { useEffect, useState } from "react";
import CalendarForm from "../../components/calendarForm/CalendarForm";
import "./NewAppointment.scss";

const NewAppointment = () => {
  const [date, setDate] = useState(new Date(NaN));

  useEffect(() => {
    console.log(date);
  });

  return (
    <div className="new-appointment">
      <h2 className="new-appointment__title">Dodaj nową wizytę</h2>
      <div>
        <div className="new-appointment__container">
          <CalendarForm
            setAppointmentDate={(x: Date) => setDate(new Date(x))}
          />
        </div>
      </div>
    </div>
  );
};

export default NewAppointment;
