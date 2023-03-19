import React, { useState } from "react";
import CreateSessionStories from "./CreateSessionStories";
import NoStory from "./NoStory";

import TabContainer from "./TabContainer";

const StoryTab = ({ session_id, stories, currentStory }) => {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="story-tabs">
      <section className="story-tabs-header">
        <h1>Current Stories</h1>
      </section>

      {showForm && (
        <CreateSessionStories
          session_id={session_id}
          setshowForm={setShowForm}
        />
      )}
      <TabContainer stories={stories} currentStory={currentStory} />
    </div>
  );
};

export default StoryTab;
