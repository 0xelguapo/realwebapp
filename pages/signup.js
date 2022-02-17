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

  const handleSignup = async (e) => {
    e.preventDefault();
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
    console.log(response)
  };

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
