import React from "react";
import formlogo from "../../assets/images/loginmobile.png";
const FormTop = ({ activeForm }) => {
  return (
    <div className="form-component-top">
      <img
        src={formlogo}
        alt="form_logo"
        className="form-component-top__image"
      />
      {activeForm == "login" && (
        <h3 className="form-component-top__title">Welcome Back</h3>
      )}
    </div>
  );
};

export default FormTop;
