/*
  This file contains the ProgressButtons component
  The ProgressButtons allow the user to navigate steps
*/

import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/Store";
import ProgressButtonsInner from "./ProgressButtonsInner";

const ProgressButtons = () => {
  const {state} = useContext(Context);
  const section  = window.location.href.includes('selector') ? 'selector' : 'explorer';
  const sfilters = state[section];

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const disableLogic = (progress, goalsLength) => {
      switch (parseInt(progress)) {
        case 1: {
          // location selection state
          if (sfilters.zone === 0 || state.address === "") {
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

    disableLogic(state.progress, state.selectedGoals.length);
  }, [state]);

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
