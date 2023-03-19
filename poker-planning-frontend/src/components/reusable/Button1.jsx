import React from "react";

const Button1 = ({ status }) => {
  return (
    <button className={`status-button status-button--${status}`}>
      {status}
    </button>
  );
};

export default Button1;
