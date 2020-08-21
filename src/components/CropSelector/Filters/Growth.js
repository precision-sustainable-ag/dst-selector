import React, {
  useState,
  useEffect,
  Fragment,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Chip, Grid, Tooltip } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
const Growth = forwardRef((props, ref) => {
  const [selected, setSelected] = useState({
    Duration: [], // array
    "Active Growth Period": [], //array
    "Growing Window": [], // string
    "Establishes Quickly": [], // int
    "Ease of Establishment": [], // int
    "Winter Survival": [], // array
    "Early Spring Growth": [], // int
    "Flowering Trigger": [], // array
  });
  const handleChipClick = (filtername, val) => {
    if (selected[filtername].includes(val)) {
      let filtered = selected[filtername].filter((vals) => vals !== val);
      setSelected({ ...selected, [filtername]: filtered });
    } else {
      let roots = selected[filtername];
      roots.push(val);
      setSelected({ ...selected, [filtername]: roots });
    }
  };
  const handleChange = (newValue, name) => {
    setSelected({ ...selected, [name]: newValue });
  };

  useEffect(() => {
    props.setSidebarFilterOptions({
      ...props.sidebarFilterOptions,
      ...selected,
    });
  }, [selected]);

  useImperativeHandle(ref, () => ({
    resetFilters() {
      setSelected({
        Duration: [], // array
        "Active Growth Period": [], //array
        "Growing Window": [], // string
        "Establishes Quickly": [], // int
        "Ease of Establishment": [], // int
        "Winter Survival": [], // array
        "Early Spring Growth": [], // int
        "Flowering Trigger": [], // array
      });
    },
  }));

  const RenderChips = (props) => {
    return props.subFilter.values.map((val, index) => (
      <Grid item key={index}>
        <Chip
          onClick={() => handleChipClick(props.subFilter.name, val)}
          component="li"
          size="medium"
          label={val}
          color={
            props.sidebarFilterOptions[props.subFilter.name].includes(val)
              ? "primary"
              : "secondary"
          }
        />
      </Grid>
    ));
  };

  return props.filters.values.map((val, index) => (
    <Grid container key={index} spacing={1}>
      {val.type === "chip" ? (
        <Fragment key={index}>
          <Grid item xs={12} style={{ marginTop: "1em" }}>
            <Tooltip
              interactive
              arrow
              placement="right"
              title={
                <div className="filterTooltip">
                  <p dangerouslySetInnerHTML={{ __html: val.description }}></p>
                </div>
              }
              key={`tooltip${index}`}
            >
              <small>{val.name}</small>
            </Tooltip>
          </Grid>
          <RenderChips
            sidebarFilterOptions={props.sidebarFilterOptions}
            subFilter={val}
            index={index}
          />
        </Fragment>
      ) : (
        <Fragment key={index}>
          <Grid item xs={12} style={{ marginTop: "1em" }}>
            <Tooltip
              interactive
              arrow
              placement="right"
              title={
                <div className="filterTooltip">
                  <p dangerouslySetInnerHTML={{ __html: val.description }}></p>
                </div>
              }
              key={`tooltip${index}`}
            >
              <small>{val.name}</small>
            </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <ToggleButtonGroup
              value={selected[val.name]}
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
      )}
      {/* {subFilter.values.map((val, index2) => subFilter.type)} */}
    </Grid>
  ));
});

export default Growth;
