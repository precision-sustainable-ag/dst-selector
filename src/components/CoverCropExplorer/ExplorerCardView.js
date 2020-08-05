import React, { useState, useEffect, Fragment } from "react";
import { PictureAsPdf, Add, FormatListBulleted } from "@material-ui/icons";
import {
  Button,
  Card,
  CardMedia,
  CardActionArea,
  Typography,
  CardContent,
  makeStyles,
} from "@material-ui/core";
import { downloadAllPDF, trimString } from "../../shared/constants";
const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    width: 230,
  },
  media: {
    height: 140,
  },
});
const ExplorerCardView = (props) => {
  const classes = useStyles();
  return (
    <Fragment>
      <div
        className="row"
        style={{
          backgroundColor: "#35999b",
          height: "40px",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
        }}
      >
        <div className="col-8">
          <Button style={{ color: "white" }}>Download:</Button>
          <Button style={{ color: "white" }} onClick={() => {}}>
            <PictureAsPdf /> <span className="pl-2">PDF</span>
          </Button>

          <Button href={`/csv/`} style={{ color: "white" }}>
            <FormatListBulleted />
            &nbsp; SPREADSHEET
          </Button>
        </div>
      </div>
      <div className="d-flex flex-wrap pt-4 ">
        {props.activeCropData.map((crop, index) => (
          <div className="p-2" key={index}>
            <Card className={classes.card}>
              <CardMedia
                image={
                  crop.fields["Image Data"]["Key Thumbnail"]
                    ? `/images/Cover Crop Photos/${crop.fields["Image Data"]["Directory"]}/${crop.fields["Image Data"]["Key Thumbnail"]}`
                    : "https://placehold.it/100x100?text=Placeholder"
                }
                className={classes.media}
                title={crop.fields["Cover Crop Name"]}
              />
              <CardContent>
                <div
                  className="font-weight-bold text-muted text-uppercase"
                  style={{ fontSize: "10pt" }}
                >
                  {crop.fields["Cover Crop Group"]}
                </div>
                <div className="font-weight-bold " style={{ fontSize: "16pt" }}>
                  {crop.fields["Cover Crop Name"]}
                </div>
                <small className="font-italic text-muted">
                  {trimString(crop.fields["Scientific Name"], 25)}
                </small>
                <div>
                  <small className="text-muted">
                    <a
                      style={{
                        textDecoration: "underline",
                        color: "rgb(53, 153, 155)",
                      }}
                      onClick={() => {}}
                    >
                      View Crop Details
                    </a>
                  </small>
                </div>
              </CardContent>

              <CardActionArea
                style={{
                  backgroundColor: "#e3f2f4",
                  textAlign: "center",
                  padding: "0.5em",
                }}
                onClick={() => {}}
              >
                <Typography
                  variant="body2"
                  className="text-uppercase"
                  style={{
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  ADD TO LIST
                </Typography>
              </CardActionArea>
            </Card>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default ExplorerCardView;
