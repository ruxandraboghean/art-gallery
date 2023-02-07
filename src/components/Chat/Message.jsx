import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import user from "../../images/user.png";

export const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  return (
    <div className="message owner">
      <div className="message-info">
        <img src={user} alt="User" />
        <span> just now </span>
      </div>
      <div className="message-content">
        <p> This is a message. </p>
      </div>
    </div>
  );
};
