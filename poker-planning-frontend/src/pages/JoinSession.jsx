import React, { useState, useEffect } from "react";
import { getKey } from "../helpers/sessionKey";
import { useNavigate, useParams } from "react-router-dom";
import usePostData from "../hooks/usePostHook";
import { toast } from "react-toastify";
import Loader from "../components/reusable/Loader";

const JoinSession = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [postData, loading, error] = usePostData(
    "http://pokerplanning.local:10015/api/session/join/"
  );

  const userId = JSON.parse(getKey("userData")).id;

  useEffect(() => {
    if (!getKey("userData")) {
      navigate("/login", { state: { from: `/session/${id}/join/` } });
    }
  });

  const handleJoin = async (event) => {
    event.preventDefault();
    const data = {
      user: userId,
      session: id,
    };
    const result = await postData(data);
    if (error == "user Already joined") {
      navigate(`/session/${id}/`);
    }
    if (result?.status == "201") {
      toast.success(result.message);
      navigate(`/session/${id}/`);
    }
    if (error == "session not found") {
      toast.error("session not found");
    }
  };

  return (
    <div className="join-session-container">
      <div className="join-session-container-body">
        <form action="" onSubmit={handleJoin}>
          <h1>Join Session</h1>

          <input type="text" name="session" value={id} />
          <button type="submit">{loading ? <Loader /> : "JOIN"}</button>
        </form>
      </div>
    </div>
  );
};

export default JoinSession;
