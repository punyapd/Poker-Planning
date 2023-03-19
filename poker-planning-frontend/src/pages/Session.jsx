import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getKey } from "../helpers/sessionKey";

import SessionHeader from "../components/session/SessionHeader";
import VotingBox from "../components/session/votingbox/VotingBox";
import Members from "../components/session/members/Members";
import Action from "../components/session/Action";
import StoryTab from "../components/session/members/stories/StoryTab";
import CreateSessionStories from "../components/session/members/stories/CreateSessionStories";
import useGetHook from "../hooks/useGetHook";
import usePostData from "../hooks/usePostHook";
import usePatchHook from "../hooks/usePatchHook";
import usePutHook from "../hooks/usePutHook";

const Session = () => {
  const [addStory, setAddStory] = useState();
  const [estimate, setEstimate] = useState();
  const [moderator, setModerator] = useState();
  const navigate = useNavigate();

  let { id: session_id } = useParams();

  //fetch all the session data
  const {
    data: session,
    isLoading,
    error,
  } = useGetHook(
    `http://pokerplanning.local:10015/api/session/?id=${session_id}`,
    addStory
  );

  // using custom for updating user story points
  const [postData, loading] = usePostData(
    "http://pokerplanning.local:10015/api/storypoints/"
  );

  useEffect(() => {
    setAddStory(session?.data?.stories?.length == 0 ? true : false);
  }, []);

  //find the current story
  let currentStory = session?.data?.stories?.filter(
    (story) => story?.status == "pending"
  )[0];

  //FETCH MEMBERS DATA AND STORY POINTS OF MEMBERS
  const {
    data: membersData,
    isLoading: storyPointsLoading,
    error: storyPointError,
  } = useGetHook(
    `http://pokerplanning.local:10015/api/storypoints/?session_id=${session_id}&story_id=${currentStory?.id}`,
    addStory
  );

  //GET THE CURRENYT USER ID FROM SESSION STORAGE
  const currentUserId = JSON.parse(getKey("userData")).id;

  useEffect(() => {
    if (currentUserId === session?.data?.session[0]?.moderator) {
      setModerator(true);
    }
  }, [session]);

  //CUSTOM HOOK FOR UPDATING REVEAL STATUS
  const {
    updateData,
    isLoading: updateRevealStatusLoading,
    error: updaterRevealError,
  } = usePatchHook("http://pokerplanning.local:10015/api/session/");

  //CUSTOM HOOK FOR UPDATING DATA USING PUT
  const {
    updateData: updateStoryData,
    isLoading: updatStoryLoading,
    error: updateStroryError,
  } = usePutHook("http://pokerplanning.local:10015/api/story/");
  //FUNCTION THAT RUN WHEN USER CLICK THE CERTAN VALUE FOR ESTIMATION
  const handleVoteClick = async (voteValue) => {
    const formData = {
      user_id: currentUserId,
      story_id: currentStory.id,
      story_point: voteValue,
    };

    const result = await postData(formData);
  };

  //FUNCTION FOR HANDLING REVEAL AND REJECT;
  const handleRevealAndReject = async () => {
    let formData = {
      session: session_id,
      story_id: currentStory.id,
    };
    const result = await updateData(formData);
  };

  //FUNCTION FOR ACCEPTING THE FINAL ESTIMATION
  const handleAccept = async () => {
    const formData = {
      story_id: currentStory.id,
      estimate_value: estimate,
    };
    const result = await updateStoryData(formData);
  };
  //PROTECT ROUTE
  useEffect(() => {
    if (!getKey("userData")) {
      navigate("/login");
    }
  });
  return (
    <div className="session">
      <SessionHeader session={session} moderator={moderator} />

      <div className="session-body">
        <div className="session-body__left">
          {moderator && session?.data?.session[0]?.status == "active" && (
            <Action
              isReveal={session?.data?.session[0]?.is_revealed}
              handleRevealAndReject={handleRevealAndReject}
              members={membersData}
              handleAccept={handleAccept}
              setEstimate={setEstimate}
            />
          )}
          <VotingBox
            onVoteClick={handleVoteClick}
            isReveal={session?.data?.session[0]?.is_revealed}
            status={session?.data?.session[0]?.status}
          />

          {session?.data?.stories?.length && !addStory && (
            <StoryTab
              session_id={session_id}
              stories={session?.data?.stories}
              currentStory={currentStory}
            />
          )}
          {(!session?.data?.stories?.length || addStory) && moderator && (
            <CreateSessionStories
              session_id={session_id}
              setAddStory={setAddStory}
            />
          )}
          {moderator && (
            <button className="add-next" onClick={() => setAddStory(true)}>
              add next story
            </button>
          )}
        </div>
        <div className="session-body__right">
          <Members
            isReveal={session?.data?.session[0]?.is_revealed}
            members={membersData}
          />
        </div>
      </div>
    </div>
  );
};

export default Session;
