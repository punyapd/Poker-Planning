import React from "react";
import SessionHeaderItem from "./SessionHeaderItem";
const SessionHeader = ({ session, moderator }) => {
  return (
    <div className="session-header">
      <h1>{session?.data?.session[0].name}</h1>
      <div className="session-header-container">
        <SessionHeaderItem icon="share" action="share Link" session={session} />
        <SessionHeaderItem
          icon="xmark"
          action="Close Session"
          session={session}
          moderator={moderator}
        />
      </div>
    </div>
  );
};

export default SessionHeader;
