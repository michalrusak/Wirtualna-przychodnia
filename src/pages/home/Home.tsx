import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import authService from "../../services/auth-service";
import databaseService from "../../services/database-service";

const Home = () => {
  useEffect(() => {
    document.title = "Strona główna | Wirtulna przychodnia";
    getUser();
    getDoctors();
  });

  const { isUserLogged, displayName } = useContext(UserContext);

  const getUser = async () => {
    const user = await authService.getUser();
    // console.log(user);

    const doctor = await authService.isDoctor();
    console.log(doctor ? "to jest leakrz" : "zwykły uzyt");
  };

  const getDoctors = async () => {
    const drs = await databaseService.getdoctors();
    console.log(drs);
  };

  return (
    <div>
      <p>Home</p>
      <p>{isUserLogged ? "Zalogowany" : "Brak użytkownika"}</p>
      <p>{displayName}</p>
      {/* <p>{ doctor ? "leakrz" : "zwykły"}</p> */}
    </div>
  );
};

export default Home;
