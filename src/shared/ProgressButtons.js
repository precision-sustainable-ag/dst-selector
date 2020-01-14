import React from "react";
import { withStyles, Button } from "@material-ui/core";

const LightButton = withStyles({
  root: {
    backgroundColor: "#e3f2f4",
    borderRadius: "20px",
    color: "#000",
    padding: "10px 20px 10px 20px",
    "&:hover": {
      backgroundColor: "#48a8ab",
      color: "#fff"
    }
  }
})(Button);

const ProgressButtons = () => {
  return (
    <div>
      <LightButton>back</LightButton>
      <LightButton className="ml-3">next</LightButton>
    </div>
  );
};

export default ProgressButtons;
