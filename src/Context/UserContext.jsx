import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props) {
  const [userLogin, setuserLogin] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setuserLogin(localStorage.getItem("token"));
    }
  }, []);

  return (
    <UserContext.Provider value={{ userLogin, setuserLogin }}>
      {props.children}
    </UserContext.Provider>
  );
}
