/*
  TODO
  Works for everything except SoilConditions(?)
  Hope to get rid of forwardRef and move this into CropSidebar
*/

import React, { forwardRef } from 'react';
import { Filters } from './Filters';
import '../../../styles/filters.scss';

const ForwardFilter = forwardRef((props, ref) => <Filters props={props} ref={ref} />);

export default ForwardFilter;
