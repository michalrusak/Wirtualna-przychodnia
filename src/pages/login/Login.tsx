import { Formik, Form, Field } from "formik";
import "./Login.scss";
import * as yup from "yup";
import { UserLogin } from "../../models/user.model";
import { useContext, useEffect } from "react";
import authService from "../../services/auth-service";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { RouterEnum } from "../../enums/RouterEnum";

const LoginSchema = () =>
  yup.object().shape({
    email: yup
      .string()
      .required("Email jest wymagany!")
      .email("Email jest nie poprawny!"),

    password: yup
      .string()
      .required("Hasło jest wymagane")
      .min(8, "Minimum 8 znaków!")
      .max(20, "Maksymalnie 20 znaków"),
  });

const Login = () => {
  const { toogleLoggedState, isUserLogged } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Zaloguj się | Wirtulna przychodnia";
    checkUserLogged();
  });

  const checkUserLogged = () => {
    if (isUserLogged) {
      navigate(-1);
    }
  };

  const handleLogin = async (values: UserLogin) => {
    const result = await authService.login(values);
    if (result) {
      toogleLoggedState(true);
      navigate(RouterEnum.home);
    } else {
      alert("Wystąpił błąd logowania. Spróbuj ponownie.");
    }
  };

  return (
    <div className="login">
      <h1 className="login__title">Zaloguj się</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          handleLogin(values);
        }}
      >
        {({ errors, touched }) => (
          <Form action="" className="login__form">
            <label htmlFor="email" className="login__label">
              Email
            </label>
            <Field
              type="email"
              name="email"
              id="email"
              className="login__input"
              placeholder="xyz@mail.com"
            />
            {errors.email && touched.email ? (
              <div className="login__error">{errors.email}</div>
            ) : null}
            <label htmlFor="password" className="login__label">
              Hasło
            </label>
            <Field
              type="password"
              name="password"
              id="password"
              className="login__input"
              placeholder="********"
            />
            {errors.password && touched.password ? (
              <div className="login__error">{errors.password}</div>
            ) : null}
            <Field
              type="submit"
              value="Zaloguj się"
              className="login__submit"
              id="login__button"
            />
            <p className="login__question">Nie masz konta?</p>
            <a href="/register" className="login__redirect">
              Załóż konto
            </a>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
