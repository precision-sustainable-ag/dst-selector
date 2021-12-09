/*
  This file contains the Seeds component
  The Seeds filters crops based on seeds
*/

import React, { forwardRef } from "react";
import { Filters } from "./Filters";

const Seeds = forwardRef((props, ref) => <Filters props={props} ref={ref} />);

export default Seeds;
