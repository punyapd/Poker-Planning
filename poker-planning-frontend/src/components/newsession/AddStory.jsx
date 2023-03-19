import React, { useState } from "react";

const AddStory = ({ key, onStoryChange, storyData }) => {
  return (
    <form className="session-stories-item">
      <div className="session-stories-item__name">
        <label htmlFor="">
          Story <sup>*</sup>
        </label>
        <input
          type="text"
          name="story_name"
          value={storyData.story_name}
          placeholder="Enter your Story"
          onChange={(event) => onStoryChange(event, key)}
          required
        />
      </div>

      <div className="session-stories-item__description">
        <label htmlFor="">Description</label>
        <textarea
          name="description"
          value={storyData.description}
          rows={6}
          placeholder="Enter Description (optional)"
          onChange={(event) => onStoryChange(event, key)}
        />
      </div>
    </form>
  );
};

export default AddStory;
