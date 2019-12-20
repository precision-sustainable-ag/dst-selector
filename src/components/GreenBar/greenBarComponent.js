import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Typography, GridList, GridListTile, Button } from "@material-ui/core";
import "../../styles/greenBar.css";
import LocationOnIcon from "@material-ui/icons/LocationOn";

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
      console.log(`address undefined`);
    } else {
      this.flag = true;
    }
  };
  locationIcon = (w,h) => {
    return(<svg width={w} height={h} viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 0C3.13 0 0 3.13 0 7C0 12.25 7 20 7 20C7 20 14 12.25 14 7C14 3.13 10.87 0 7 0ZM7 9.5C5.62 9.5 4.5 8.38 4.5 7C4.5 5.62 5.62 4.5 7 4.5C8.38 4.5 9.5 5.62 9.5 7C9.5 8.38 8.38 9.5 7 9.5Z" fill="white"/>
    </svg>
    );
  }
  zoneIcon = (w, h) => {
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

  formattedAddress = () => {
    let address = this.props.wellState.address.toString().substring(0, 19);
    return (
      <div className="addressBar">
        <Button size="small">
        {this.locationIcon(20,20)}
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
          {this.zoneIcon(20, 20)}
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
