import React, { useState } from "react";

import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import ErrorMessage from "./ErrorMessage";

const PasswordField = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleEyeIconClick = (e) => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-field custom-input-field">
      <div className="password-field__label">
        <label>{props.label}</label>
      </div>
      <input
        type={showPassword ? "text" : "password"}
        value={props.value}
        name={props.name}
        onChange={props.handleChange}
        className="form_input"
        placeholder={props.placeholder}
      />
      <div className="password-field__icon">
        <span onClick={handleEyeIconClick}>
          {showPassword ? (
            <EyeIcon height={16} width={16} />
          ) : (
            <EyeOffIcon height={16} width={16} />
          )}
        </span>
      </div>

      {props.name == "password" && props.validation.password && (
        <ErrorMessage message={props.validation.password} />
      )}

      {props.name == "confirmPassword" && props.validation.confirmPassword && (
        <ErrorMessage message={props.validation.confirmPassword} />
      )}
    </div>
  );
};

export default PasswordField;
