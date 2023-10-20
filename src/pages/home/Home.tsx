import { useEffect } from "react";
import authService from "../../services/auth-service";

const Home = () => {
  useEffect(() => {
    authService
      .checkUserLogged()
      .then((user) => {
        console.log("zalogowano" + user);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return <div>Home</div>;
};

export default Home;
