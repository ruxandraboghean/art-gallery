import React from "react";

export const Modal = (props) => {
  const { isOpen, children } = props;

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <section className="modal">{children}</section>
      <div className="overlay"></div>
    </>
  );
};
