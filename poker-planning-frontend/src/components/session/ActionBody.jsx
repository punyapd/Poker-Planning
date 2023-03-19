import React, { useState } from "react";
import ResultContainer from "./ResultContainer";
const ActionBody = ({
  isReveal,
  handleRevealAndReject,
  members,
  handleAccept,
  setEstimate
}) => {
  return (
    <section className="session-action-body">
      {isReveal == "1" && (
        <ResultContainer isReveal={isReveal} members={members} setEstimate={setEstimate}/>
      )}
      {isReveal == "1" && (
        <>
          <button onClick={handleRevealAndReject}>Reject And Restart</button>
          <button style={{ marginTop: "1rem" }} onClick={handleAccept}>
            Accept
          </button>
        </>
      )}

      {isReveal == "0" && (
        <button onClick={handleRevealAndReject}>Reveal</button>
      )}
    </section>
  );
};

export default ActionBody;
