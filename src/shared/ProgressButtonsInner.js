/*
  This file contains the ProgressButtonsInner component
  The ProgressButtonsInner allow the user to navigate steps
*/

import React, { Fragment, useContext } from "react";
import { Context } from "../store/Store";
import { LightButton } from "./constants";

const ProgressButtonsInner = (props) => {
  let isDisabled = props.disabled;

  const [, dispatch] = useContext(Context);

  const changeProgress = (type) => {
    if (type === "increment") {
      dispatch({
        type: "UPDATE_PROGRESS",
        data: {
          type: "INCREMENT",
        },
      });
    }

    if (type === "decrement") {
      dispatch({
        type: "UPDATE_PROGRESS",
        data: {
          type: "DECREMENT",
        },
      });
    }
  };

  return (
    <Fragment>
      <LightButton onClick={() => changeProgress("decrement")}>
        {" "}
        back
      </LightButton>
      <LightButton
        onClick={() => changeProgress("increment")}
        disabled={isDisabled}
        className="ml-3"
      >
        next
      </LightButton>
    </Fragment>
  );
};

export default ProgressButtonsInner;
