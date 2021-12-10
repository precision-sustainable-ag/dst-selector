/*
  This file contains the Growth component
  The Growth filters crops based on growth
*/

import React, {forwardRef} from "react";
import { Filters } from "./Filters";

const Growth = forwardRef((props, ref) => (
  <Filters props={props} ref={ref} />
));

export default Growth;
