import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { url } from "../../url";

export const Usercontext = createContext({});

export function UsercontextProvider({ children }) {
  const [user, setuser] = useState(null);

  const getuser = async () => {
    try {
      const res = await axios.get(url + "/api/auth/refetch", {
        withCredentials: true,
      });
      console.log("from user fetch");

      setuser(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getuser();
  }, []);
  return (
    <Usercontext.Provider value={{ user, setuser, getuser }}>
      {children}
    </Usercontext.Provider>
  );
}
