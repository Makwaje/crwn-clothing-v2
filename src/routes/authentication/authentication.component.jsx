import SighUpForm from "../../components/sign-up-form/sign-up-form.component";
import SighInForm from "../../components/sign-in-form/sign-in-form.component";

import "./authentication.styles.scss";

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SighInForm />
      <SighUpForm />
    </div>
  );
};
export default Authentication;
