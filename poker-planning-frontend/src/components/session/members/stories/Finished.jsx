import React from "react";

const Finished = ({ stories }) => {
  return (
    <div className="story-tabs-content__finished">
      <dl>
        {stories?.map((story, key) => (
          <>
            {story.status == "finished" && (
              <>
                <dt>
                  <i class="fa-solid fa-circle"></i>
                  <span>{story.name}</span>
                  <span className="estimate">{story.estimate_value}</span>
                </dt>
                <dd>{story.description}</dd>
              </>
            )}
          </>
        ))}
      </dl>
    </div>
  );
};

export default Finished;
