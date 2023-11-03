import { useContext, useEffect, useState } from "react";
import authService from "../../services/auth-service";
import { useNavigate } from "react-router-dom";
import "./Logout.scss";
import { UserContext } from "../../context/UserContext";
import { RouterEnum } from "../../enums/RouterEnum";

const Logout = () => {
  const navigate = useNavigate();
  const { toogleLoggedState, isUserLogged } = useContext(UserContext);
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.title = "Wyloguj | Wirtulna przychodnia";
    if (isUserLogged) {
      logout();
    } else navigate(-1);
  });

  const logout = async () => {
    try {
      const logoutResult = await authService.logout();
      if (logoutResult) {
        setMessage("Wylogowano poprawnie!");
        toogleLoggedState(false);
        setTimeout(() => {
          navigate(RouterEnum.home);
        }, 3000);
      }
    } catch (error) {
      setMessage("Coś poszło nie tak!");
      setTimeout(() => {
        navigate(RouterEnum.home);
      }, 6000);
    }
  };

  return (
    <div className="logout">
      <h1 className="logout__title">{message}</h1>
      <p className="logout__text">
        Za chwilę zostaniesz przeniesiony na stronę główną!
      </p>
    </div>
  );
};

export default Logout;
