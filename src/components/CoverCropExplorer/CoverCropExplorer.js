import React from "react";
import Header from "../Header/header";
import { Box, Grid, Typography } from "@material-ui/core";
import { UnderConstructionText } from "../../shared/constants";

const CoverCropExplorer = () => {
  return (
    <div className="contentWrapper">
      <Header logo="neccc_wide_logo_color_web.jpg" />
      <Box>{UnderConstructionText}</Box>
    </div>
  );
};

export default CoverCropExplorer;
