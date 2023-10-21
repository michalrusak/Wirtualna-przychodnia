import { useContext, useEffect, useState } from "react";
import authService from "../../services/auth-service";
import { useNavigate } from "react-router-dom";
import "./Logout.scss";
import { UserContext } from "../../context/UserContext";

const Logout = () => {
  const { toogleLoggedState, isUserLogged } = useContext(UserContext);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Wyloguj | Wirtulna przychodnia";
    if (!isUserLogged) {
      navigate(-1);
    } else logout();
  });

  const logout = async () => {
    const logoutResult = await authService.logout();
    if (logoutResult) {
      setMessage("Wylogowano poprawnie!");
      toogleLoggedState(false);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      setMessage("Coś poszło nie tak!");
      setTimeout(() => {
        navigate("/");
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
