/* 
  Shows the comparison bar in the crop list component 
  filteredGoals shows which goals are selected
  filteredVals shows the other filters that are selected
  toggleSidebarFilterItems toggles the vlaue of a specific filter item
  resetAllFilters resets all selected items in the sidebar
  showAllVariables selects all filters
*/

import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import RenderFilters from "./RenderFilters";
import RenderGoals from "./RenderGoals";

const ComparisonBar = (props) => {
  const [filterValues, setFilterValues] = useState([]);
  const [goalsOpen, setGoalsOpen] = useState(false);
  const [goals, setGoals] = useState([]);
  useEffect(() => {
    const filteredVals = props.filterData.map((filter) => {
      const vals = filter.values.map((val) => {
        return {
          ...val,
          selected: false,
        };
      });
      return {
        name: filter.name,
        description: filter.description || null,
        open: false,
        values: vals,
      };
    });
    const filteredGoals = props.goals.map((goal) => {
      return {
        name: goal,
        selected: false,
      };
    });
    setFilterValues(filteredVals);
    setGoals(filteredGoals);

    return () => {};
  }, []);

  const toggleSidebarFilterItems = (index) => {
    const newSidebarFilterVals = filterValues.map((obj, index2) => {
      if (index2 === index) return { ...obj, open: !obj.open };
      else return { ...obj };
    });
    setFilterValues(newSidebarFilterVals);
  };
  const resetAllFilters = () => {
    if (props.comparisonKeys.length > 0) {
      props.dispatch({
        type: "UPDATE_COMPARISON_KEYS",
        data: {
          comparisonKeys: [],
        },
      });
    }
  };
  const showAllVariables = () => {
    setGoalsOpen(true);
    let allGoals = [];
    allGoals.push("Cover Crop Group");
    const filteredGoals = props.goals.map((goal) => {
      return {
        name: goal,
        selected: true,
      };
    });
    const filteredVals = props.filterData.map((filter) => {
      const vals = filter.values.map((val) => {
        return {
          ...val,
          selected: true,
        };
      });
      return {
        name: filter.name,
        description: filter.description || null,
        open: true,
        values: vals,
      };
    });

    const filterKeysAppend = filteredVals.map((val, index) => {
      if (
        index !== 0 &&
        val.name !== "Soil Conditions" &&
        val.name !== "Disease & Non Weed Pests" &&
        val.name !== "Beneficials" &&
        val.name !== "Disease & Non Weed Pests"
      ) {
        return val.values.map((v) => {
          if (v.name !== "Roller Crimp at Flowering") {
            return v.alternateName ? v.alternateName : v.name;
          } else return [];
        });
      } else return [];
    });

    const filterGoalsAppend = filteredGoals.map((v) => v.name);

    allGoals.push(filterKeysAppend.flat(2));
    allGoals.push(filterGoalsAppend.flat());
    setFilterValues(filteredVals);
    setGoals(filteredGoals);

    props.dispatch({
      type: "UPDATE_COMPARISON_KEYS",
      data: {
        comparisonKeys: allGoals.flat(2),
      },
    });
  };
  return props.comparisonView ? (
    <List
      component="nav"
      classes={{ root: props.classes.listRoot }}
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          classes={{ root: props.classes.listSubHeaderRoot }}
          component="div"
          id="nested-list-subheader"
        >
          COMPARE BY
        </ListSubheader>
      }
      className={props.classes.root}
    >
      {props.comparisonKeys.length > 0 ? (
        <ListItem onClick={() => {}}>
          <ListItemText
            primary={
              <Typography
                variant="button"
                className="text-uppercase text-left text-danger font-weight-bold"
                onClick={resetAllFilters}
                style={{ cursor: "pointer" }}
              >
                Clear Variables
              </Typography>
            }
          />
        </ListItem>
      ) : (
        <ListItem></ListItem>
      )}
      <ListItem>
        <ListItemText
          primary={
            <Button
              size="small"
              className="text-uppercase text-left"
              onClick={showAllVariables}
            >
              Show All
            </Button>
          }
        />
      </ListItem>
      {goals.length > 0 ? (
        <RenderGoals
          goals={goals}
          setGoals={setGoals}
          goalsOpen={goalsOpen}
          setGoalsOpen={setGoalsOpen}
          classes={props.classes}
          comparisonKeys={props.comparisonKeys}
          dispatch={props.dispatch}
        />
      ) : (
        ""
      )}

      <RenderFilters
        filterValues={filterValues}
        toggleSidebarFilterItems={toggleSidebarFilterItems}
        classes={props.classes}
        comparisonKeys={props.comparisonKeys}
        dispatch={props.dispatch}
      />
    </List>
  ) : (
    ""
  );
};

export default ComparisonBar;
