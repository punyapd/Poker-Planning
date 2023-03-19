import axios from "axios";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../reusable/Button";
import CustomInputFields from "../reusable/CustomInputFiels";
import PasswordField from "../reusable/PasswordField";

const SignupForm = ({ activeForm }) => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validation, setValidation] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const checkValidation = () => {
    let errors = { ...validation };
    //first Name validation
    if (!signupData.fullName.trim()) {
      errors.fullName = "Full name is required";
    } else {
      errors.fullName = "";
    }
    //email  validation
    if (!signupData.email.trim()) {
      errors.email = "Email  is required";
    } else {
      errors.email = "";
    }

    //password  validation
    if (!signupData.password.trim()) {
      errors.password = "Password is required";
    } else if (signupData.password.length < 8) {
      errors.password = " Your password must have at least 8 characters";
    } else {
      errors.password = "";
    }
    //conform password  validation
    if (!signupData.confirmPassword.trim()) {
      errors.confirmPassword = "Confirm your password";
    } else if (signupData.confirmPassword !== signupData.password) {
      errors.confirmPassword = "Password does not match";
    } else {
      errors.confirmPassword = "";
    }

    setValidation(errors);

    return;
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setSignupData({ ...signupData, [name]: value });
    setValidation({ ...validation, [name]: "" });
  }

  const navigate = useNavigate();

  const notify = (msg) => {
    toast.success(msg);
  };

  function handleSubmit(e) {
    e.preventDefault();
    checkValidation();
    if (
      signupData.fullName === "" ||
      signupData.email === "" ||
      signupData.password === "" ||
      signupData.confirmPassword !== signupData.password ||
      signupData.confirmPassword === ""
    ) {
    } else {
      const formData = {
        fullName: signupData.fullName,
        email: signupData.email,
        password: signupData.password,
      };
      axios
        .post(
          "http://pokerplanning.local:10015/api/users/signup/",
          JSON.stringify(formData)
        )
        .then((response) => {
          if (response.status == "201") {
            navigate("/login");
            notify(response.data.message);
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  }

  return (
    <div className="form">
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <CustomInputFields
          type="text"
          label="FullName"
          handleChange={handleChange}
          value={signupData.fullName}
          validation={validation}
          name={"fullName"}
          placeholder={"Enter Full Name"}
          className="form__input"
          required={true}
        />
        <CustomInputFields
          type="email"
          label="Email"
          handleChange={handleChange}
          value={signupData.email}
          validation={validation}
          name={"email"}
          placeholder={"Enter Email"}
          className="form__input"
          required={true}
        />

        <PasswordField
          type="password"
          label="password"
          handleChange={handleChange}
          value={signupData.password}
          validation={validation}
          name={"password"}
          placeholder={"Enter Password"}
          className="form__input"
          required={true}
        />

        <PasswordField
          type="password"
          label="Confirm Password"
          handleChange={handleChange}
          value={signupData.confirmPassword}
          validation={validation}
          name={"confirmPassword"}
          placeholder={"Enter Password Again"}
          className="form__input"
          required={true}
        />

        <Button activeForm={activeForm} />
      </form>
    </div>
  );
};

export default SignupForm;
