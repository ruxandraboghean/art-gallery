import React from "react";
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  font-size: 0.4rem;
`;

export const FormSpinner = () => {
  return (
    <div className="spinner">
      <BeatLoader css={override} size={10} color={"#532351"} loading={true} />
    </div>
  );
};
