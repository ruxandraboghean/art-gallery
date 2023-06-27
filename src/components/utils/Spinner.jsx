import React from "react";
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  font-size: 0.4rem;
`;

export const Spinner = () => {
  return (
    <div className="spinner">
      <BeatLoader css={override} size={6} color={"#B396A8"} loading={true} />
    </div>
  );
};
