import { createContext, useCallback, useEffect } from "react";
import { useState } from "react";
import { Auth, Hub } from "aws-amplify";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    checkUser();
    console.log(user)
  }, []);

  useEffect(() => {
    Hub.listen("auth", () => {
      checkUser();
    });
  }, []);

  const checkUser = async () => {
    let response;
    try {
      response = await Auth.currentAuthenticatedUser();
      setUser(response);
    } catch (err) {
      console.log(err);
      setUser(null);
    }
    console.log(response);
  };


  return (
    <AuthContext.Provider
      value={{ user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
