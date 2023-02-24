import React from "react";
import { categoryOptions } from "../../../mockData/categoryOptions";

export const CardExhibition = () => {
  const optionsList = categoryOptions.map((option) => (
    <div className="exhibition-card-wrapper" key={option.value}>
      <p className="vertical-title">{option.label}</p>
      <div
        className="img-wrapper"
        style={{
          backgroundImage: `url(${option.imageSRC})`,
        }}
      >
        <span className="see-exhibition"> See all</span>
      </div>
    </div>
  ));

  return <>{optionsList};</>;
};
