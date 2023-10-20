import { useEffect } from "react";
import authService from "../../services/auth-service";

const Home = () => {
  useEffect(() => {
    document.title = "Strona główna | Wirtulna przychodnia";

    isLogged();
  });

  const isLogged = async () => {
    const result = await authService.checkUserLogged();
    if (result) {
      console.log("zalogowany");
    } else {
      console.log("brak usera");
    }
  };
  return <div>Home</div>;
};

export default Home;
