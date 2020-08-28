import React, { useContext, useState, useEffect } from "react";
import { LightButton } from "./constants";
import { Context } from "../store/Store";
import ProgressButtonsInner from "./ProgressButtonsInner";

const ProgressButtons = () => {
  const [state, dispatch] = useContext(Context);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    disableLogic(state.progress, state.selectedGoals.length, state.soilData);
  }, [state]);

  const disableLogic = (progress, goalsLength, soilData) => {
    // console.log(parseInt(progress));
    switch (parseInt(progress)) {
      case 1: {
        // location selection state
        if (state.zone === 0 || state.address === "") {
          setIsDisabled(true);
        } else {
          setIsDisabled(false);
        }
        break;
      }
      // case 2: {
      //   if (
      //     // soilData.Drainage_Class.length === 0 ||
      //     // soilData.Drainage_Class === "" ||
      //     // soilData.Flooding_Frequency === null ||
      //     // soilData.Flooding_Frequency.length === 0 ||
      //     // soilData.Flooding_Frequency === ""
      //     false
      //   ) {
      //     setIsDisabled(true);
      //   } else {
      //     setIsDisabled(false);
      //   }
      // }
      case 4: {
        // goals selection state
        if (goalsLength > 3 || goalsLength < 1) {
          setIsDisabled(true);
        } else {
          setIsDisabled(false);
        }
        break;
      }
      default: {
        setIsDisabled(false);
        break;
      }
    }
  };

  return renderProgressButtons(state.progress, isDisabled);
};

const renderProgressButtons = (progress, isDisabled) => {
  if (progress < 0) return "";
  else {
    return (
      <div>
        <ProgressButtonsInner disabled={isDisabled} />
      </div>
    );
  }
};

export default ProgressButtons;
