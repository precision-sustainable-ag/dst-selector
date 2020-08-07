import React, { useState, useEffect, Fragment, useContext } from "react";
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
import { useSnackbar } from "notistack";
import { Context } from "../../store/Store";
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
  const [state, dispatch] = useContext(Context);
  const classes = useStyles();

  const [selectedBtns, setSelectedBtns] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  useEffect(() => {
    const selectedBtns = state.selectedCrops.map((crop) => {
      return crop.btnId;
    });
    setSelectedBtns(selectedBtns);
  }, [state.selectedCrops]);

  const addCropToBasket = (cropId, cropName, btnId, cropData) => {
    let container = document.getElementById(btnId);
    let selectedCrops = {};
    let toAdd = false;
    var cropArray = [];
    selectedCrops["id"] = cropId;
    selectedCrops["cropName"] = cropName;
    selectedCrops["btnId"] = btnId;
    selectedCrops["data"] = cropData;
    cropArray = selectedCrops;
    // change the UI
    if (container.classList.contains("activeCartBtn")) {
      // change text back to 'add to list' and remove element from state

      if (container.textContent === "ADDED") {
        container.querySelector(".MuiTypography-root").innerHTML =
          "ADD TO LIST";
        container
          .querySelector(".MuiTypography-root")
          .classList.remove("text-white");
        container.classList.remove("activeCartBtn");
        toAdd = false;
      } else toAdd = true;

      // this.state.selectedCrops.splice(x, 1);
      // get index of the element
    } else {
      // change text to 'added' and add element to state

      if (container.textContent === "ADD TO LIST") {
        container.querySelector(".MuiTypography-root").innerHTML = "ADDED";
        container
          .querySelector(".MuiTypography-root")
          .classList.add("text-white");
        container.classList.add("activeCartBtn");
        toAdd = true;
      } else toAdd = false;
    }

    // // check if crop id exists inside state, if yes then remove it

    if (state.selectedCrops.length > 0) {
      // DONE: Remove crop from basket
      var removeIndex = state.selectedCrops
        .map(function (item) {
          return item.btnId;
        })
        .indexOf(`${btnId}`);
      if (removeIndex === -1) {
        // element not in array
        dispatch({
          type: "SELECTED_CROPS_MODIFIER",
          data: {
            selectedCrops: [...state.selectedCrops, selectedCrops],
            snackOpen: false,
            snackMessage: `${cropName} Added`,
          },
        });
        enqueueSnackbar(`${cropName} Added`);
      } else {
        // alert(removeIndex);
        let selectedCropsCopy = state.selectedCrops;

        selectedCropsCopy.splice(removeIndex, 1);
        // console.log(selectedCropsCopy);
        dispatch({
          type: "SELECTED_CROPS_MODIFIER",
          data: {
            selectedCrops: selectedCropsCopy,
            snackOpen: false,
            snackMessage: `${cropName} Removed`,
          },
        });
        enqueueSnackbar(`${cropName} Removed`);
      }
    } else {
      dispatch({
        type: "SELECTED_CROPS_MODIFIER",
        data: {
          selectedCrops: [cropArray],
          snackOpen: false,
          snackMessage: `${cropName} Added`,
        },
      });
      enqueueSnackbar(`${cropName} Added`);
    }
  };

  return (
    <Fragment>
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
                      href={`/information-sheet/${crop.fields["Cover Crop Name"]}`}
                      target="_blank"
                      rel="noopener"
                    >
                      View Crop Details
                    </a>
                  </small>
                </div>
              </CardContent>

              <CardActionArea
                id={`cartBtn${index}`}
                style={{
                  backgroundColor: "#e3f2f4",
                  textAlign: "center",
                  padding: "0.5em",
                }}
                className={
                  selectedBtns.includes(`cartBtn${index}`)
                    ? "activeCartBtn"
                    : "inactiveCartBtn"
                }
                onClick={() => {
                  addCropToBasket(
                    crop.fields["id"],
                    crop.fields["Cover Crop Name"],
                    `cartBtn${index}`,
                    crop.fields
                  );
                }}
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
