import React, { useContext } from "react";
import { Messages } from "../Chat/Messages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Input } from "../Chat/Input";
import { ChatContext } from "../../context/ChatContext";

export const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chat-info">
        <span> {data.user?.displayName} </span>
        <div className="chat-icons">
          <FontAwesomeIcon icon={faUserPlus} />
          <FontAwesomeIcon icon={faEllipsis} />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};
