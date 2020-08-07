import React, { useContext, useState, useEffect } from "react";
import { LightButton } from "./constants";
import { Context } from "../store/Store";
import ProgressButtonsInner from "./ProgressButtonsInner";

const ProgressButtons = () => {
  const [state, dispatch] = useContext(Context);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    disableLogic();
  }, [state.progress, state.selectedGoals]);
  const disableLogic = () => {
    switch (state.progress) {
      case 1: {
        // location selection state
        if (state.zone === 0 || isNaN(state.zone) || state.address === "") {
          setIsDisabled(true);
        } else {
          setIsDisabled(false);
        }
        break;
      }
      case 4: {
        // goals selection state
        if (state.selectedGoals.length > 3 || state.selectedGoals.length < 1) {
          setIsDisabled(true);
        } else {
          setIsDisabled(false);
        }
        break;
      }
      default: {
        setIsDisabled(false);
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
