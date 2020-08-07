import React, { useContext, useState, useEffect } from "react";
import { LightButton } from "./constants";
import { Context } from "../store/Store";
import ProgressButtonsInner from "./ProgressButtonsInner";

const ProgressButtons = () => {
  const [state, dispatch] = useContext(Context);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    disableLogic(state.progress, state.selectedGoals.length);
  }, [state]);

  const disableLogic = (progress, goalsLength) => {
    console.log(parseInt(progress));
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
  if (progress === 0) return "";
  else {
    return (
      <div>
        <ProgressButtonsInner disabled={isDisabled} />
      </div>
    );
  }
};

export default ProgressButtons;
