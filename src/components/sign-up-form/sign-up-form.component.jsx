import { useState } from "react";

import {
  CreateAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";

import "./sign-up-form.styles.scss";

import Button from "../../components/button/button.component";

const defaultFormFelids = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SighUpForm = () => {
  const [FormFelids, setFormFelids] = useState(defaultFormFelids);
  const { displayName, email, password, confirmPassword } = FormFelids;

  console.log(FormFelids);

  const resetFormFelids = () => {
    setFormFelids(defaultFormFelids);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(password, confirmPassword);

    if (password !== confirmPassword) {
      alert("Your Password doesn't match");
      return;
    }

    try {
      const { user } = await CreateAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFelids();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use!");
      } else {
        console.log("user creation encountered an error", error);
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
      <h2>Don't have an account?</h2>
      <span>Sign Up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={"Display Name"}
          type="text"
          required
          onChange={handelChange}
          name="displayName"
          value={displayName}
        />

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

        <FormInput
          label={"Confirm Password"}
          type="password"
          required
          onChange={handelChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SighUpForm;
