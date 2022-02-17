import { createContext } from "react";
import { useState } from "react";
import { Auth } from "aws-amplify";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  const signup = async (formState) => {
    let response;
    try {
      response = await Auth.signUp(
        formState.inputs.email.value,
        formState.inputs.password.value
      );
      console.log(user);
    } catch (err) {
      console.log("error signing up", err);
    }
    console.log(response);
  };

  return (
    <AuthContext.Provider value={{ user, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
