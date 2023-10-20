import { useEffect, useState } from "react";
import authService from "../../services/auth-service";
import { useNavigate } from "react-router-dom";
import "./Logout.scss";

const Logout = () => {
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Wyloguj | Wirtulna przychodnia";
    logout();
  });

  const logout = async () => {
    const userResult = await authService.checkUserLogged();
    if (userResult) {
      const logoutResult = await authService.logout();
      if (logoutResult) {
        setMessage("Wylogowano poprawnie!");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setMessage("Coś poszło nie tak!");
        setTimeout(() => {
          navigate("/");
        }, 10000);
      }
    } else {
      navigate(-1);
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
