import React from "react";

const Pending = ({ stories, currentStory }) => {
  return (
    <div className="story-tabs-content__pending">
      <dl>
        {stories?.map((story, key) => (
          <div key={key}>
            {story.status == "pending" && (
              <>
                <dt>
                  <i
                    className={
                      currentStory.id == story.id
                        ? `fa-solid fa-play`
                        : "fa-solid fa-circle"
                    }
                  ></i>
                  <span>{story.name}</span>
                </dt>
                <dd>{story.description}</dd>
              </>
            )}
          </div>
        ))}
      </dl>
    </div>
  );
};

export default Pending;
