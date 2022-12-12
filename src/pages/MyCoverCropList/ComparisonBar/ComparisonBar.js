/*
  Shows the comparison bar in the crop list component
  filteredGoals shows which goals are selected
  filteredVals shows the other filters that are selected
  toggleSidebarFilterItems toggles the vlaue of a specific filter item
  resetAllFilters resets all selected items in the sidebar
  showAllVariables selects all filters
*/

import {
  Button, List, ListItem, ListItemText, ListSubheader,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import RenderFilters from './RenderFilters/RenderFilters';
import RenderGoals from './RenderGoals/RenderGoals';

const ComparisonBar = ({
  filterData, goals, comparisonKeys, dispatch, comparisonView, classes,
}) => {
  const [filterValues, setFilterValues] = useState([]);
  const [goalsOpen, setGoalsOpen] = useState(false);
  const [allGoals, setAllGoals] = useState([]);
  useEffect(() => {
    const filteredVals = filterData.map((filter) => {
      const vals = filter.values.map((val) => ({
        ...val,
        selected: false,
      }));
      return {
        name: filter.name,
        description: filter.description || null,
        open: false,
        values: vals,
      };
    });
    const filteredGoals = goals.map((goal) => ({
      name: goal,
      selected: false,
    }));
    setFilterValues(filteredVals);
    setAllGoals(filteredGoals);
  }, [filterData]);

  const toggleSidebarFilterItems = (index) => {
    const newSidebarFilterVals = filterValues.map((obj, index2) => {
      if (index2 === index) return { ...obj, open: !obj.open };
      return { ...obj };
    });
    setFilterValues(newSidebarFilterVals);
  };

  const resetAllFilters = () => {
    if (comparisonKeys.length > 0) {
      dispatch({
        type: 'UPDATE_COMPARISON_KEYS',
        data: {
          comparisonKeys: [],
        },
      });
    }
  };

  const showAllVariables = () => {
    setGoalsOpen(true);
    const theGoals = [];
    theGoals.push('Cover Crop Group');
    const filteredGoals = goals.map((goal) => ({
      name: goal,
      selected: true,
    }));
    const filteredVals = filterData.map((filter) => {
      const vals = filter.values.map((val) => ({
        ...val,
        selected: true,
      }));
      return {
        name: filter.name,
        description: filter.description || null,
        open: true,
        values: vals,
      };
    });

    const filterKeysAppend = filteredVals.map((val, index) => {
      if (
        index !== 0
        && val.name !== 'Soil Conditions'
        && val.name !== 'Disease & Non Weed Pests'
        && val.name !== 'Beneficials'
        && val.name !== 'Disease & Non Weed Pests'
      ) {
        return val.values.map((v) => {
          if (v.name !== 'Roller Crimp at Flowering') {
            return v.alternateName ? v.alternateName : v.name;
          } return [];
        });
      } return [];
    });

    const filterGoalsAppend = filteredGoals.map((v) => v.name);

    theGoals.push(filterKeysAppend.flat(2));
    theGoals.push(filterGoalsAppend.flat());
    setFilterValues(filteredVals);
    setAllGoals(filteredGoals);

    dispatch({
      type: 'UPDATE_COMPARISON_KEYS',
      data: {
        comparisonKeys: theGoals.flat(2),
      },
    });
  };

  return comparisonView ? (
    <List
      component="nav"
      classes={{ root: classes.listRoot }}
      aria-labelledby="nested-list-subheader"
      subheader={(
        <ListSubheader
          classes={{ root: classes.listSubHeaderRoot }}
          component="div"
          id="nested-list-subheader"
        >
          COMPARE BY
        </ListSubheader>
      )}
      className={classes.root}
    >
      {comparisonKeys.length > 0 && (
        <ListItem onClick={() => {}}>
          <ListItemText
            primary={(
              <Button
                size="small"
                style={{ marginBottom: '-15px' }}
                className="text-uppercase text-left text-danger font-weight-bold"
                onClick={resetAllFilters}
              >
                Clear Variables
              </Button>
            )}
          />
        </ListItem>
      )}
      <ListItem>
        <ListItemText
          primary={(
            <Button size="small" className="text-uppercase text-left" onClick={showAllVariables}>
              Show All
            </Button>
          )}
        />
      </ListItem>
      {allGoals.length > 0 && (
        <RenderGoals
          goals={allGoals}
          goalsOpen={goalsOpen}
          setGoalsOpen={setGoalsOpen}
          comparisonKeys={comparisonKeys}
          dispatch={dispatch}
        />
      )}
      <RenderFilters
        filterValues={filterValues}
        toggleSidebarFilterItems={toggleSidebarFilterItems}
        classes={classes}
        comparisonKeys={comparisonKeys}
        dispatch={dispatch}
      />
    </List>
  ) : null;
};

export default ComparisonBar;
