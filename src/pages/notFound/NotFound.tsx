import { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    document.title = "Nie znaleziono strony | Wirtulna przychodnia";
  });
  return <div>Not Found</div>;
};

export default NotFound;
