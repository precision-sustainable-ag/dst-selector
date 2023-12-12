import { Chip, Grid, Tooltip } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterOffRedux, filterOnRedux, filterToggle } from '../../../reduxStore/filterSlice';

// this file handles setting all of the filters in the redux state

// handles dollars and ratings
const DollarsAndRatings = ({ filter }) => {
  const dispatchRedux = useDispatch();
  const filterStateRedux = useSelector((stateRedux) => stateRedux.filterData);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  let unitsArray = null;

  if (councilShorthandRedux === 'MCCC') {
    unitsArray = filter.units === 'rating 1-3' ? ['1', '2', '3'] : ['0', '1', '2', '3', '4'];
  } else {
    unitsArray = filter.units === 'rating 1-3' ? ['1', '2', '3'] : ['1', '2', '3', '4', '5'];
  }

  const style = {
    transform: 'scale(0.8)',
    transformOrigin: 'top left',
    width: '150%',
  };

  return (
    <div style={style}>
      {unitsArray
        .map((i) => {
          const filterKey = `${filter.name}: ${i}`;
          const selected = filterStateRedux.filters[filterKey];
          const filterOn = (key = filterKey) => dispatchRedux(filterOnRedux(key));
          const filterOff = (key = filterKey) => dispatchRedux(filterOffRedux(key));
          return (
            <Chip
              key={filter.name + i}
              // label={filter.dataType === 'currency' ? '$'.repeat(i) : filter.values[i - 1].value}
              label={filter.dataType === 'currency' ? '$'.repeat(i) : i}
              style={{
                fontSize: '1.2rem',
                marginRight: 2,
                marginBottom: 3,
              }}
              color={selected ? 'primary' : 'secondary'}
              onClick={() => {
                if (filter.dataType === 'currency') {
                  if (selected) {
                    filterOff();
                  } else {
                    filterOn();
                  }
                } else if (selected) {
                  filterOff();
                } else {
                  for (let j = councilShorthandRedux === 'MCCC' ? 0 : 1; j <= filter.maxSize; j++) {
                    const filterKey2 = `${filter.name}: ${j}`;
                    if (j < i) {
                      filterOff(filterKey2);
                    } else {
                      filterOn(filterKey2);
                    }
                  }
                }
              }}
            />

          );
        })}
    </div>
  );
}; // DollarsAndRatings

// handles text based chips
const Chips = ({ filter }) => {
  const dispatchRedux = useDispatch();

  const chipChange = (filterName, val) => {
    dispatchRedux(filterToggle({ value: `${filterName}: ${val}` }));
  };

  const filterStateRedux = useSelector((stateRedux) => stateRedux.filterData);
  return filter.values.map((val, i) => {
    const selected = filterStateRedux.filters[`${filter.name}: ${val.value}`];
    return (
      <Grid key={filter.name + val.value + i} item>
        <Chip
          key={filter.name + val.value + i}
          onClick={() => chipChange(filter.name, val.value)}
          component="li"
          size="medium"
          label={val.value}
          color={selected ? 'primary' : 'secondary'}
        />
      </Grid>
    );
  });
}; // Chips

// handles making the tooltips in sidebar
const Tip = ({ filter }) => (
  <Tooltip
    enterTouchDelay={0}
    title={(
      <>
        <p>{filter.description}</p>
        <p>{filter.details}</p>
      </>
      )}
  >
    <>
      {filter.name}
      <HelpOutlineIcon style={{ cursor: 'pointer', transform: 'scale(0.7)' }} />
    </>
  </Tooltip>
); // Tip

// renders sidebar
const Filters = ({ filters }) => (
  <Grid container spacing={2}>
    {filters.values.map((filter, i) => {
      if (filter.dataType === 'string') {
        return (
          <Grid container item spacing={1} key={i}>
            <Grid item key={i} xs={12}>
              <Tip filter={filter} />
            </Grid>
            <Grid item container xs={12} spacing={0.3}>
              <Chips key={i} filter={filter} />
            </Grid>
          </Grid>
        );
      }
      return (
        <Grid container item spacing={1} key={i}>
          <Grid item xs={12}>
            <Tip filter={filter} />
          </Grid>
          <Grid item xs={12}>
            <DollarsAndRatings
              filter={filter}
            />
          </Grid>
        </Grid>
      );
    })}
  </Grid>
); // Filters

export default Filters;
