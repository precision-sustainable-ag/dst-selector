import React, { useState, useEffect, Fragment, useContext } from "react";
import { Grid, Tooltip } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import { Context } from "../../../store/Store";
import "../../../styles/filters.scss";

const DiseaseAndNonWeedPests = (props) => {
  // const [state, dispatch] = useContext(Context);
  const [selected, setSelected] = useState({
    "Discourages Nematodes": [], // int
    "Promotes Nematodes": [], // int
    "Discourages Pest Insects": [], // int
    "Promotes Pest Insects": [], // int
    "Suppresses Cash Crop Disease": [], // int
    "Promotes Cash Crop Disease": [], // int
  });
  const setProps = (selected) => {
    props.setSidebarFilterOptions({
      ...props.sidebarFilterOptions,
      ...selected,
    });
  };
  useEffect(() => {
    setProps(selected);
  }, [selected]);
  const handleChange = (newValue, name) => {
    setSelected({ ...selected, [name]: newValue });
  };
  return (
    <Grid container spacing={1}>
      {props.filters.values.map((val, index) => {
        let groupBtnVal = `${val.name}-${props.sidebarFilterOptions[val.name]}`;
        let name = val.name;
        return (
          <Fragment key={index}>
            <Grid item xs={12} style={{ marginTop: "1em" }}>
              <Tooltip
                interactive
                arrow
                placement="right"
                title={
                  <div className="tooltipTextContainer text-left">
                    <p
                      dangerouslySetInnerHTML={{ __html: val.description }}
                    ></p>
                  </div>
                }
                key={`tooltip${index}`}
              >
                <small>{val.name}</small>
              </Tooltip>
            </Grid>
            <Grid item xs={12}>
              <ToggleButtonGroup
                value={selected[name]}
                onChange={(evt, newVal) => handleChange(newVal, val.name)}
                className="starRatingParent"
              >
                <ToggleButton
                  value={1}
                  size="small"
                  className={
                    props.sidebarFilterOptions[val.name].includes(1)
                      ? "selected"
                      : "not-selected"
                  }
                  style={{
                    borderTopLeftRadius: "20px",
                    borderBottomLeftRadius: "20px",
                  }}
                >
                  &#x2605;
                </ToggleButton>
                <ToggleButton
                  value={2}
                  size="small"
                  className={
                    props.sidebarFilterOptions[val.name].includes(2)
                      ? "selected"
                      : "not-selected"
                  }
                >
                  &#x2605;
                </ToggleButton>
                <ToggleButton
                  value={3}
                  size="small"
                  className={
                    props.sidebarFilterOptions[val.name].includes(3)
                      ? "selected"
                      : "not-selected"
                  }
                >
                  &#x2605;
                </ToggleButton>
                <ToggleButton
                  value={4}
                  size="small"
                  className={
                    props.sidebarFilterOptions[val.name].includes(4)
                      ? "selected"
                      : "not-selected"
                  }
                >
                  &#x2605;
                </ToggleButton>
                <ToggleButton
                  value={5}
                  size="small"
                  color="primary"
                  style={{
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px",
                  }}
                  className={
                    props.sidebarFilterOptions[val.name].includes(5)
                      ? "selected"
                      : "not-selected"
                  }
                >
                  &#x2605;
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Fragment>
        );
      })}
    </Grid>
  );
};

export default DiseaseAndNonWeedPests;
