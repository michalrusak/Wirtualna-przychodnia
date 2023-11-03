import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import { UserContext, defaultObject } from "./context/UserContext";
import { RouterEnum } from "./enums/RouterEnum";
import Appointments from "./pages/appointments/Appointments";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Logout from "./pages/logout/Logout";
import NewAppointment from "./pages/newAppointment/NewAppointment";
import NotFound from "./pages/notFound/NotFound";
import Register from "./pages/register/Register";
import authService from "./services/auth-service";
import "./styles/main.scss";

function App() {
  const [isUser, setUser] = useState(defaultObject.isUserLogged);
  const [name, setName] = useState<string>("");

  const handleToogleLoggedUser = (value: boolean) => {
    setUser(value);
  };

  const isLogged = async () => {
    const result = await authService.checkUserLogged();
    if (result) {
      handleToogleLoggedUser(true);
      const name = await authService.getName();
      setName(name);
    } else {
      handleToogleLoggedUser(false);
      setName("");
    }
  };

  useEffect(() => {
    isLogged();
  });

  return (
    <>
      <UserContext.Provider
        value={{
          isUserLogged: isUser,
          displayName: name,
          toogleLoggedState: handleToogleLoggedUser,
        }}
      >
        <Navbar />
        <main className="container">
          <Routes>
            <Route path={RouterEnum.home} element={<Home />} />
            <Route path={RouterEnum.login} element={<Login />} />
            <Route path={RouterEnum.register} element={<Register />} />
            <Route path={RouterEnum.logout} element={<Logout />} />
            <Route path={RouterEnum.appointments} element={<Appointments />} />
            <Route
              path={RouterEnum.newAppointments}
              element={<NewAppointment />}
            />
            <Route path={RouterEnum.notFound} element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default App;

