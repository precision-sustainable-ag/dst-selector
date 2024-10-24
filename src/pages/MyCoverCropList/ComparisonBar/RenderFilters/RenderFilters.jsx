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
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { updateComparisonKeys } from '../../../../reduxStore/sharedSlice';

const RenderFilters = ({
  filterValues = [],
  toggleSidebarFilterItems = () => {},
  comparisonKeys = [],
}) => {
  const dispatchRedux = useDispatch();
  const updateCheckboxStatus = (name = '') => {
    const comparisonKeysCopy = comparisonKeys;
    const indexOfValue = comparisonKeysCopy.indexOf(name);
    if (indexOfValue === -1) {
      // doesn't exist
      comparisonKeysCopy.push(name);
    } else {
      comparisonKeysCopy.splice(indexOfValue, 1);
    }

    dispatchRedux(updateComparisonKeys(comparisonKeysCopy));
  };

  return filterValues.map((filter, index) => {
    if (
      filter.name === 'Soil Conditions'
      || filter.name === 'Disease & Non Weed Pests'
      || filter.name === 'Beneficials'
    ) {
      return null;
    }
    return (
      <Fragment key={`filters-outer-${index}`}>
        {filter.description !== null ? (
          <Tooltip
            arrow
            placement="right-start"
            enterTouchDelay={0}
            title={(
              <p>{filter.description}</p>
              )}
            key={`tooltip-outer-${index}`}
          >
            <ListItem
              sx={{ backgroundColor: filterValues[index].open ? '#add08f' : 'white' }}
              component="div"
              onClick={() => toggleSidebarFilterItems(index)}
            >
              <ListItemText
                primary={<Typography variant="body2" data-test={`${filter.name.toUpperCase()}`}>{filter.name.toUpperCase()}</Typography>}
              />
              {filterValues[index].open
                ? <ExpandLess data-test={`${filter.name.toUpperCase()}-expandless-icon`} />
                : <ExpandMore data-test={`${filter.name.toUpperCase()}-expandmore-icon`} />}
            </ListItem>
          </Tooltip>
        ) : (
          <ListItem
            sx={{ backgroundColor: filterValues[index].open ? '#add08f' : 'white' }}
            component="div"
            onClick={() => toggleSidebarFilterItems(index)}
          >
            <ListItemText
              primary={<Typography variant="body2" data-test={`${filter.name.toUpperCase()}`}>{filter.name.toUpperCase()}</Typography>}
            />
            {filterValues[index].open
              ? <ExpandLess data-test={`${filter.name.toUpperCase()}-expandless-icon`} />
              : <ExpandMore data-test={`${filter.name.toUpperCase()}-expandmore-icon`} />}
          </ListItem>
        )}

        <Collapse in={filterValues[index].open} timeout="auto">
          <List component="div" disablePadding>
            <ListItem component="div" sx={{ paddingLeft: 4 }}>
              <Grid container spacing={1}>
                {filter.name === 'Cover Crop Type' ? (
                  <FormControlLabel
                    control={(
                      <Checkbox
                          //   checked={checkIfSelected(val.name)}
                        checked={comparisonKeys.includes('Cover Crop Group')}
                          //   onChange={handleChange}
                        onChange={() => {
                          const comparisonKeysCopy = comparisonKeys;
                          const indexOfValue = comparisonKeysCopy.indexOf('Cover Crop Group');
                          if (indexOfValue === -1) {
                            // doesn't exist
                            comparisonKeysCopy.push('Cover Crop Group');
                          } else {
                            comparisonKeysCopy.splice(indexOfValue, 1);
                          }

                          dispatchRedux(updateComparisonKeys(comparisonKeysCopy));
                        }}
                        name={filter.name}
                        color="primary"
                        data-test={`${filter.name}-checkbox`}
                      />
                      )}
                    label={<small>{filter.name}</small>}
                  />
                ) : (
                  filter.values.map((val, index2) => (val.name !== 'Roller Crimp at Flowering' ? (
                    <Grid item xs={12} key={`filter-inner-${index2}`}>
                      <Tooltip
                        arrow
                        placement="right"
                        enterTouchDelay={0}
                        title={(
                          <p>{val.description}</p>
                        )}
                        key={`tooltip${index}`}
                      >
                        <FormControlLabel
                          control={(
                            <Checkbox
                              checked={comparisonKeys.includes(
                                val.alternateName ? val.alternateName : val.name,
                              )}
                              onChange={() => {
                                updateCheckboxStatus(
                                  val.alternateName ? val.alternateName : val.name,
                                );
                              }}
                              name={val.name}
                              color="primary"
                              data-test={`${val.name}-checkbox`}
                            />
                              )}
                          label={<small>{val.name}</small>}
                        />
                      </Tooltip>
                    </Grid>
                  ) : (
                    ''
                  )))
                )}
              </Grid>
            </ListItem>
          </List>
        </Collapse>
      </Fragment>
    );
  });
};

export default RenderFilters;
