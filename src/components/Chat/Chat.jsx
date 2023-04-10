import React, { useContext } from "react";
import { Messages } from "./Messages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Input } from "./Input";
import { ChatContext } from "../../context/ChatContext";

export const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <Messages />
      <Input />
    </div>
  );
};
