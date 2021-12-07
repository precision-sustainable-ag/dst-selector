/*
  This file contains the EnvironmentalTolerance component
  The EnvironmentalTolerance filters crops based on environmental tolerances
  styles are fetched from ../../../styles/filters.scss
*/

import React, { forwardRef } from "react";
import { Filters } from "./Filters";
import "../../../styles/filters.scss";

const EnvironmentalTolerance = forwardRef((props, ref) => (
  <Filters props={props} ref={ref} />
));

export default EnvironmentalTolerance;
