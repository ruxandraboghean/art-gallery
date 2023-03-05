import React from "react";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import * as BsIcons from "react-icons/bs";

export const ChatProfile = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className="chat-profile">
      <div className="user-info">
        <img src={data?.user?.photoURL} alt="User" className="user-avatar" />
        <span> {data.user?.displayName} </span>
        <span></span>
        <span>Status</span>
      </div>
      <div className="user-actions">
        <div className="action">
          <span>View Profile</span>
          <BsIcons.BsFillArrowRightCircleFill className="arrow-icon" />
        </div>
        <div className="action">
          <span>Media & Files </span>
          <BsIcons.BsFillArrowRightCircleFill className="arrow-icon" />
        </div>
      </div>
    </div>
  );
};
