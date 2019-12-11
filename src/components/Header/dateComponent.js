import React, { Component } from "react";

export class DateComponent extends Component {
  constructor() {
    super();

    var today = new Date();

    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var n = month[today.getMonth()];

    this.state = {
      date: `${n} ${today.getDate()}, ${today.getFullYear()}`
    };
  }

  render() {
    return this.state.date;
  }
}
