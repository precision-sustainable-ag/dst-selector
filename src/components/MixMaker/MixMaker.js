/*
  Under construction
*/

import { Box } from "@material-ui/core";
import React from "react";
import { UnderConstructionText } from "../../shared/constants";
import Header from "../Header/Header";

const MixMaker = () => {
  return (
    <div className="contentWrapper">
      <Header logo="neccc_wide_logo_color_web.jpg" />
      <Box>{UnderConstructionText}</Box>
    </div>
  );
};

export default MixMaker;
