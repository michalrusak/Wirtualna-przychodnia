import { NavLink, Route, Routes } from "react-router-dom";
import { RouterEnum } from "../../enums/RouterEnum";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";
import NotFound from "../../pages/notFound/NotFound";
import Home from "../../pages/home/Home";

const Navbar = () => {
  return (
    <div className="container">
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

      <Routes>
        <Route path={RouterEnum.home} element={<Home />} />
        <Route path={RouterEnum.login} element={<Login />} />
        <Route path={RouterEnum.register} element={<Register />} />
        <Route path={RouterEnum.notFound} element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Navbar;
