import React from "react";

const EmailField = (props) => {
  return (
    <div className="email-field">
      <input
        type="email"
        className="email-field__input"
        value={props.value}
        name={props.name}
        onChange={props.handleChange}
        placeholder={props.placeholder}
        required={props.required ? true : false}
      />

      <input
        type="password"
        className="email-field__input"
        value={props.value}
        name={props.name}
        onChange={props.handleChange}
        placeholder={props.placeholder}
        required={props.required ? true : false}
      />

      <input
        type="email"
        className="email-field__input"
        value={props.value}
        name={props.name}
        onChange={props.handleChange}
        placeholder={props.placeholder}
        required={props.required ? true : false}
      />
    </div>
  );
};

export default EmailField;
