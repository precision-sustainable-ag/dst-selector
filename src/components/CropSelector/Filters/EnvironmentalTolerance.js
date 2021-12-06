/*
  This file contains the EnvironmentalTolerance component
  The EnvironmentalTolerance filters crops based on environmental tolerances
  styles are fetched from ../../../styles/filters.scss
*/

import React, { forwardRef } from "react";
import "../../../styles/filters.scss";
import { Filters } from "./Filters";

const EnvironmentalTolerance = forwardRef((props, ref) => (
  <Filters props={props} ref={ref} />
));

export default EnvironmentalTolerance;
