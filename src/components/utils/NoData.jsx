import React from "react";
import noData from "../../images/no_data.png";

export const NoData = () => {
  return (
    <div className="no-data-container">
      <img src={noData} alt="noData" />
      <p className="no-data-message">No data available</p>
    </div>
  );
};
