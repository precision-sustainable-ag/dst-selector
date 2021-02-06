/* 
  Under Construction 
*/


import React from "react";
import Header from "../Header/header";
import { Box } from "@material-ui/core";
import { UnderConstructionText } from "../../shared/constants";

const SeedingRateCalculator = () => {
  return (
    <div className="contentWrapper">
      <Header logo="neccc_wide_logo_color_web.jpg" />
      <Box>{UnderConstructionText}</Box>
    </div>
  );
};

export default SeedingRateCalculator;
