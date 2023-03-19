import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getKey } from "../helpers/sessionKey";

import usePostData from "../hooks/usePostHook";
import Loader from "../components/reusable/Loader";
import { toast } from "react-toastify";

const NewSession = () => {
  const [sessionName, setSessionName] = useState();

  const [postData, isLoading, error] = usePostData(
    "http://pokerplanning.local:10015/api/session/"
  );

  const navigate = useNavigate();

  const currentUser = JSON.parse(getKey("userData"));

  const sessionData = {
    name: sessionName,
    moderator: currentUser.id,
  };

  const handleSessionCreate = async (event) => {
    event.preventDefault();
    const result = await postData(sessionData);
    if (result.status == "201") {
      navigate(`/session/${result.id}`);
      toast.success(result.message);
    }

    if (error) {
      toast.error(error);
    }
  };

  const handleSessionNameChange = (event) => {
    const { value } = event.target;
    setSessionName(value);
  };

  return (
    <div className="create-session">
      <h1 className="create-session__title">CREATE NEW SESSION</h1>
      <div className="create-session-main">
        <form className="create-session-form" onSubmit={handleSessionCreate}>
          <label>
            <h1>Name</h1>
          </label>
          <input
            type="text"
            name="session_name"
            placeholder="Enter Session Name Here"
            onChange={handleSessionNameChange}
            required
          />

          <button type="submit">{isLoading ? <Loader /> : "Create"}</button>
        </form>
      </div>
    </div>
  );
};

export default NewSession;
