import { useContext, useState, useEffect } from "react";
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
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";

export default function Signup() {
  const [confirmMode, setConfirmMode] = useState(false);
  const [error, setError] = useState("");
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      confirmation: {
        value: "",
        isValid: true,
      },
    },
    false
  );
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [router, user]);

  const handleSignup = async (e) => {
    e.preventDefault();
    let response;
    try {
      response = await Auth.signUp(
        formState.inputs.email.value,
        formState.inputs.password.value
      );
    } catch (err) {
      console.log("error signing up", err);
    }
    setConfirmMode(true);
  };

  const handleConfirmSignup = async (e) => {
    e.preventDefault();
    try {
      await Auth.confirmSignUp(
        formState.inputs.email.value,
        formState.inputs.confirmation.value
      );
      let response = await Auth.signIn(
        formState.inputs.email.value,
        formState.inputs.password.value
      );
      if (response) {
        router.push("/dashboard");
      }
    } catch (err) {
      console.log("error confirming", err.message);
      if (err.name === "CodeMismatchException") {
        setError("Invalid Code. Please try again");
      }
      if (
        err.message === "User is already confirmed." ||
        err.message.includes("Current status is CONFIRMED")
      ) {
        setError("Already a user! Please log in instead");
      }
    }
  };

  const handleResend = async () => {
    try {
      await Auth.resendSignUp(formState.inputs.email.value);
    } catch (err) {
      console.log("error resending", err);
      if (err.message === "User is already confirmed.") {
        setError("Email is confirmed, please log in instead.");
      }
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        {!confirmMode ? (
          <>
            <h3 className={styles.title}>Create your account</h3>
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
                <Button onClick={handleSignup}>Continue</Button>
              </div>
            </form>
            <p className={styles.switch}>
              Have an account?{" "}
              <Link href="/login">
                <a className={styles.link}>Sign in</a>
              </Link>
            </p>
          </>
        ) : (
          <div className={styles.confirmContainer}>
            <h3 className={styles.title}>Please Verify Your Email</h3>
            <p className={styles.titleSub}>
              Enter the code sent to{" "}
              <span style={{ fontWeight: 700 }}>
                {formState.inputs.email.value}
              </span>
            </p>
            <form>
              <Input
                id="confirmation"
                placeholder="6-Digit Code"
                onInput={inputHandler}
                initialValidity={true}
              />
              <p className={styles.errorMessage}>{error}</p>
              <div className={styles.buttonContainer}>
                <Button onClick={handleConfirmSignup} type="submit">
                  Continue
                </Button>
              </div>
            </form>
            <p className={styles.resend} onClick={handleResend}>
              or Resend Code
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
