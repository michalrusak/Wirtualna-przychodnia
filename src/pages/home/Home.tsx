import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import authService from "../../services/auth-service";

const Home = () => {
  useEffect(() => {
    document.title = "Strona główna | Wirtulna przychodnia";
    getUser();
  });

  const { isUserLogged, displayName } = useContext(UserContext);

  const getUser = async () => {
    const user = await authService.getUser();
    console.log(user);
  };

  return (
    <div>
      <p>Home</p>
      <p>{isUserLogged ? "Zalogowany" : "Brak użytkownika"}</p>
      <p>{displayName}</p>
    </div>
  );
};

export default Home;
