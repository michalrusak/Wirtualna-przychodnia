import { createContext } from "react";

export const defaultObject = {
  isUserLogged: false,
  displayName: "",
  toogleLoggedState: (value: boolean) => {},
};

export const UserContext = createContext(defaultObject);
