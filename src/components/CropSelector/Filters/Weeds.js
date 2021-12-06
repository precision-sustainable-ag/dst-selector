/*
  This file contains the Weeds component
  The Weeds filters crops based on weeds
  styles are fetched from ../../../styles/filters.scss
*/

import React, { forwardRef } from "react";
import "../../../styles/filters.scss";
import { Filters } from "./Filters";

const Weeds = forwardRef((props, ref) => <Filters props={props} ref={ref} />);

export default Weeds;
