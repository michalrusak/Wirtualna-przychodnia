import { NavLink } from "react-router-dom";
import { RouterEnum } from "../../enums/RouterEnum";

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink className="navbar__navlink" to={RouterEnum.home}>
        Strona główna
      </NavLink>

      <NavLink className="navbar__navlink" to={RouterEnum.appointments}>
        Moje wizyty
      </NavLink>

      <NavLink className="navbar__navlink" to={RouterEnum.newAppointments}>
        Nowa wizyta
      </NavLink>

      <NavLink className="navbar__navlink" to={RouterEnum.login}>
        Zaloguj się
      </NavLink>

      <NavLink className="navbar__navlink" to={RouterEnum.register}>
        Zarejesteruj się
      </NavLink>
    </nav>
  );
};

export default Navbar;
