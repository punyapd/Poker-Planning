import React from "react";
import ErrorMessage from "./ErrorMessage";

const CustomInputFields = (Props) => {
  const {
    value,
    label,
    name,
    placeholder,
    type,
    handleChange,
    required,
    validation,
  } = Props;

  return (
    <div className="custom-input-field">
      <label htmlFor="">{label}</label>
      <input
        type={type}
        value={value}
        name={name}
        className="form_input"
        placeholder={placeholder}
        onChange={(e) => handleChange(e)}
      />

      {name === "email" && validation.email && (
        <ErrorMessage message={validation.email} />
      )}

      {name === "fullName" && validation.fullName && (
        <ErrorMessage message={validation.fullName} />
      )}
    </div>
  );
};

export default CustomInputFields;
