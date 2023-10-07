import { NavLink } from "react-router-dom";
import { RouterEnum } from "../../enums/RouterEnum";

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink className="navbar__navlink" to={RouterEnum.home}>
        Home
      </NavLink>

      <NavLink className="navbar__navlink" to={RouterEnum.login}>
        Log in
      </NavLink>

      <NavLink className="navbar__navlink" to={RouterEnum.register}>
        Sign up
      </NavLink>
    </nav>
  );
};

export default Navbar;
