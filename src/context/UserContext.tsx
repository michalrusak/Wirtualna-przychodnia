import { createContext } from "react";

export const defaultObject = {
  isUserLogged: false,
  toogleLoggedState: () => {},
};

export const AppContext = createContext(defaultObject);
