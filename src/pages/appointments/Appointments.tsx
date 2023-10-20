import { useEffect } from "react";

const Appointments = () => {
  useEffect(() => {
    document.title = "Moje wizyty | Wirtulna przychodnia";
  });
  return <div>Appointments</div>;
};

export default Appointments;
