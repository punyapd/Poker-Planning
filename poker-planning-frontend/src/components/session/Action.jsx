import React from "react";
import ActionBody from "./ActionBody";
import ActionHeader from "./ActionHeader";
const Action = ({
  isReveal,
  handleRevealAndReject,
  members,
  handleAccept,
  setEstimate,
}) => {
  return (
    <div className="session-action">
      <ActionHeader />
      <ActionBody
        isReveal={isReveal}
        handleRevealAndReject={handleRevealAndReject}
        handleAccept={handleAccept}
        members={members}
        setEstimate={setEstimate}
      />
    </div>
  );
};

export default Action;
