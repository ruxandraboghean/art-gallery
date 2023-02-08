import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

export const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  const time = new Date(
    message.date.seconds * 1000 + message.date.nanoseconds / 1000000
  ).toLocaleTimeString();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="message-info">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="User"
        />
        <span>{time}</span>
      </div>
      <div className="message-content">
        <p> {message.text} </p>
        {message.image && <img src={message.image} />}
      </div>
    </div>
  );
};
