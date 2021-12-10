/*
  This file contains the TerminationMethods component
  The TerminationMethods filters crops based on termination methods
  styles are fetched from ../../../styles/filters.scss
*/

import React, {forwardRef} from "react";
import {Filters} from "./Filters";
import "../../../styles/filters.scss";

const TerminationMethods = forwardRef((props, ref) => (
  <Filters props={props} ref={ref} />
));

export default TerminationMethods;
