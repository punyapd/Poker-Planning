import React from "react";
import image from "../assets/images/login.png";
import FormComponent from "../components/forms/FormComponent";
const Login = () => {
  return (
    <div className="container">
      <div className="form-wrapper">
        <div className="form-wrapper-left">
          <FormComponent activeForm="login" />
        </div>

        <div className="form-wrapper-right">
          <figure className="form-wrapper-right__figure">
            <img src={image} alt="login_image" loading="lazy" />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default Login;
