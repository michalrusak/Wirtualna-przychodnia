import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { RouterEnum } from "../../enums/RouterEnum";
import authService from "../../services/auth-service";
import "./SignInGoogle.scss";

const SignInGoogle = () => {
  const navigate = useNavigate();
  const { toogleLoggedState } = useContext(UserContext);
  const handleSignInWithGoogle = async () => {
    try {
      const response = await authService.signInWithGoogle();
      if (response) {
        toogleLoggedState(true);
        navigate(RouterEnum.home);
      }
    } catch (error) {
      alert("Nie udało się zalogować przez google!");
    }
  };

  return (
    <div className="sign-in-google">
      <button
        className="sign-in-google__button"
        onClick={handleSignInWithGoogle}
      >
        Zaloguj się przez google
      </button>
    </div>
  );
};

export default SignInGoogle;
