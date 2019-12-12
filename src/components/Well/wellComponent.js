import React, { Component } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid
} from "@material-ui/core";
import { ThemeProvider, withStyles } from "@material-ui/core/styles";
// import {  } from "@material-ui/styles";

const LightButton = withStyles({
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

export class WellComponent extends Component {
  render() {
    return (
      <Grid
        container
        spacing={0}
        align="center"
        justify="center"
        direction="column"
        style={{
          backgroundImage: "url(/images/cover-crop-field.jpg)",
          backgroundSize: "cover",
          height: "75vh",
          backgroundRepeat: "no-repeat"
        }}
      >
        <Grid
          item
          style={{
            backgroundColor: "rgba(240,247,235,0.8)",
            width: "90%",
            margin: "0 auto",
            textAlign: "",
            padding: "6%"
          }}
        >
          <h1>Welcome to the NECCC Cover Crop Decision Support Tool</h1>
          <p>
            You are currently interacting with a Beta version of the Cover Crop
            DSTs. The purpose of this interaction is so that we may gather
            feedback about the usability and usefulness of these tools.
          </p>
          <p>
            The cover crop data you will see has been created by the NECCC Data
            Verification Team of cover crop experts, the original MCCC species
            selector tool, a seeding rate calculator developd by NRCS NY, and
            several other data sources. Please note: these data are still being
            finalized by NECCC teams for each of the plant hardiness zones. The
            data shown are a preview and are yet to be finalized.{" "}
          </p>{" "}
          <p style={{ fontWeight: "bold" }}>
            {" "}
            Thank you for your time and consideration. We look forward to your
            feedback and hope to build a pleasant cover crop tool experience for
            you to effectively select and manage your cover crops.
          </p>
        </Grid>
        <Grid item style={{ marginTop: "2%" }}>
          <LightButton>NEXT</LightButton>
        </Grid>
      </Grid>
      //   <Grid
      //     container
      //     alignItems="center"
      //     alignContent="center"
      //     justify="center"
      //     direction="column"
      //   >
      //     <Grid item className="homePageWell">
      //       <h1>Welcome to the NECCC Cover Crop Decision Support Tool</h1>
      //       <p>
      //         You are currently interacting with a Beta version of the Cover Crop
      //         DSTs. The purpose of this interaction is so that we may gather
      //         feedback about the usability and usefulness of these tools.
      //       </p>
      //       <p>
      //   The cover crop data you will see has been created by the NECCC Data
      //   Verification Team of cover crop experts, the original MCCC species
      //   selector tool, a seeding rate calculator developd by NRCS NY, and
      //   several other data sources. Please note: these data are still being
      //   finalized by NECCC teams for each of the plant hardiness zones. The
      //   data shown are a preview and are yet to be finalized. Thank you for
      //   your time and consideration. We look forward to your feedback and
      //   hope to build a pleasant cover crop tool experience for you to
      //   effectively select and manage your cover crops.
      //       </p>
      //     </Grid>
      //   </Grid>
    );
  }
}
