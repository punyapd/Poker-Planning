import React, { useEffect, useState } from "react";
import usePostData from "../../../../hooks/usePostHook";
import { toast } from "react-toastify";
import AddStory from "../../../newsession/AddStory";
const CreateSessionStories = ({ session_id, setAddStory, setshowForm }) => {
  const [storyCount, setStoryCount] = useState(1);
  const [storyData, setStoryData] = useState({
    story_name: "",
    description: "",
  });

  const [postData, isLoading, error] = usePostData(
    "http://pokerplanning.local:10015/api/story/"
  );

  const handleStoryChange = (event, index) => {
    const { name, value } = event.target;

    setStoryData({ ...storyData, [name]: value });
  };

  const handleAddStory = async () => {
    const formData = {
      story_name: storyData.story_name,
      description: storyData.description,
      session_id: session_id,
    };

    const result = await postData(formData);

    if (result?.status == "201") {
      toast.success(result.message);
      setAddStory(false);
      setshowForm(false);
    } else {
      toast.error(error);
    }
  };

  return (
    <section className="session-stories">
      <div>
        {Array(storyCount)
          .fill(0)
          .map((item, index) => (
            <AddStory
              key={index}
              onStoryChange={handleStoryChange}
              storyData={storyData}
            />
          ))}
      </div>

      <div className="session-stories-add">
        <span onClick={handleAddStory}>
          <i className="fa-solid fa-square-plus"></i>
        </span>
      </div>
    </section>
  );
};

export default CreateSessionStories;
