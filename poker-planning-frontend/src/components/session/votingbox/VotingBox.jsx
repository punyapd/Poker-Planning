import React from "react";
import VotingBoxBody from "./VotingBoxBody";
import VotingBoxHeader from "./VotingBoxHeader";

const VotingBox = ({ onVoteClick, isReveal, status }) => {
  return (
    <div className="voting-box">
      <VotingBoxHeader />

      <VotingBoxBody
        onVoteClick={onVoteClick}
        isReveal={isReveal}
        status={status}
      />
    </div>
  );
};

export default VotingBox;
