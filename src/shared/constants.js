import React, { useContext } from "react";
import {
  withStyles,
  Button,
  Switch,
  Grid,
  Typography
} from "@material-ui/core";

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

export const UnderConstructionText = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <Typography variant="h3">Under Construction</Typography>
      </Grid>
    </Grid>
  );
};

export const abbrRegion = (input, to) => {
  var states = [
    ["Alabama", "AL"],
    ["Alaska", "AK"],
    ["American Samoa", "AS"],
    ["Arizona", "AZ"],
    ["Arkansas", "AR"],
    ["Armed Forces Americas", "AA"],
    ["Armed Forces Europe", "AE"],
    ["Armed Forces Pacific", "AP"],
    ["California", "CA"],
    ["Colorado", "CO"],
    ["Connecticut", "CT"],
    ["Delaware", "DE"],
    ["District Of Columbia", "DC"],
    ["Florida", "FL"],
    ["Georgia", "GA"],
    ["Guam", "GU"],
    ["Hawaii", "HI"],
    ["Idaho", "ID"],
    ["Illinois", "IL"],
    ["Indiana", "IN"],
    ["Iowa", "IA"],
    ["Kansas", "KS"],
    ["Kentucky", "KY"],
    ["Louisiana", "LA"],
    ["Maine", "ME"],
    ["Marshall Islands", "MH"],
    ["Maryland", "MD"],
    ["Massachusetts", "MA"],
    ["Michigan", "MI"],
    ["Minnesota", "MN"],
    ["Mississippi", "MS"],
    ["Missouri", "MO"],
    ["Montana", "MT"],
    ["Nebraska", "NE"],
    ["Nevada", "NV"],
    ["New Hampshire", "NH"],
    ["New Jersey", "NJ"],
    ["New Mexico", "NM"],
    ["New York", "NY"],
    ["North Carolina", "NC"],
    ["North Dakota", "ND"],
    ["Northern Mariana Islands", "NP"],
    ["Ohio", "OH"],
    ["Oklahoma", "OK"],
    ["Oregon", "OR"],
    ["Pennsylvania", "PA"],
    ["Puerto Rico", "PR"],
    ["Rhode Island", "RI"],
    ["South Carolina", "SC"],
    ["South Dakota", "SD"],
    ["Tennessee", "TN"],
    ["Texas", "TX"],
    ["US Virgin Islands", "VI"],
    ["Utah", "UT"],
    ["Vermont", "VT"],
    ["Virginia", "VA"],
    ["Washington", "WA"],
    ["West Virginia", "WV"],
    ["Wisconsin", "WI"],
    ["Wyoming", "WY"]
  ];

  // So happy that Canada and the US have distinct abbreviations
  var provinces = [
    ["Alberta", "AB"],
    ["British Columbia", "BC"],
    ["Manitoba", "MB"],
    ["New Brunswick", "NB"],
    ["Newfoundland", "NF"],
    ["Northwest Territory", "NT"],
    ["Nova Scotia", "NS"],
    ["Nunavut", "NU"],
    ["Ontario", "ON"],
    ["Prince Edward Island", "PE"],
    ["Quebec", "QC"],
    ["Saskatchewan", "SK"],
    ["Yukon", "YT"]
  ];

  var regions = states.concat(provinces);

  var i; // Reusable loop variable
  if (to == "abbr") {
    input = input.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    for (i = 0; i < regions.length; i++) {
      if (regions[i][0] == input) {
        return regions[i][1];
      }
    }
  } else if (to == "name") {
    input = input.toUpperCase();
    for (i = 0; i < regions.length; i++) {
      if (regions[i][1] == input) {
        return regions[i][0];
      }
    }
  }
};
