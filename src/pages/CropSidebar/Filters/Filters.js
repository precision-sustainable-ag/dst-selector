import { Chip, Grid, Tooltip } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import React, {
  useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterOffRedux, filterOnRedux, filterToggle } from '../../../reduxStore/filterSlice';

const DollarsAndRatings = ({ filter, handleChange }) => {
  const dispatchRedux = useDispatch();
  const filterStateRedux = useSelector((stateRedux) => stateRedux.filterData);
  const sfilters = window.location.href.includes('species-selector') ? filterStateRedux.selector : filterStateRedux.explorer;
  const units = filter.units === 'rating 1-3' ? 3 : 5;
  const style = {
    transform: 'scale(0.8)',
    transformOrigin: 'top left',
    width: '150%',
  };

  return (
    <div style={style}>
      {new Array(units)
        .fill(0)
        .map((_, i) => i + 1)
        .map((i) => {
          const filterKey = `${filter.name}: ${i}`;
          const selected = sfilters[filterKey];
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
                  handleChange(filter.name || filter.alternateName);
                } else {
                  if (selected) {
                    filterOff();
                  } else {
                    for (let j = 1; j <= filter.maxSize; j++) {
                      const filterKey2 = `${filter.name}: ${j}`;
                      if (j < i) {
                        filterOff(filterKey2);
                      } else {
                        filterOn(filterKey2);
                      }
                    }
                  }
                  handleChange(filter.name || filter.alternateName);
                }
              }}
            />

          );
        })}
    </div>
  );
}; // DollarsAndRatings

const Chips = ({ filter, handleChange }) => {
  const filterStateRedux = useSelector((stateRedux) => stateRedux.filterData);
  const sfilters = window.location.href.includes('species-selector') ? filterStateRedux.selector : filterStateRedux.explorer;
  return filter.values.map((val, i) => {
    const selected = sfilters[`${filter.name}: ${val.value}`];
    return (
      <Grid item>
        <Chip
          key={filter.name + val.value + i}
          onClick={() => handleChange(filter.name, val.value)}
          component="li"
          size="medium"
          label={val.value}
          color={selected ? 'primary' : 'secondary'}
        />
      </Grid>
    );
  });
}; // Chips

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

// added ref prop to remove error. TODO: look into if forwardRef is needed here since ref isnt used
const Filters = ({ filters }) => {
  const dispatchRedux = useDispatch();
  // const { filters } = props;
  const [selected, setSelected] = useState({});
  const [sidebarFilterOptions, setSidebarFilterOptions] = useState({});
  // eslint-disable-next-line no-unused-vars

  const setProps = (selectedItem) => {
    setSidebarFilterOptions({
      ...sidebarFilterOptions,
      ...selectedItem,
    });
  };

  useEffect(() => {
    setProps(selected);
  }, [selected]);

  const dollarsAndRatingsChange = () => {
    setSelected({ ...selected, whatever: 'rerender' });
  };

  const chipChange = (filterName, val) => {
    dispatchRedux(filterToggle({ value: `${filterName}: ${val}` }));
    setSelected({ ...selected, whatever: 'rerender' });
  };

  return (
    <Grid container spacing={2}>
      {filters.values.map((filter, i) => {
        if (filter.dataType === 'string') {
          return (
            <Grid container item spacing={1} key={i}>
              <Grid item key={i} xs={12}>
                <Tip filter={filter} />
              </Grid>
              <Grid item container xs={12} spacing={0.3}>
                <Chips key={i} filter={filter} handleChange={chipChange} />
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
                handleChange={dollarsAndRatingsChange}
              />
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}; // Filters

export default Filters;
