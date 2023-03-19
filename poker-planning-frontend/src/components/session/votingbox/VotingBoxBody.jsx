import React from "react";
import VoteItem from "./VoteItem";
const voteValues = [0, 1, 2, 3, 5, 8, 13, 21, 40, 100];
const VotingBoxBody = ({ onVoteClick, isReveal, status }) => {
  return (
    <section className="voting-box-body">
      {voteValues.map((vote, index) => (
        <VoteItem
          value={vote}
          key={index}
          onVoteClick={onVoteClick}
          isReveal={isReveal}
          status={status}
        />
      ))}
    </section>
  );
};

export default VotingBoxBody;
