/*
  This file contains the Roots component
  The Roots filters crops based on roots
*/

import React, {forwardRef} from "react";
import { Filters } from "./Filters";

const Roots = forwardRef((props, ref) => (
  <Filters props={props} ref={ref} />
));

export default Roots;
