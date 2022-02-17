import { Auth } from "aws-amplify";
import Input from "../shared/components/Input";
import styles from "../styles/Auth.module.css";
import useForm from "../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../shared/utility/validators";
import Button from "../shared/components/Button";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../shared/context/auth-context";
import { useRouter } from "next/router";

export default function Login() {
  const [error, setError] = useState();
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: "",
      },
      password: {
        value: "",
        isValid: "",
      },
    },
    false
  );
  const { user } = useContext(AuthContext);
  const router = useRouter()

  useEffect(() => {
    if(user) {
      router.push('/dashboard')
    }
  }, [user, router])

  const handleLogin = async (e) => {
    e.preventDefault();
    let response;
    try {
      response = await Auth.signIn(
        formState.inputs.email.value,
        formState.inputs.password.value
      );
      router.push('/dashboard')
      console.log(response);
    } catch (err) {
      console.log("error logging in", err);
      if (err.name === "UserNotConfirmedException") {
        setError("Please sign up again! Email not verified.");
      }
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <h3 className={styles.title}>Sign into your account</h3>
        <p className={styles.errorMessage}>{error}</p>
        <form>
          <div className={styles.inputContainer}>
            <Input
              id="email"
              onInput={inputHandler}
              headerText="Email"
              errorText="Please enter a valid email"
              validators={[VALIDATOR_EMAIL()]}
              type="text"
            />
            <Input
              id="password"
              onInput={inputHandler}
              headerText="Password"
              errorText="Please use more than 8 characters!"
              validators={[VALIDATOR_REQUIRE()]}
              type="password"
            />
          </div>
          <div className={styles.buttonContainer}>
            <Button type="submit" onClick={handleLogin}>
              Log In
            </Button>
          </div>
        </form>
        <p className={styles.switch}>
          Need an account?{" "}
          <Link href="/signup">
            <a className={styles.link}>Sign Up</a>
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}
