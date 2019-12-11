import React, { Component } from "react";

class TodaysDate extends Component {
  render() {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    console.log(date);
    // var dd = String(today.get);
    return <p>Date</p>;
  }
}

export default TodaysDate;
