import React, { useContext, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./Register.scss";
import { UserRegister } from "../../models/user.model";
import authService from "../../services/auth-service";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { RouterEnum } from "../../enums/RouterEnum";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Za mało znaków!")
    .max(50, "Za dużo znaków!")
    .required("Imię jest wymagane!"),
  lastName: Yup.string()
    .min(2, "Za mało znaków!")
    .max(50, "Za dużo znaków!")
    .required("Nazwisko jest wymagane!"),
  email: Yup.string()
    .email("Email jest nie poprawny!")
    .required("Email jest wymagany!"),
  password: Yup.string()
    .min(8, "Minimum 8 znaków!")
    .max(20, "Maksymalnie 20 znaków!")
    .required("Hasło jest wymagane!"),
});

const Register = () => {
  const { toogleLoggedState, isUserLogged } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Zarejestruj się | Wirtulna przychodnia";
    checkUserLogged();
  });

  const checkUserLogged = () => {
    if (isUserLogged) {
      navigate(-1);
    }
  };

  const handleRegister = async (values: UserRegister) => {
    try {
      const result = await authService.register(values);
      if (result) {
        toogleLoggedState(true);
        navigate(RouterEnum.home);
      }
    } catch (error) {
      alert("Wystąpił błąd rejestracji. Spróbuj ponownie.");
    }
  };

  return (
    <div className="register">
      <h1 className="register__title">Zarejestruj się</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          handleRegister(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="register__form">
            <label htmlFor="firstname" className="register__label">
              Imię
            </label>
            <Field
              name="firstName"
              id="firstname"
              className="register__input"
              placeholder="Imię"
            />
            {errors.firstName && touched.firstName ? (
              <div className="register__error">{errors.firstName}</div>
            ) : null}
            <label htmlFor="lastname" className="register__label">
              Nazwisko
            </label>
            <Field
              name="lastName"
              id="lastname"
              className="register__input"
              placeholder="Nazwisko"
            />
            {errors.lastName && touched.lastName ? (
              <div className="register__error">{errors.lastName}</div>
            ) : null}
            <label htmlFor="email" className="register__label">
              Email
            </label>
            <Field
              name="email"
              type="email"
              id="email"
              className="register__input"
              placeholder="xyz@mail.com"
              autoComplete="username"
            />
            {errors.email && touched.email ? (
              <div className="register__error">{errors.email}</div>
            ) : null}
            <label htmlFor="password" className="register__label">
              Hasło
            </label>
            <Field
              name="password"
              type="password"
              id="password"
              className="register__input"
              placeholder="********"
              autoComplete="new-password"
            />
            {errors.password && touched.password ? (
              <div className="register__error">{errors.password}</div>
            ) : null}

            <Field
              type="submit"
              value="Zarejestruj się"
              className="register__submit"
              id="register__button"
            />

            <p className="register__question">Masz już konto?</p>
            <a href="/login" className="register__redirect">
              Zaloguj się!
            </a>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
