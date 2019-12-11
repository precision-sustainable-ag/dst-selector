import React, { Component } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

export class WellComponent extends Component {
  render() {
    return (
      <Grid container alignItems="center" justify="center">
        <Card style={{ width: "100%" }}>
          <CardActionArea>
            <CardMedia
              image="https://placehold.it/1940x1280/"
              style={{ height: "80vh" }}
            >
              <CardContent style={{ textAlign: "center" }}>
                <Typography gutterBottom variant="h3" component="h3">
                  Welcome to the NECCC Cover Crop Decision Support Tools
                </Typography>
                <Typography variant="body2" color="textPrimary" component="p">
                  You are currently interacting with a Beta version of the Cover
                  Crop DSTs. The purpose of this interaction is so that we may
                  gather feedback about the usability and usefulness of these
                  tools.
                </Typography>
                <Typography variant="body2" color="textPrimary" component="p">
                  The cover crop data you will see has been created by the NECCC
                  Data Verification Team of cover crop experts, the original
                  MCCC species selector tool, a seeding rate calculator developd
                  by NRCS NY, and several other data sources. Please note: these
                  data are still being finalized by NECCC teams for each of the
                  plant hardiness zones. The data shown are a preview and are
                  yet to be finalized. Thank you for your time and
                  consideration. We look forward to your feedback and hope to
                  build a pleasant cover crop tool experience for you to
                  effectively select and manage your cover crops.
                </Typography>
              </CardContent>
            </CardMedia>
          </CardActionArea>
        </Card>
      </Grid>
    );
  }
}
