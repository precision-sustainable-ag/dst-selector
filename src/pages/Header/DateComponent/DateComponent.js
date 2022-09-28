/*
  This file contains the DateComponent component, helper functions, and styles
  The DateComponent shows the date in the header
*/

import moment from 'moment';
import 'moment-timezone';
import { useEffect, useState } from 'react';

const DateComponent = () => {
  const [date, setDate] = useState(null);

  const setTodaysDate = () => {
    const now = moment();
    const tzdata = moment.tz.guess();
    return now.tz(tzdata).format('LL');
  };

  useEffect(() => {
    setDate(setTodaysDate);
  }, []);

  return date;
};

export default DateComponent;
