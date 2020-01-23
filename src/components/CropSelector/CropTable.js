import React, { useContext, Fragment, useEffect } from "react";
import { Context } from "../../store/Store";
import { LightButton } from "../../shared/constants";
import { Button, Typography } from "@material-ui/core";

import "../../styles/cropTable.scss";

const CropTableComponent = () => {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    const headers = new Headers();
    headers.append("Authorization", "Bearer ***REMOVED***");
    fetch(
      "https://api.airtable.com/v0/appC47111lCOTaMYe/Cover%20Crops%20Data?maxRecords=300&filterByFormula=NOT(SWITCH({Cover Crop Name},'__Open Discussion Row','Ok hopefully he answers me soon.'))",
      {
        headers: headers
      }
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch({
          type: "PULL_CROP_DATA",
          data: data.records
        });
      });
  }, [state.cropData]);

  const addCropToBasket = (cropId, cropName, btnId) => {
    let container = document.getElementById(btnId);
    let selectedCrops = {};
    let toAdd = false;
    var cropArray = [];
    selectedCrops["id"] = cropId;
    selectedCrops["cropName"] = cropName;
    selectedCrops["btnId"] = btnId;
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
      // let flag = null;
      // let idx = 0;
      var removeIndex = state.selectedCrops
        .map(function(item) {
          return item.btnId;
        })
        .indexOf(`${btnId}`);
      if (removeIndex === -1) {
        // element not in array
        dispatch({
          type: "SELECTED_CROPS_MODIFIER",
          data: {
            selectedCrops: [...state.selectedCrops, selectedCrops],
            snackOpen: true,
            snackMessage: `${cropName} Added`
          }
        });
      } else {
        // alert(removeIndex);
        let selectedCropsCopy = state.selectedCrops;

        selectedCropsCopy.splice(removeIndex, 1);
        // console.log(selectedCropsCopy);
        dispatch({
          type: "SELECTED_CROPS_MODIFIER",
          data: {
            selectedCrops: selectedCropsCopy,
            snackOpen: true,
            snackMessage: `${cropName} Removed`
          }
        });

        // this.state.selectedCrops.splice(removeIndex, 1);
      }
    } else {
      // DONE: add the selected crop to state and change the state, show snackbar

      dispatch({
        type: "SELECTED_CROPS_MODIFIER",
        data: {
          selectedCrops: [cropArray],
          snackOpen: true,
          snackMessage: `${cropName} Added`
        }
      });
    }
  };

  return (
    <Fragment>
      <div className="table-responsive">
        <table className="table">
          <thead className="tableHeadWrapper">
            <tr>
              <th>
                <Typography variant="body1">COVER CROP</Typography>
              </th>
              {state.selectedGoals.length !== 0
                ? state.selectedGoals.map((goal, index) => (
                    <th key={index}>
                      <Typography variant="body1">
                        {goal.toUpperCase()}
                      </Typography>
                    </th>
                  ))
                : ""}
              <th>
                <Typography variant="body1">GROWTH WINDOW</Typography>
              </th>
              <th>
                <Typography variant="body1">MY LIST</Typography>
                <Typography variant="subtitle1">
                  {/* <br /> */}
                  {`[${state.selectedCrops.length} CROPS]`}
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody className="tableBodyWrapper">
            {state.cropData.map((crop, index) => {
              if (
                !crop.fields["Cover Crop Name"].trim() !==
                "Ok hopefully he answers me soon.".trim()
              ) {
                return (
                  <tr key={`croprow${index}`}>
                    <td
                      style={{
                        display: "flex",
                        flexDirection: "row"
                      }}
                    >
                      {/* {this.getCropImageFromAPI(
                          crop.fields["Cover Crop Name"]
                        )} */}
                      <img
                        src="http://placehold.it/100x100"
                        alt="placeholder"
                        style={{
                          flexBasis: "20%"
                        }}
                      />
                      <div className="cropDetailsText" style={{}}>
                        <div className="part1_ut">
                          <span className="cropCategory text-uppercase">
                            {crop.fields["Family Common Name"]}
                          </span>
                          <span className="cropName font-weight-lighter">
                            {crop.fields["Cover Crop Name"]}
                          </span>
                          <span className="cropScientificName">
                            {crop.fields["Scientific Name"]}
                          </span>
                        </div>
                        <div className="part2_lt">
                          <span className="cropDuration text-uppercase font-weight-bold">
                            {crop.fields["Duration"]}
                          </span>
                        </div>
                      </div>
                    </td>
                    {state.selectedGoals.length !== 0
                      ? state.selectedGoals.map((goal, index) => (
                          <td key={`rating${index}`}>
                            {getRating(crop.fields[goal])}
                          </td>
                        ))
                      : ""}
                    <td>GROWTH WINDOW</td>
                    <td style={{}}>
                      <div className="button1">
                        <LightButton
                          id={`cartBtn${index}`}
                          style={{
                            borderRadius: "0px",
                            width: "130px"
                          }}
                          onClick={() => {
                            addCropToBasket(
                              crop.id,
                              crop.fields["Cover Crop Name"],
                              `cartBtn${index}`
                            );
                          }}
                        >
                          ADD TO LIST
                        </LightButton>
                      </div>
                      <br />
                      <div className="button2">
                        <Button
                          size="small"
                          onClick={() => {
                            //   this.setState({
                            //     modalOpen: true,
                            //     modalBody: crop.fields
                            //   });
                          }}
                        >
                          View Crop Details
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              } else return "";
            })}
          </tbody>
        </table>
        {/* <MDBDataTable striped hover data={this.data} /> */}
      </div>

      <div className="cropGoals"></div>
    </Fragment>
  );
};

const getRating = ratng => {
  let rating = parseInt(ratng);
  if (rating === 0) {
    return (
      <div className="rating-0">
        <span></span>
      </div>
    );
  } else if (rating === 1) {
    return (
      <div className="rating-1">
        <span></span>
      </div>
    );
  } else if (rating === 2) {
    return (
      <div className="rating-2">
        <span></span>
      </div>
    );
  } else if (rating === 3) {
    return (
      <div className="rating-3">
        <span></span>
      </div>
    );
  } else if (rating === 4) {
    return (
      <div className="rating-4">
        <span></span>
      </div>
    );
  } else if (rating === 5) {
    return (
      <div className="rating">
        <span></span>
      </div>
    );
  }
};

export default CropTableComponent;
