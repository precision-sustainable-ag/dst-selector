import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

export class GreenBarComponent extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Grid container style={{ backgroundColor: "green", height: "40px" }}>
        <Grid item xl={12}></Grid>
      </Grid>
    );
  }
}
