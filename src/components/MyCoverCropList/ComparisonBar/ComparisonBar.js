import React, { useState, useEffect, useContext, Fragment } from "react";
import { Context } from "../../../store/Store";
import {
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Typography,
  Button,
} from "@material-ui/core";

import RenderFilters from "./RenderFilters";
import RenderGoals from "./RenderGoals";

const ComparisonBar = (props) => {
  const [filterValues, setFilterValues] = useState([]);
  const [goalsOpen, setGoalsOpen] = useState(false);
  const [goals, setGoals] = useState([]);
  useEffect(() => {
    // setSidebarFilters(props.filterData);
    // const filterTitles = props.filterData.map((filter) => {
    //   return { name: filter.name, open: false };
    // });

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
    // console.log(filteredVals);
    setFilterValues(filteredVals);
    setGoals(filteredGoals);

    // setSidebarFiltersOpen(filterTitles);

    return () => {
      //   setSidebarFilters([]);
      //   setSidebarFiltersOpen([]);
    };
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
    // console.log(filteredVals);
    // console.error("Roller Crimp filter bug");
    const filterKeysAppend = filteredVals.map((val, index) => {
      if (
        index !== 0 &&
        val.name !== "Soil Conditions" &&
        val.name !== "Disease & Non Weed Pests" &&
        val.name !== "Beneficials" &&
        val.name !== "Disease & Non Weed Pests"
      ) {
        return val.values.map((v) => {
          if (v.name != "Roller Crimp at Flowering") {
            return v.alternateName ? v.alternateName : v.name;
          } else return [];
        });
      } else return [];
    });
    // console.log(filterKeysAppend);

    const filterGoalsAppend = filteredGoals.map((v) => v.name);

    // console.log(filterKeys);
    // console.log(filterKeysAppend.flat());
    allGoals.push(filterKeysAppend.flat(2));
    allGoals.push(filterGoalsAppend.flat());
    // console.log(allGoals.flat(2));
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
