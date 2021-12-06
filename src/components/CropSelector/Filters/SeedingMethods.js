/*
  This file contains the SeedingMethods component
  The SeedingMethods filters crops based on seeding methods
*/

import React, { forwardRef } from "react";
import { Filters } from "./Filters";

const SeedingMethods = forwardRef((props, ref) => (
  <Filters props={props} ref={ref} />
));

export default SeedingMethods;
