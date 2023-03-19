import React from "react";
import Button1 from "../../../reusable/Button1";

const NoStory = ({ setShowForm }) => {
  return (
    <div className="empty-stories">
      <p>No Stories Added</p>
      <button onClick={() => setShowForm(true)}>Add</button>
    </div>
  );
};

export default NoStory;
