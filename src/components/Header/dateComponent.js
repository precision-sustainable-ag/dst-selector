import { useState, useEffect } from "react";
import moment from "moment";

const DateComponent = () => {
  const [date, setDate] = useState(null);

  useEffect(() => {
    setDate(setTodaysDate);
  }, []);

  return date;
};

const setTodaysDate = () => {
  let now = moment();
  return now.format("LL");
};

export default DateComponent;
