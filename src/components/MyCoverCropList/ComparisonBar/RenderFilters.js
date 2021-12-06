/* 
  Handles rendering the goals and updating them when selected
*/

import {
  Checkbox,
  Collapse,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import React, { Fragment } from "react";
const RenderFilters = ({
  filterValues = [],
  setFilterValues = () => {},
  toggleSidebarFilterItems = () => {},
  classes = {},
  comparisonKeys = [],
  dispatch = () => {},
}) => {
  const updateCheckboxStatus = (name = "") => {
    let comparisonKeysCopy = comparisonKeys;
    let indexOfValue = comparisonKeysCopy.indexOf(name);
    if (indexOfValue === -1) {
      // doesn't exist
      comparisonKeysCopy.push(name);
    } else {
      comparisonKeysCopy.splice(indexOfValue, 1);
    }

    dispatch({
      type: "UPDATE_COMPARISON_KEYS",
      data: {
        comparisonKeys: comparisonKeysCopy,
      },
    });
  };

  return filterValues.map((filter, index) => {
    if (
      filter.name === "Soil Conditions" ||
      filter.name === "Disease & Non Weed Pests" ||
      filter.name === "Beneficials"
    ) {
      return null;
    } else {
      return (
        <Fragment key={`filters-outer-${index}`}>
          {filter.description !== null ? (
            <Tooltip
              interactive
              arrow
              placement="right-start"
              title={
                <div className="filterTooltip">
                  <p>{filter.description}</p>
                </div>
              }
              key={`tooltip-outer-${index}`}
            >
              <ListItem
                button
                // className={classes.nested}
                className={
                  filterValues[index].open ? "filterOpen" : "filterClose"
                }
                component="div"
                onClick={() => toggleSidebarFilterItems(index)}
              >
                <ListItemText
                  primary={
                    <Typography variant="body2">
                      {filter.name.toUpperCase()}
                    </Typography>
                  }
                />
                {filterValues[index].open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            </Tooltip>
          ) : (
            <ListItem
              button
              // className={classes.nested}
              className={
                filterValues[index].open ? "filterOpen" : "filterClose"
              }
              component="div"
              onClick={() => toggleSidebarFilterItems(index)}
            >
              <ListItemText
                primary={
                  <Typography variant="body2">
                    {filter.name.toUpperCase()}
                  </Typography>
                }
              />
              {filterValues[index].open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
          )}

          <Collapse in={filterValues[index].open} timeout="auto">
            <List component="div" disablePadding>
              <ListItem component="div" className={classes.subNested}>
                <Grid container spacing={1}>
                  {filter.name === "Cover Crop Type" ? (
                    <FormControlLabel
                      control={
                        <Checkbox
                          //   checked={checkIfSelected(val.name)}
                          checked={comparisonKeys.includes("Cover Crop Group")}
                          //   onChange={handleChange}
                          onChange={() => {
                            let comparisonKeysCopy = comparisonKeys;
                            let indexOfValue =
                              comparisonKeysCopy.indexOf("Cover Crop Group");
                            if (indexOfValue === -1) {
                              // doesn't exist
                              comparisonKeysCopy.push("Cover Crop Group");
                            } else {
                              comparisonKeysCopy.splice(indexOfValue, 1);
                            }

                            dispatch({
                              type: "UPDATE_COMPARISON_KEYS",
                              data: {
                                comparisonKeys: comparisonKeysCopy,
                              },
                            });
                          }}
                          name={filter.name}
                          color="primary"
                        />
                      }
                      label={<small>{filter.name}</small>}
                    />
                  ) : (
                    filter.values.map((val, index2) =>
                      val.name !== "Roller Crimp at Flowering" ? (
                        <Grid item xs={12} key={`filter-inner-${index2}`}>
                          <Tooltip
                            interactive
                            arrow
                            placement="right"
                            title={
                              <div className="filterTooltip">
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: val.description,
                                  }}
                                ></p>
                              </div>
                            }
                            key={`tooltip${index}`}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={comparisonKeys.includes(
                                    val.alternateName
                                      ? val.alternateName
                                      : val.name
                                  )}
                                  //   onChange={handleChange}
                                  onChange={() => {
                                    updateCheckboxStatus(
                                      val.alternateName
                                        ? val.alternateName
                                        : val.name
                                    );
                                  }}
                                  name={val.name}
                                  color="primary"
                                />
                              }
                              label={<small>{val.name}</small>}
                            />
                          </Tooltip>
                        </Grid>
                      ) : (
                        ""
                      )
                    )
                  )}
                </Grid>
              </ListItem>
            </List>
          </Collapse>
        </Fragment>
      );
    }
  });
};

export default RenderFilters;
