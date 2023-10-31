import { useEffect } from "react";
import { RouterEnum } from "../../enums/RouterEnum";
import "./NotFound.scss";

const NotFound = () => {
  useEffect(() => {
    document.title = "Nie znaleziono strony | Wirtulna przychodnia";
  });
  return (
    <div className="not-found">
      <h1 className="not-found__title">UPS...</h1>
      <div className="not-found__description">
        Wygląda na to, że ta strona nie istnieje
      </div>
      <a href={RouterEnum.home} className="not-found__redirect">
        Kliknij tu aby przejśc do strony głównej
      </a>
    </div>
  );
};

export default NotFound;
