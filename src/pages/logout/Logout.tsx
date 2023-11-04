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
        await new Promise((resolve) => setTimeout(resolve, 3000));
        navigate(RouterEnum.home);
        toogleLoggedState(false);
      }
    } catch (error) {
      setMessage("Coś poszło nie tak!");
      await new Promise((resolve) => setTimeout(resolve, 6000));
      navigate(RouterEnum.home);
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
