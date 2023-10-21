import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";

const Home = () => {
  useEffect(() => {
    document.title = "Strona główna | Wirtulna przychodnia";
  });

  const { isUserLogged } = useContext(UserContext);

  return (
    <div>
      <p>Home</p>
      <p>{isUserLogged ? "Zalogowany" : "Brak użytkownika"}</p>
    </div>
  );
};

export default Home;
