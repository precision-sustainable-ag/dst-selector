/*
  Creates popups inside info sheet
  styled using ../../styles/tooltipMaker.scss
*/

import { Tooltip } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/Store";
import "../../styles/tooltipMaker.scss";

const TooltipMaker = ({ children, variable }) => {
  const [state] = useContext(Context);

  const [desc, setDesc] = useState("");
  const [dict, setDict] = useState([]);

  useEffect(() => {
    const dictionary = state.zone7Dictionary.filter(
      (val) => val.Variable === variable
    );
    setDict(dictionary);
  }, [state.zone7Dictionary, variable]);

  useEffect(() => {
    if (dict.length === 1) {
      setDesc(dict[0].Description);
    } else {
      setDesc("No Data");
    }
  }, [dict]);

  return (
    <Tooltip
      placement="top-end"
      title={
        <div className="filterTooltip">
          <p>{desc}</p>
        </div>
      }
      interactive
      arrow
    >
      <span className="tooltipChildren">{children}</span>
    </Tooltip>
  );
};

export default TooltipMaker;
