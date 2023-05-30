import React from "react";
import { Exhibition } from "../../../components/gallery/exhibition/Exhibition";

export const Exhibitions = () => {
  return (
    <div className="works-container">
      <div className="works-title">Exhibitions</div>
      <div className="works-wrapper">
        <Exhibition />
        <Exhibition />
        <Exhibition />
        <Exhibition />
      </div>
    </div>
  );
};
