import React from "react";
import Button1 from "../reusable/Button1";
import useGetHook from "../../hooks/useGetHook";

import { useNavigate } from "react-router-dom";
import LoaderPrimary from "../reusable/LoaderPrimary";
// import { sessionData } from "../../data/session";

const SessionTable = () => {
  const navigate = useNavigate();

  const handleSessionClick = (id) => {
    navigate(`/session/${id}`);
  };
  const {
    data: sessionData,
    loading,
    error,
  } = useGetHook("http://pokerplanning.local/api/session/");
  return (
    <div className="session-table">
      <h1>session history</h1>
      <div class="session-table-header">
        <table cellpadding="0" cellspacing="0" border="0">
          <thead>
            <tr>
              <th>Session</th>

              <th>Date</th>
              <th>status</th>
              <th>action</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="session-table-content">
        <table cellpadding="0" cellspacing="0" border="0">
          {loading ? (
            <LoaderPrimary />
          ) : (
            <tbody>
              {sessionData?.data.map((session, key) => (
                <tr key={key}>
                  <td
                    data-label="Session"
                    onClick={() => handleSessionClick(session.session_id)}
                    style={{ cursor: "pointer", textTransform: "capitalize" }}
                  >
                    {session.name}
                  </td>

                  <td data-label="Date">{session.created_at.substr(0, 11)}</td>
                  <td data-label="Status">
                    <Button1 status={session.status} />
                  </td>
                  <td data-label="Action">
                    <i
                      class="fa fa-trash"
                      aria-hidden="true"
                      style={{ color: "red" }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default SessionTable;
