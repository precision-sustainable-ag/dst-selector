import React from "react";
import { withStyles, Button, Switch } from "@material-ui/core";

export const locationIcon = (w, h) => {
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 14 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 0C3.13 0 0 3.13 0 7C0 12.25 7 20 7 20C7 20 14 12.25 14 7C14 3.13 10.87 0 7 0ZM7 9.5C5.62 9.5 4.5 8.38 4.5 7C4.5 5.62 5.62 4.5 7 4.5C8.38 4.5 9.5 5.62 9.5 7C9.5 8.38 8.38 9.5 7 9.5Z"
        fill="white"
      />
    </svg>
  );
};
export const zoneIcon = (w, h) => {
  return (
    <svg
      height={h}
      width={w}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM6 15.5C4.62 15.5 3.5 14.38 3.5 13C3.5 11.62 4.62 10.5 6 10.5C7.38 10.5 8.5 11.62 8.5 13C8.5 14.38 7.38 15.5 6 15.5ZM7.5 6C7.5 4.62 8.62 3.5 10 3.5C11.38 3.5 12.5 4.62 12.5 6C12.5 7.38 11.38 8.5 10 8.5C8.62 8.5 7.5 7.38 7.5 6ZM14 15.5C12.62 15.5 11.5 14.38 11.5 13C11.5 11.62 12.62 10.5 14 10.5C15.38 10.5 16.5 11.62 16.5 13C16.5 14.38 15.38 15.5 14 15.5Z"
        fill="white"
      />
    </svg>
  );
};

export const cloudIcon = (w, h) => {
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 24 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.35 6.04C18.67 2.59 15.64 0 12 0C9.11 0 6.6 1.64 5.35 4.04C2.34 4.36 0 6.91 0 10C0 13.31 2.69 16 6 16H19C21.76 16 24 13.76 24 11C24 8.36 21.95 6.22 19.35 6.04Z"
        fill="black"
      />
    </svg>
  );
};

export const LightButton = withStyles({
  root: {
    backgroundColor: "#e3f2f4",
    borderRadius: "20px",
    color: "#000",
    padding: "10px 20px 10px 20px",
    "&:hover": {
      backgroundColor: "#48a8ab",
      color: "#fff"
    }
  },
  small: {
    padding: "5px 15px 5px 15px"
  }
})(Button);

export const GreenSwitch = withStyles({
  thumb: {
    backgroundColor: "rgb(138, 188, 98, 1)"
  },
  track: {
    backgroundColor: "rgb(138, 188, 98, 0.5)"
  },
  input: {
    "&:checked": {
      color: "rgb(240, 247, 235)"
    }
  },
  "&:checked": {
    color: "rgb(240, 247, 235)"
  }
})(Switch);

export const GetMonthString = month => {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];

  return months[month].toUpperCase();
};
