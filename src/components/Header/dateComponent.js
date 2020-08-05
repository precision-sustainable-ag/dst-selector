import { useState, useEffect } from "react";
import moment from "moment";
import "moment-timezone";

const DateComponent = () => {
  const [date, setDate] = useState(null);

  useEffect(() => {
    setDate(setTodaysDate);
  }, []);

  return date;
};

const setTodaysDate = () => {
  let now = moment();
  let tzdata = moment.tz.guess();
  return now.tz(tzdata).format("LL");
};

export default DateComponent;
