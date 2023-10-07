import React from "react";
import Navbar from "./components/navbar/Navbar";

import "./styles/main.scss";
import Footer from "./components/footer/Footer";
import { Routes, Route } from "react-router-dom";
import { RouterEnum } from "./enums/RouterEnum";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import NotFound from "./pages/notFound/NotFound";
import Register from "./pages/register/Register";

function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path={RouterEnum.home} element={<Home />} />
          <Route path={RouterEnum.login} element={<Login />} />
          <Route path={RouterEnum.register} element={<Register />} />
          <Route path={RouterEnum.notFound} element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;

