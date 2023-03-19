import React from "react";

const VoteItem = ({ value, onVoteClick, isRevealed, status }) => {
  return (
    <button
      className="voting-box__item"
      onClick={() => onVoteClick(value)}
      disabled={isRevealed ? true : status == "closed" ? true : false}
    >
      <span>{value}</span>
    </button>
  );
};

export default VoteItem;
