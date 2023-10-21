import { createContext } from "react";

export const defaultObject = {
  isUserLogged: false,
  toogleLoggedState: (value: boolean) => {},
};

export const UserContext = createContext(defaultObject);
