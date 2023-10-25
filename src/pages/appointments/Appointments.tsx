import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { RouterEnum } from "../../enums/RouterEnum";
import authService from "../../services/auth-service";
import { useNavigate } from "react-router-dom";

const Appointments = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Moje wizyty | Wirtulna przychodnia";
    checkUserRole();
  });

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

  return (
    <div>
      Appointments
      <p>{isDoctor ? "jest doktor" : "zwykłu yżut"}</p>
    </div>
  );
};

export default Appointments;
