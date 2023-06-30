import React from "react";

export const ArtWork = ({ painting }) => {
  console.log(painting.title);

  return (
    <div className={`work-container gallery__item--${painting.id}`}>
      <img src={painting.image} alt="painting" className="image" />
      <div className="painting-details">
        <div className="title">{painting.title}</div>
        <div className="description">{painting.description}</div>
        <button className="info-btn"> More info </button>
      </div>
    </div>
  );
};
