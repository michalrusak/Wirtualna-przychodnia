import { NavLink } from "react-router-dom";
import { RouterEnum } from "../../enums/RouterEnum";
import "./Navbar.scss";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const showNavbar = () => {
    setIsOpen(!isOpen);
  };

  const { isUserLogged, displayName } = useContext(UserContext);

  return (
    <>
      <nav className="navbar">
        <div className="navbar__button" onClick={showNavbar}>
          <span
            className={`navbar__span ${isOpen ? "navbar__span--active" : ""}`}
          ></span>
          <span
            className={`navbar__span ${isOpen ? "navbar__span--active" : ""}`}
          ></span>
          <span
            className={`navbar__span ${isOpen ? "navbar__span--active" : ""}`}
          ></span>
        </div>
        <ul className="navbar__list">
          <li className="navbar__list-item">
            <NavLink className="navbar__navlink" to={RouterEnum.home}>
              Strona główna
            </NavLink>
          </li>
          <li className="navbar__list-item">
            <NavLink className="navbar__navlink" to={RouterEnum.appointments}>
              Moje wizyty
            </NavLink>
          </li>
          <li className="navbar__list-item">
            <NavLink
              className="navbar__navlink"
              to={RouterEnum.newAppointments}
            >
              Nowa wizyta
            </NavLink>
          </li>
        </ul>
        <ul className="navbar__list">
          {!isUserLogged ? (
            <>
              <li className="navbar__list-item">
                <NavLink className="navbar__navlink" to={RouterEnum.login}>
                  Zaloguj się
                </NavLink>
              </li>
              <li className="navbar__list-item">
                <NavLink className="navbar__navlink" to={RouterEnum.register}>
                  Zarejesteruj się
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="navbar__list-item">
                <NavLink className="navbar__navlink" to={RouterEnum.logout}>
                  Wyloguj
                </NavLink>
              </li>
              <li className="navbar__list-item">
                <p className="navbar__name">{displayName}</p>
              </li>
            </>
          )}
        </ul>
      </nav>

      <nav className={`navbar-mobile ${isOpen ? "navbar-mobile--active" : ""}`}>
        <ul className="navbar-mobile__list">
          <li className="navbar-mobile__list-item">
            <NavLink className="navbar-mobile__navlink" to={RouterEnum.home}>
              Strona główna
            </NavLink>
          </li>
          <li className="navbar-mobile__list-item">
            <NavLink
              className="navbar-mobile__navlink"
              to={RouterEnum.appointments}
            >
              Moje wizyty
            </NavLink>
          </li>
          <li className="navbar-mobile__list-item">
            <NavLink
              className="navbar-mobile__navlink"
              to={RouterEnum.newAppointments}
            >
              Nowa wizyta
            </NavLink>
          </li>

          <>
            {!isUserLogged ? (
              <>
                <li className="navbar-mobile__list-item">
                  <NavLink
                    className="navbar-mobile__navlink"
                    to={RouterEnum.login}
                  >
                    Zaloguj się
                  </NavLink>
                </li>
                <li className="navbar-mobile__list-item">
                  <NavLink
                    className="navbar-mobile__navlink"
                    to={RouterEnum.register}
                  >
                    Zarejesteruj się
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="navbar-mobile__list-item">
                  <NavLink
                    className="navbar-mobile__navlink"
                    to={RouterEnum.logout}
                  >
                    Wyloguj
                  </NavLink>
                </li>
                <li className="navbar-mobile__list-item">
                  <p className="navbar-mobile__name">{displayName}</p>
                </li>
              </>
            )}
          </>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
