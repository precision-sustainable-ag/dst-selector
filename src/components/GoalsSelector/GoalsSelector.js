// TODO: Goal tags are not responsive!
import React, { useContext, useEffect } from "react";
import { Context } from "../../store/Store";

import "../../styles/goalsSelector.scss";
import { Tooltip, Chip } from "@material-ui/core";

import Skeleton from "@material-ui/lab/Skeleton";

const GoalsSelector = () => {
  const [state, dispatch] = useContext(Context);
  const goalsURL =
    "https://api.airtable.com/v0/appC47111lCOTaMYe/Cover%20Crop%20Goals?maxRecords=300";
  const headers = new Headers();

  useEffect(() => {
    fetchGoals();
  }, []);

  const updateSelectedGoals = (item, key) => {
    const goals = [...state.selectedGoals];

    if (goals.indexOf(item.fields["Cover Crop Goal"]) === -1) {
      // does not exist, dispatch to state

      document.getElementById(`chip${key}`).classList.add("active");
      dispatch({
        type: "ADD_SELECTED_GOALS",
        data: item.fields["Cover Crop Goal"]
      });
    } else {
      // exists, remove it from the state and update the state
      let index = goals.indexOf(item.fields["Cover Crop Goal"]);
      goals.splice(index, 1);

      // make it lighter on the ui

      document.getElementById(`chip${key}`).classList.remove("active");

      dispatch({
        type: "UPDATE_SELECTED_GOALS",
        data: goals
      });
    }
  };

  const fetchGoals = async () => {
    headers.append("Authorization", "Bearer keywdZxSD9AC4vL6e");
    await fetch(goalsURL, { headers: headers })
      .then(response => {
        // console.log(response);
        return response.json();
      })
      .then(response => {
        // console.log(response);
        // console.log(response.records);
        dispatch({
          type: "ADD_GOALS",
          data: response.records
        });
      });
  };

  return (
    <div className="goalsContainer mt-5">
      <div className="row boxContainerRow goalsBoxContainer">
        <div className="col-lg-12">
          <h1>What are your cover cropping goals</h1>
        </div>
        <div className="col-lg-12">
          <p>Select upto three. Hover for more information</p>
        </div>
        <div className="goals col-lg-12">
          {state.allGoals.length > 0 ? (
            state.allGoals.map((goal, key) =>
              !goal.fields["Cover Crop Goal"].startsWith("TBD") ? (
                <Tooltip
                  interactive
                  arrow
                  title={
                    <div className="tooltipTextContainer">
                      <p>{goal.fields["Description"]}</p>
                    </div>
                  }
                  key={`tooltip${key}`}
                >
                  <Chip
                    label={goal.fields["Cover Crop Goal"].toUpperCase()}
                    onClick={() => updateSelectedGoals(goal, key)}
                    key={`chip${key}`}
                    id={`chip${key}`}
                    size="medium"
                    variant="outlined"
                    className="goal"
                  />
                </Tooltip>
              ) : (
                ""
              )
            )
          ) : (
            <Skeleton
              animation="pulse"
              height="100"
              width="100"
              variant="rect"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalsSelector;
