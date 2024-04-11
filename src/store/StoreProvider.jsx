import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";
import { api_base_url } from "../COSTANTS";
const AppContext = createContext();
export default function StoreProvider({ children }) {
  const [user, setUser] = useState({
    id: null,
    step_1: false,
    step_2: false,
  });
  const sharedState = {
    user: user,
    setUser: setUser,
  };
  useEffect(() => {
    const id = localStorage.getItem("id");
    async function fetchUser() {
      try {
        const res = await axios.get(
          `${api_base_url}/user/` + id + `?timestamp=${new Date().getTime()}`
        ); 
        if (res.status == 200) {
          setUser({
            id: id,
            step_1: res.data.data.steps.step_1,
            step_2: res.data.data.steps.step_2,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, []);
  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useStoreContext() {
  return useContext(AppContext);
}
