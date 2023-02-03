import React from "react";
import { Messages } from "../components/Messages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Input } from "./Input";

export const Chat = () => {
  return (
    <div className="chat">
      <div className="chat-info">
        <span>Jane</span>
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
