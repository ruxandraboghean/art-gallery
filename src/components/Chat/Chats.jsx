import React from "react";
import { messages } from "../../mockData/messages";

export const Chats = () => {
  return (
    <div className="chats">
      {messages.map((chat) => (
        <div className="user-chat" key={chat.message}>
          <img src={chat.image} />
          <div className="user-chat-info">
            <span>{chat.username}</span>
            <p>{chat.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
