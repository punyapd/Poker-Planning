import React from "react";
import image from "../assets/images/login.png";
import FormComponent from "../components/forms/FormComponent";
const Signup = () => {
  return (
    <div className="container">
      <div className="form-wrapper">
        <div className="form-wrapper-left">
          <FormComponent activeForm="signup" />
        </div>

        <div className="form-wrapper-right">
          <figure className="form-wrapper-right__figure">
            <img src={image} alt="loginI_image" loading="lazy" />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default Signup;
