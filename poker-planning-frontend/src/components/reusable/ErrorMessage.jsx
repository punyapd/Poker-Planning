import React from "react";

const ErrorMessage = ({ message }) => {
  const customStyle = { color: "red", fontSize: "12px" };
  return (
    <div className="errormessage">
      <p style={customStyle}> {message}</p>
    </div>
  );
};

export default ErrorMessage;
