import { useContext } from "react";
import Input from "../shared/components/Input";
import styles from "../styles/Auth.module.css";
import useForm from "../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../shared/utility/validators";
import Button from "../shared/components/Button";
import Link from "next/link";
import { AuthContext } from "../shared/context/auth-context";

export default function Signup() {
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
  const { signup } = useContext(AuthContext)


  const handleSignup = async (e) => {
    e.preventDefault()
    let response = await signup(formState);
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <h3 className={styles.title}>Create your account</h3>
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
          </div>
          <div className={styles.inputContainer}>
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
            <Button onClick={handleSignup}>Continue</Button>
          </div>
        </form>
        <p className={styles.switch}>
          Have an account?{" "}
          <Link href="/login">
            <a className={styles.link}>Sign in</a>
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}
