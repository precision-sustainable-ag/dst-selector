import React, { useContext, Fragment, useEffect, useState } from "react";
import { Context } from "../../store/Store";
import moment from "moment";
import { Typography, Button } from "@material-ui/core";
import { LightButton } from "../../shared/constants";
import "../../styles/cropCalendarViewComponent.scss";

const CropCalendarViewComponent = () => {
  const [state, dispatch] = useContext(Context);
  const [goalRatings, setGoalRatings] = useState([]);
  // get current year.
  // TODO: Check year logic ? currently Juliet wants to return current year if month is before november
  let currentYear = new Date().getFullYear();
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

  var allMonths = moment()
    .localeData()
    .monthsShort();
  const cropDataURL =
    "https://api.airtable.com/v0/appC47111lCOTaMYe/Cover%20Crops%20Data?maxRecords=300&timeZone=America_NewYork&filterByFormula=NOT(SWITCH({Cover Crop Name},'__Open Discussion Row','Ok hopefully he answers me soon.'))";
  const allGoalsURL =
    "https://api.airtable.com/v0/appC47111lCOTaMYe/Cover%20Crop%20Goals?maxRecords=300";
  const headers = new Headers();
  headers.append("Authorization", "Bearer ***REMOVED***");
  // useEffect(() => {

  // });
  useEffect(() => {
    let initialized = fetchRecordsIfUnavailable();
    initialized.then(() => {
      console.log("goal values set");

      // putGoalValues();
    });
    // fetchRecords.then(() => console.log(state.allGoals.length));
    // putGoalValues();
  }, []);

  const putGoalValues = () => {
    console.log(state.allGoals.length);
    state.allGoals.map((goal, index) => {
      let goalName = goal.fields["Cover Crop Goal"];
      state.cropData.map((crop, index2) => {
        // let cropId =

        console.log(
          goalName + " for " + crop.fields["Cover Crop Name"],
          crop.fields[goalName]
        );
      });
    });
  };
  const fetchRecordsIfUnavailable = () => {
    // get crop data if unavailable
    let _promise = new Promise(async function(resolve, reject) {
      if (state.cropData.length === 0) {
        // get crop data
        let records = await fetch(cropDataURL, { headers: headers });
        let json = records.json();
        json
          .then(val => {
            // console.log(val);
            dispatch({
              type: "PULL_CROP_DATA",
              data: val.records
            });
          })
          .then(() => {
            if (state.allGoals.length === 0) {
              // get all goals
              let records = fetch(allGoalsURL, { headers: headers });
              let json = records.json();
              json
                .then(val => {
                  dispatch({
                    type: "ADD_GOALS",
                    data: val.records
                  });
                })
                .then(() => {
                  resolve("worked");
                });
            } else resolve("worked");
          });
      } else resolve("worked");
    });
    // let isResolved = false;

    return _promise;
  };

  return (
    <Fragment>
      <div className="table-responsive">
        <table className="table calendarViewTable">
          <thead className="tableHeadWrapper">
            <tr>
              <td>
                <Typography variant="body1">COVER CROPS</Typography>
              </td>
              {/* {state.selectedGoals.length !== 0
              ? state.selectedGoals.map((goal, index) => (
                  <th key={index}>
                    <Typography variant="body1">
                      {goal.toUpperCase()}
                    </Typography>
                  </th>
                ))
              : ""} */}
              <td>
                <Typography variant="body1">AVERAGE GOAL RATING</Typography>
              </td>

              {allMonths.map((month, index) => (
                <td key={`monthskey${index}`}>
                  <Typography variant="body1">{month}</Typography>
                </td>
              ))}

              <td>
                <Typography variant="body1">MY LIST</Typography>
                <Typography variant="subtitle1">
                  {/* <br /> */}
                  {`[${state.selectedCrops.length} CROPS]`}
                </Typography>
              </td>
            </tr>
          </thead>
          <tbody>
            {state.cropData
              ? state.cropData.map((crop, index) => (
                  <tr key={`cropRow${index}`}>
                    <td className="calendarTableCell">
                      <img src="//placehold.it/50x50" alt="Placeholder" />
                      <Button>{crop.fields["Cover Crop Name"]}</Button>
                    </td>
                    <td>{/*average goal rating */}</td>

                    {allMonths.map((month, index) => (
                      <RenderGrowthWindowComponent
                        data={crop.fields}
                        month={month}
                        key={index}
                      />
                    ))}

                    <td>
                      {" "}
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
                            `cartBtn${index}`,
                            crop.fields
                          );
                        }}
                      >
                        ADD TO LIST
                      </LightButton>
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

const RenderGrowthWindowComponent = props => {
  let cropData = props.data;
  let month = props.month;
  let jan = cropData["January, Early"];
  console.log(jan);

  useEffect(() => {
    console.log("total");
  }, []);

  return <td className="legendColor">{month}</td>;
};

export default CropCalendarViewComponent;
