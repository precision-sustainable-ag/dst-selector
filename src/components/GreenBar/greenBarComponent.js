import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Typography, GridList, GridListTile } from "@material-ui/core";
// import LocationOnIcon
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
  render() {
    return (
      <GridList
        container
        style={{ backgroundColor: "#598444", height: "40px" }}
        children={2}
      >
        <GridListTile item>
          <p>
            {this.flag === true
              ? this.props.wellState.address.toString().substring(0, 19)
              : ""}
          </p>
        </GridListTile>
        <GridListTile>
          <p>
            {this.flag === true
              ? `Plant Hardiness ${this.props.wellState.zoneText}`
              : ""}
          </p>
        </GridListTile>
      </GridList>
    );
  }
}
