import React from "react";
import { Messages } from "./Messages";
import { Input } from "./Input";

export const Chat = () => {
  return (
    <div className="chat">
      <Messages />
      <Input />
    </div>
  );
};
