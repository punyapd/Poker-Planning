import React from "react";
import Loader from "../reusable/Loader";
const CreateSession = ({
  handleSessionCreate,
  handleSessionNameChange,
  createSessionLoading,
}) => {
  return (
    <div className="create-session">
      <h1 className="create-session__title">CREATE NEW SESSION</h1>
      <div className="create-session-main">
        <form className="create-session-form">
          <label>
            <h1>Name</h1>
          </label>
          <input
            type="text"
            name="session_name"
            placeholder="Enter Session Name Here"
            onChange={handleSessionNameChange}
          />

          {/* <button className="create-button">Create</button> */}

          <button onClick={handleSessionCreate}>
            {createSessionLoading ? <Loader /> : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSession;
