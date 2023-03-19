import React, { useState } from "react";
import { tabData } from "../../../../data/session";

import Pending from "./Pending";
import Finished from "./Finished";

const TabContainer = ({ stories, currentStory }) => {
  const [visibleTab, setVisibleTab] = useState(tabData[0].id);
  return (
    <>
      <ul className="story-tabs-titles">
        {tabData.map((item, key) => (
          <li
            onClick={() => setVisibleTab(item.id)}
            className={
              visibleTab === item.id
                ? "story-tabs-title story-tabs-title--active"
                : "story-tabs-title"
            }
            key={key}
          >
            {item.tabTitle}
          </li>
        ))}
        ;
      </ul>
      <div className="story-tabs-content">
        {visibleTab == 1 && (
          <Pending stories={stories} currentStory={currentStory} />
        )}
        {visibleTab == 2 && <Finished stories={stories} />}
      </div>
    </>
  );
};

export default TabContainer;
