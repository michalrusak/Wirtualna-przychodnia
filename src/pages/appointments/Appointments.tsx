import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { RouterEnum } from "../../enums/RouterEnum";
import authService from "../../services/auth-service";
import { useNavigate } from "react-router-dom";
import databaseService from "../../services/database-service";
import AppointmentsList from "../../components/appointmentsList/AppointmentsList";
import "./Appointments.scss";

const Appointments = () => {
  const navigate = useNavigate();

  const [isDoctor, setIsDoctor] = useState(false);
  const [appointments, setAppointments] = useState<Array<Object>>([]);

  useEffect(() => {
    document.title = "Moje wizyty | Wirtulna przychodnia";
    checkUserRole();
    getAppointments();
  }, [isDoctor]);

  const { isUserLogged } = useContext(UserContext);

  const checkUserRole = async () => {
    try {
      if (isUserLogged) {
        const doctor = await authService.isDoctor();
        const isDoctor = doctor ? true : false;
        setIsDoctor(isDoctor);
      } else {
        navigate(RouterEnum.login);
      }
    } catch (error) {
      navigate(RouterEnum.login);
    }
  };

  const getAppointments = async () => {
    try {
      if (isUserLogged) {
        if (isDoctor) {
          const allAppointments = await databaseService.getDoctorAppointments();

          setAppointments(allAppointments);
        } else {
          const allAppointments =
            await databaseService.getPatientAppointments();

          setAppointments(allAppointments);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="appointments">
      <AppointmentsList list={appointments} />
    </div>
  );
};

export default Appointments;
