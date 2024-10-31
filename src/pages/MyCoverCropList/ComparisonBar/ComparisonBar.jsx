/*
  Shows the comparison bar in the crop list component
  filteredGoals shows which goals are selected
  filteredVals shows the other filters that are selected
  toggleSidebarFilterItems toggles the vlaue of a specific filter item
  resetAllFilters resets all selected items in the sidebar
  showAllVariables selects all filters
*/
import {
  List, ListItem, ListItemText,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import RenderFilters from './RenderFilters/RenderFilters';
import RenderGoals from './RenderGoals/RenderGoals';
import { updateComparisonKeys } from '../../../reduxStore/sharedSlice';
import PSAButton from '../../../components/PSAComponents/PSAButton';

const ComparisonBar = ({
  filterData, goals, comparisonKeys, comparisonView, classes,
}) => {
  const dispatchRedux = useDispatch();
  const [filtersTotal, setFiltersTotal] = useState();
  const [filterValues, setFilterValues] = useState([]);
  const [goalsOpen, setGoalsOpen] = useState(false);
  const [allGoals, setAllGoals] = useState([]);

  useEffect(() => {
    let totalFilters = 0;
    const filteredVals = filterData.map((filter) => {
      totalFilters += filter.values.length;

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
    setFiltersTotal(totalFilters);
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
      dispatchRedux(updateComparisonKeys([]));
    }
  };

  const showAllVariables = () => {
    setGoalsOpen(true);
    const theGoals = [];
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

    const filterKeysAppend = filteredVals.map((val) => {
      if (
        val.name !== 'Soil Conditions'
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

    dispatchRedux(updateComparisonKeys(theGoals.flat(2)));
  };

  return comparisonView ? (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      sx={{
        width: '100%',
      }}
    >
      {comparisonKeys.length > 0 && (
        <ListItem onClick={() => {}}>
          <ListItemText
            primary={(
              <PSAButton
                size="small"
                style={{ marginBottom: '-15px', color: 'red' }}
                onClick={resetAllFilters}
                data-test="my-selected-crops-clear-variables"
              >
                Clear Variables
              </PSAButton>
            )}
          />
        </ListItem>
      )}
      {((comparisonKeys.length - allGoals.length) + 1) !== filtersTotal && (
        <ListItem>
          <ListItemText
            primary={(
              <PSAButton
                size="small"
                onClick={showAllVariables}
                data-test="my-selected-crops-show-all"
              >
                Show All
              </PSAButton>
            )}
          />
        </ListItem>
      )}
      {allGoals.length > 0 && (
        <RenderGoals
          goals={allGoals}
          goalsOpen={goalsOpen}
          setGoalsOpen={setGoalsOpen}
          comparisonKeys={comparisonKeys}
        />
      )}

      <RenderFilters
        filterValues={filterValues}
        toggleSidebarFilterItems={toggleSidebarFilterItems}
        classes={classes}
        comparisonKeys={comparisonKeys}
      />
    </List>
  ) : null;
};

export default ComparisonBar;
