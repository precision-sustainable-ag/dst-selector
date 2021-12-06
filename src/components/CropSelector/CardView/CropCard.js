/*
  This file contains the CropCardComponent component
  The CropCardComponent component is the card that contains a single crop in the crop selector
  styles fetched from CustomStyles in ../../../shared/constants
*/

import { useSnackbar } from "notistack";
import React, { useContext } from "react";
import {
  allMonths,
  CustomStyles,
  getRating,
  LightButton,
} from "../../../shared/constants";
import { Context } from "../../../store/Store";
import GrowthWindowComponent from "../GrowthWindow";

const CropCardComponent = (props) => {
  const [state, dispatch] = useContext(Context);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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

      if (document.getElementById(btnId).textContent === "ADDED") {
        container.querySelector(".MuiButton-label").innerHTML = "ADD TO LIST";
        container.classList.remove("activeCartBtn");
        toAdd = false;
      } else toAdd = true;

      // this.state.selectedCrops.splice(x, 1);
      // get index of the element
    } else {
      // change text to 'added' and add element to state
      console.log(document.getElementById(btnId).textContent);
      if (container.textContent === "ADD TO LIST") {
        container.querySelector(".MuiButton-label").innerHTML = "ADDED";
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

        // this.state.selectedCrops.splice(removeIndex, 1);
      }
    } else {
      // DONE: add the selected crop to state and change the state, show snackbar

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
  const cropImagePresent = (field) => {
    if (field["Image"]) return true;
    else return false;
  };

  return props.cropData ? (
    <section className="row mb-3" style={{ textAlign: "center" }}>
      {props.cropData.map((crop, index) =>
        crop.fields["Zone Decision"] === "Include" ? (
          <div className="col-12 mt-2 pl-0 pr-1 row align-items-center ">
            <div className="coverCropDetailCard col-3 row">
              <div className="col-5">
                {cropImagePresent(crop.fields) ? (
                  <img
                    rel="preload"
                    src={crop.fields["Image"][0].url}
                    alt={crop.fields["Image"][0].filename}
                    style={{ width: "100%", height: "100px" }}
                  />
                ) : (
                  <img
                    rel="preload"
                    src="https://placehold.it/100x100"
                    alt="Image not available"
                    style={{ width: "100%", height: "100px" }}
                  />
                )}
              </div>
              <div className="col-7 row align-items-center">
                <span className="cropCategory text-uppercase col-12">
                  {crop.fields["Cover Crop Group"]}
                </span>
                <span className="cropName font-weight-lighter col-12">
                  {crop.fields["Cover Crop Name"]}
                </span>
                <span className="cropScientificName col-12">
                  {crop.fields["Scientific Name"]}
                </span>
              </div>
            </div>
            {props.selectedGoals.map((goal, index) => (
              <div className="col pl-1 pr-1">
                {getRating(crop.fields[goal])}
                <span className="d-none">{crop.fields[goal]}</span>
              </div>
            ))}
            {props.showGrowthWindow ? (
              <div className="col pr-1 pl-1">
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      {allMonths.map((month, index) => (
                        <GrowthWindowComponent
                          from="tableOnlyCashCropWindow"
                          data={crop.fields}
                          key={index}
                          id={`growthCell${index}`}
                          month={index}
                        />
                      ))}
                    </tr>
                    <tr>
                      {allMonths.map((month, index) => (
                        <GrowthWindowComponent
                          from="tableAll"
                          data={crop.fields}
                          key={index}
                          id={`growthCell${index}`}
                          month={index}
                        />
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              ""
            )}
            <div className="col-1 pr-0 pl-1">
              <LightButton
                id={`cartBtn${index}`}
                style={{
                  borderRadius: CustomStyles().nonRoundedRadius,
                  width: "130px",
                }}
                onClick={() => {
                  addCropToBasket(
                    crop.id,
                    crop.fields["Cover Crop Name"],
                    `cartBtn${index}`,
                    crop.fields
                  );
                }}
              >
                ADD TO LIST
              </LightButton>
            </div>
          </div>
        ) : (
          ""
        )
      )}
    </section>
  ) : (
    ""
  );
};

export default CropCardComponent;
