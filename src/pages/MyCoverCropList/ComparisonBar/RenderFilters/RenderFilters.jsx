/*
  Handles rendering the goals and updating them when selected
*/

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Collapse,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { PSACheckbox, PSATooltip } from 'shared-react-components/src';
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
      filter.name === 'Soil Conditions' ||
      filter.name === 'Disease & Non Weed Pests' ||
      filter.name === 'Beneficials'
    ) {
      return null;
    }
    return (
      <Fragment key={`filters-outer-${filter.name}`}>
        {filter.description !== null ? (
          <PSATooltip
            arrow
            placement="right-start"
            enterTouchDelay={0}
            title={filter.description}
            key={`tooltip-outer-${filter.name}`}
            tooltipContent={
              <ListItemButton
                sx={{ backgroundColor: filterValues[index].open ? '#add08f' : 'white' }}
                component="div"
                onClick={() => toggleSidebarFilterItems(index)}
              >
                <ListItemText
                  primary={
                    <Typography variant="body2" data-test={`${filter.name.toUpperCase()}`}>
                      {filter.name.toUpperCase()}
                    </Typography>
                  }
                />
                {filterValues[index].open ? (
                  <ExpandLess data-test={`${filter.name.toUpperCase()}-expandless-icon`} />
                ) : (
                  <ExpandMore data-test={`${filter.name.toUpperCase()}-expandmore-icon`} />
                )}
              </ListItemButton>
            }
          />
        ) : (
          <ListItemButton
            sx={{ backgroundColor: filterValues[index].open ? '#add08f' : 'white' }}
            component="div"
            onClick={() => toggleSidebarFilterItems(index)}
          >
            <ListItemText
              primary={
                <Typography variant="body2" data-test={`${filter.name.toUpperCase()}`}>
                  {filter.name.toUpperCase()}
                </Typography>
              }
            />
            {filterValues[index].open ? (
              <ExpandLess data-test={`${filter.name.toUpperCase()}-expandless-icon`} />
            ) : (
              <ExpandMore data-test={`${filter.name.toUpperCase()}-expandmore-icon`} />
            )}
          </ListItemButton>
        )}
        <Collapse in={filterValues[index].open} timeout="auto">
          <List component="div" disablePadding>
            <ListItem component="div" sx={{ paddingLeft: 4 }}>
              <Grid container spacing={1}>
                {filter.name === 'Cover Crop Type' ? (
                  <FormControlLabel
                    control={
                      <PSACheckbox
                        checked={comparisonKeys.includes('Cover Crop Group')}
                        name={filter.name}
                        data-test={`${filter.name}-checkbox`}
                        color="primary"
                        onChange={() => {
                          const comparisonKeysCopy = comparisonKeys;
                          const indexOfValue = comparisonKeysCopy.indexOf('Cover Crop Group');
                          if (indexOfValue === -1) {
                            comparisonKeysCopy.push('Cover Crop Group');
                          } else {
                            comparisonKeysCopy.splice(indexOfValue, 1);
                          }
                          dispatchRedux(updateComparisonKeys(comparisonKeysCopy));
                        }}
                      />
                    }
                    label={<small>{filter.name}</small>}
                  />
                ) : (
                  filter.values.map((val) =>
                    val.name !== 'Roller Crimp at Flowering' ? (
                      <Grid key={`filter-inner-${val.name}`} size={12}>
                        <PSATooltip
                          arrow
                          placement="right"
                          enterTouchDelay={0}
                          title={val.description}
                          key={`tooltip${val.name}`}
                          tooltipContent={
                            <FormControlLabel
                              control={
                                <PSACheckbox
                                  checked={comparisonKeys.includes(val.alternateName || val.name)}
                                  name={val.name}
                                  data-test={`${val.name}-checkbox`}
                                  color="primary"
                                  onChange={() => {
                                    updateCheckboxStatus(
                                      val.alternateName ? val.alternateName : val.name,
                                    );
                                  }}
                                />
                              }
                              label={<small>{val.name}</small>}
                            />
                          }
                        />
                      </Grid>
                    ) : (
                      ''
                    ),
                  )
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
