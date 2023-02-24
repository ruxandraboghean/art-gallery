import React from "react";
import { artCategories } from "../../../mockData/art-categories";

export const CardExhibition = () => {
  console.log(artCategories);
  return (
    <div className="exhibition-card-wrapper">
      {artCategories.map((category) => {
        <>
          <p className="vertical-title">{category.title}</p>
          <div
            className="img-wrapper"
            // style={{ backgroundImage: `url(${category.imageSRC})` }}
          >
            <span className="see-exhibition"> See all</span>
          </div>
        </>;
      })}
    </div>
  );
};
