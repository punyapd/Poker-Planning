import React from "react";
import usePatchHook from "../../hooks/usePatchHook";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const SessionHeaderItem = ({ icon, action, session, moderator }) => {
  const navigate = useNavigate();
  //FUNCTION FOR HANDLING THE LINK FOR OTHER MEMBERS TO JOIN
  const handleShare = () => {
    let currentUrl = window.location.href;
    navigator.clipboard.writeText(`${currentUrl}/join`);
  };

  const {
    updateData: updateSessionStatus,
    loading,
    error,
  } = usePatchHook("http://pokerplanning.local/api/session/close/");

  //FUNCTION FOR CLOSING THER SESSION

  const handleCloseSession = async () => {
    if (moderator) {
      const formData = {
        session: session?.data?.session[0]?.session_id,
      };
      const result = await updateSessionStatus(formData);
      if (result.status == "200") {
        toast.success(result.message);
      }
    } else {
      navigate("/");
    }
  };

  return (
    <div
      className="session-header-item"
      title={icon == "share" ? "Copy To ClipBoard" : "End Session"}
      onClick={
        icon == "share"
          ? handleShare
          : icon == "xmark"
          ? handleCloseSession
          : null
      }
    >
      <i className={`fa-solid fa-${icon}`}></i>
      <span>{action}</span>
    </div>
  );
};

export default SessionHeaderItem;
