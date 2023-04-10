import React from "react";
import { categoryOptions } from "../../../mockData/categoryOptions";

export const CardExhibition = () => {
  const handleSeeExhibition = () => {};
  const optionsList = categoryOptions.map((option) => (
    <div className="exhibition-card-wrapper" key={option.value}>
      {/* <p className="vertical-title">{option.label}</p> */}
      <div
        className="img-wrapper"
        style={{
          backgroundImage: `url(${option.imageSRC})`,
        }}
      >
        <span className="see-exhibition" onClick={handleSeeExhibition}>
          {" "}
          See all
        </span>
        <div className="info-wrapper">
          <div className="profile-info">
            <span>Name</span>
            <div> date </div>
            <span> year </span>
          </div>
          <div>
            <span>Glory Day </span>
          </div>
        </div>
      </div>
    </div>
  ));

  return <>{optionsList}</>;
};
