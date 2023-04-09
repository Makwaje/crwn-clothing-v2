import { useState } from "react";

import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";

import "./sign-in-form.styles.scss";

import Button from "../button/button.component";

const defaultFormFelids = {
  email: "",
  password: "",
};

const SighInForm = () => {
  const [FormFelids, setFormFelids] = useState(defaultFormFelids);
  const { email, password } = FormFelids;

  /// AJAX
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    console.log(user);
    await createUserDocumentFromAuth(user);
  };

  // console.log(FormFelids);

  const resetFormFelids = () => {
    setFormFelids(defaultFormFelids);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(email, password);
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
      resetFormFelids();
    } catch (error) {
      switch (error.code) {
        case "ath/wrong-password":
          alert("Incorrect password for email ");
          break;
        case "ath/user-not-found":
          alert("No user associated with this email");
          break;

        default:
          console.error(error);
      }
    }

    return;
  };

  const handelChange = (event) => {
    const { name, value } = event.target;

    setFormFelids({ ...FormFelids, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={"Email"}
          type="email"
          required
          onChange={handelChange}
          name="email"
          value={email}
        />

        <FormInput
          label={"Password"}
          type="password"
          required
          onChange={handelChange}
          name="password"
          value={password}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType="google">
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SighInForm;
