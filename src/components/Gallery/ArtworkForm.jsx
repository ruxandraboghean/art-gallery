import React from "react";

export const ArtworkForm = () => {
  return (
    <div className="form-container">
      <form className="form">
        <div className="input-item">
          <label htmlFor="title">title</label>
          <input type="text" id="title" />
        </div>
        <div className="input-item">
          <label htmlFor="year">year</label>
          <input type="text" id="year" />
        </div>
        <div className="input-item">
          <label htmlFor="description">description</label>
          <input type="text" id="description" />
        </div>
        <div className="art-details">
          <div className="input-item">
            <label htmlFor="height">height</label>
            <input type="text" id="height" />
          </div>
          <div className="input-item">
            <label htmlFor="width">width</label>
            <input type="text" id="width" />
          </div>
          <div className="input-item">
            <label htmlFor="depth">depth</label>
            <input type="text" id="depth" />
          </div>
          <div className="input-item">
            <label htmlFor="unit">unit</label>
            <input type="text" id="unit" />
          </div>
        </div>
        <div className="input-item">
          <label htmlFor="tehnique">tehnique</label>
          <input type="text" id="tehnique" />
        </div>
        <div className="input-item">
          <label htmlFor="genre">genre</label>
          <input type="text" id="genre" />
        </div>
      </form>
    </div>
  );
};
