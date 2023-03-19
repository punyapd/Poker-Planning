import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { setKey } from "../../helpers/sessionKey";

import axios from "axios";

import CustomInputFields from "../reusable/CustomInputFiels";
import Button from "../reusable/Button";
import PasswordField from "../reusable/PasswordField";

const LoginForm = ({ activeForm }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loginData, setInputValue] = useState({
    email: "",
    password: "",
  });


  const [validation, setValidation] = useState({
    email: "",
    password: "",
  });

  const checkValidation = () => {
    let errors = { ...validation };

    //email  validation
    if (!loginData.email.trim()) {
      errors.email = "Email  is required";
    } else {
      errors.email = "";
    }

    //password  validation
    if (!loginData.password.trim()) {
      errors.password = "Password is required";
    } else {
      errors.password = "";
    }

    setValidation(errors);
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setInputValue({ ...loginData, [name]: value });
    setValidation({ ...validation, [name]: "" });
  }

  const notify = (msg) => {
    toast.success(msg);
  };

  function handleLoginSubmit(e) {
    e.preventDefault();
    checkValidation();

    if (loginData.email == "" || loginData.password === "") {
    } else {
      axios
        .post(
          "http://pokerplanning.local:10015/api/users/login/",
          JSON.stringify(loginData)
        )
        .then((response) => {
          if (response.status == "200") {
            if (location.state) {
              navigate(location.state.from);
            } else {
              navigate("/");
            }
            notify(response.data.message);
            setKey("userData", response.data.user);
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  }

  return (
    <div className="form">
      <form action="" onSubmit={(e) => handleLoginSubmit(e)}>
        <CustomInputFields
          type="email"
          label="Email"
          handleChange={handleChange}
          value={loginData.email}
          validation={validation}
          name={"email"}
          placeholder={"Enter Email"}
          className="form__input"
          activeForm={activeForm}
          required={true}
        />

        <PasswordField
          type="password"
          label="password"
          handleChange={handleChange}
          value={loginData.password}
          validation={validation}
          name={"password"}
          placeholder={"Enter Password"}
          className="form__input"
          activeForm={activeForm}
          required={true}
        />

        <div className="remember-me">
          <input type="checkbox" id="remember" name="remember" value="Bike" />
          <label>Remember Me</label>
        </div>

        <Button activeForm={activeForm} />
      </form>
    </div>
  );
};

export default LoginForm;
