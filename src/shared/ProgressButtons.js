import React from "react";
import { LightButton } from "./constants";

const ProgressButtons = () => {
  return (
    <div>
      <LightButton> back</LightButton>
      <LightButton className="ml-3">next</LightButton>
    </div>
  );
};

export default ProgressButtons;
