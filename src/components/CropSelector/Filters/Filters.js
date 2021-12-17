import { Chip, Grid, Tooltip } from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useContext,
} from "react";
import { Context } from "../../../store/Store";

const DollarsAndRatings = ({ data, filter, handleChange }) => {
  // if (!data) console.log(filter, data);
  let style =
    filter.symbol === "dollar"
      ? {}
      : {
          transform: "scale(0.8)",
          transformOrigin: "top left",
          width: "150%",
        };

  // if (data.length > 0) console.log(data);

  return (
    <div style={style}>
      {new Array(filter.maxSize)
        .fill(0)
        .map((_, i) => i + 1)
        .map((i) => {
          const selected = data.includes(i);
          // console.log(selected);
          return (
            <Chip
              label={filter.symbol === "dollar" ? "$".repeat(i) : i + " \u2605"}
              style={{
                marginRight: 2,
                marginBottom: 3,
              }}
              color={selected ? "primary" : "secondary"}
              onClick={() => {
                if (filter.symbol === "dollar") {
                  if (selected) {
                    data = data.filter((d) => d !== i);
                  } else {
                    data.push(i);
                  }
                  handleChange(data, filter.name || filter.alternateName);
                } else {
                  if (selected) {
                    data = data.filter((j) => j !== i);
                  } else {
                    for (let j = i; j <= filter.maxSize; j++) {
                      if (!data.includes(j)) {
                        data.push(j);
                      }
                    }
                  }
                  // console.log(data);
                  handleChange(
                    data.sort(),
                    filter.name || filter.alternateName
                  );
                }
              }}
            />
          );
        })}
    </div>
  );
}; // DollarsAndRatings

const Chips = ({ props, filter, handleChange }) => {
  let { sidebarFilterOptions } = props;

  // console.log(filter);
  return filter.values.map((val) => {
    const selected = sidebarFilterOptions[filter.name].includes(val);
    console.log(filter.alternateName);
    return (
      <Chip
        onClick={() => handleChange(filter.alternateName, val)}
        component="li"
        size="medium"
        label={val}
        style={{
          marginRight: 3,
          marginBottom: 3,
        }}
        color={selected ? "primary" : "secondary"}
      />
    );
  });
}; // Chips

const Tip = ({ filter, omitHeading }) => {
  let [open, setOpen] = useState(false);

  return (
    <Tooltip
      interactive
      arrow
      placement="right"
      disableFocusListener
      disableHoverListener
      disableTouchListener
      open={open}
      onClick={() => setOpen(!open)}
      onMouseOut={() => setOpen(false)}
      title={
        <div className="filterTooltip">
          <p dangerouslySetInnerHTML={{ __html: filter.description }} />
        </div>
      }
    >
      <small style={{ whiteSpace: "nowrap" }}>
        {omitHeading ? "" : filter.name}
        <HelpOutlineIcon
          style={{ cursor: "pointer", transform: "scale(0.7)" }}
        />
      </small>
    </Tooltip>
  );
}; // Tip

const Filters = forwardRef(({ props }, ref) => {
  let { filters, setSidebarFilterOptions, sidebarFilterOptions } = props;
  const options = filters.values.reduce(function (acc, cur, i) {
    acc[cur.alternateName || cur.name] = [];
    return acc;
  }, {});

  // console.log(props.filters);

  const [selected, setSelected] = useState(options);

  const setProps = (selected) => {
    setSidebarFilterOptions({
      ...sidebarFilterOptions,
      ...selected,
    });
  };

  useEffect(() => {
    setProps(selected);
  }, [selected]);

  useImperativeHandle(ref, () => ({
    resetFilters() {
      setSelected(options);
    },
  }));

  const dollarsAndRatingsChange = (newValue, name) => {
    console.log(newValue, name);
    setSelected({ ...selected, [name]: newValue });
  };

  const chipChange = (filtername, val) => {
    console.log(filtername, selected, val);
    if (selected[filtername].includes(val)) {
      let filtered = selected[filtername].filter((vals) => vals !== val);
      setSelected({ ...selected, [filtername]: filtered });
    } else {
      let added = selected[filtername];
      added.push(val);
      setSelected({ ...selected, [filtername]: added });
    }
  };

  // console.log(sidebarFilterOptions);

  return (
    <Grid container spacing={2}>
      {filters.values.map((filter) => {
        if (filter.type === "chip" || filters.type === "chips-only") {
          if (filter.values && filter.values.length === 1) {
            return (
              <Grid item>
                <Chips
                  filter={filter}
                  props={props}
                  handleChange={chipChange}
                />
                <Tip filter={filter} omitHeading={true} />
              </Grid>
            );
          } else {
            return (
              <Grid item>
                <Tip filter={filter} />
                <br />
                <Chips
                  filter={filter}
                  props={props}
                  handleChange={chipChange}
                />
              </Grid>
            );
          }
        } else {
          let data = sidebarFilterOptions[filter.name || filter.alternateName];
          // console.log(data, filter.name || filter.alternateName);

          return (
            <Grid item xs={12}>
              <Tip filter={filter} />
              <br />
              <DollarsAndRatings
                filter={filter}
                data={data}
                handleChange={dollarsAndRatingsChange}
              />
            </Grid>
          );
        }
      })}
    </Grid>
  );
}); // Filters

export { Filters };
