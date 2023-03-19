import React from "react";
import MembersBody from "./MembersBody";
import MembersHeaders from "./MembersHeaders";

const Members = ({ isReveal, members }) => {
  return (
    <div className="session-members">
      <MembersHeaders />

      <MembersBody isReveal={isReveal} members={members} />
    </div>
  );
};

export default Members;
