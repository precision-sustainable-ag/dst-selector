/*

DEPRECATED

Please refer to file src/header/greenbar


*/

import React, { Component } from "react";
// import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import "../../styles/greenBar.css";
// import LocationOnIcon from "@material-ui/icons/LocationOn";
import { locationIcon, zoneIcon } from "../../shared/constants.js";

export class GreenBarComponent extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.wellState);
  }

  componentDidUpdate() {
    this.checkIfWellUpdated();
  }
  flag = false;
  checkIfWellUpdated = () => {
    // is props.wellState == undefined ?
    if (this.props.wellState === undefined) {
      console.log(`undefined`);
      this.flag = false;
    } else if (
      this.props.wellState.address === undefined ||
      this.props.wellState === "stepperState"
    ) {
      // console.log(this.props.wellState);
      this.flag = false;
      // console.log(`address undefined`);
    } else {
      this.flag = true;
    }
  };

  formattedAddress = () => {
    let address = this.props.wellState.address.toString().substring(0, 19);
    return (
      <div className="addressBar">
        <Button size="small">
          {locationIcon(20, 20)}
          &nbsp; {address}
        </Button>
      </div>
    );
  };
  formatterZone = () => {
    return (
      // <div className="zoneBar">Plant Hardiness {this.props.wellState.zoneText}</div>
      <div className="zoneBar">
        <Button size="small">
          {zoneIcon(20, 20)}
          &nbsp; Plant Hardiness {this.props.wellState.zoneText}
        </Button>
      </div>
    );
  };
  render() {
    return (
      <div className="greenBarContainer">
        {this.flag === true && this.props.wellState.address !== "Enter Address"
          ? this.formattedAddress()
          : ""}

        {this.flag === true && this.props.wellState.zoneText !== undefined
          ? this.formatterZone()
          : ""}
      </div>
    );
  }
}
