import React from "react";
import user from "../../images/user.png";

export const Message = () => {
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
