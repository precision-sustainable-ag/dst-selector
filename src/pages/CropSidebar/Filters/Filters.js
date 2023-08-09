import { Chip, Grid, Tooltip } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import React, {
  useEffect, useContext, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { Context } from '../../../store/Store';
import { filterOffRedux, filterOnRedux, filterToggle } from '../../../reduxStore/filterSlice';

const DollarsAndRatings = ({ filter, handleChange }) => {
  const { state, dispatch } = useContext(Context);
  const dispatchRedux = useDispatch();
  const sfilters = window.location.href.includes('species-selector') ? state.selector : state.explorer;

  const style = filter.symbol === 'dollar'
    ? {}
    : {
      transform: 'scale(0.8)',
      transformOrigin: 'top left',
      width: '150%',
    };

  return (
    <div style={style}>
      {new Array(filter.maxSize)
        .fill(0)
        .map((_, i) => i + 1)
        .map((i) => {
          const filterKey = `${filter.name}: ${i}`;
          const selected = sfilters[filterKey];
          // const filterOn = (key = filterKey) => dispatch({
          //   type: 'FILTER_ON',
          //   data: {
          //     value: key,
          //   },
          // });
          const filterOn = (key = filterKey) => dispatchRedux(filterOnRedux(key));

          // const filterOff = (key = filterKey) => dispatch({
          //   type: 'FILTER_OFF',
          //   data: {
          //     value: key,
          //   },
          // });
          const filterOff = (key = filterKey) => dispatchRedux(filterOffRedux(key));

          return (
            <Chip
              key={filter.name + i}
              label={filter.symbol === 'dollar' ? '$'.repeat(i) : i.toString()}
              style={{
                fontSize: '1.2rem',
                marginRight: 2,
                marginBottom: 3,
              }}
              color={selected ? 'primary' : 'secondary'}
              onClick={() => {
                if (filter.symbol === 'dollar') {
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

const Chips = ({ state, filter, handleChange }) => {
  const sfilters = window.location.href.includes('species-selector') ? state.selector : state.explorer;

  return filter.values.map((val, i) => {
    const selected = sfilters[`${filter.name}: ${val.value}`];

    return (
      <Chip
        key={filter.name + val.value + i}
        onClick={() => handleChange(filter.name, val.value)}
        component="li"
        size="medium"
        label={val.value}
        style={{
          marginRight: 3,
          marginBottom: 3,
        }}
        color={selected ? 'primary' : 'secondary'}
      />
    );
  });
}; // Chips

const Tip = ({ filter }) => (
  <Tooltip
    arrow
    placement="right"
    disableFocusListener
    disableTouchListener
    title={(
      <div className="filterTooltip">
        <p>{filter.description}</p>
        <p>{filter.details}</p>
      </div>
      )}
  >
    <small style={{ whiteSpace: 'nowrap' }}>
      {filter.name}
      <HelpOutlineIcon style={{ cursor: 'pointer', transform: 'scale(0.7)' }} />
    </small>
  </Tooltip>
); // Tip

// added ref prop to remove error. TODO: look into if forwardRef is needed here since ref isnt used
const Filters = ({ filters }) => {
  const { state, dispatch } = useContext(Context);
  const disptachRedux = useDispatch();
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
    disptachRedux(filterToggle({ value: `${filterName}: ${val}` }));
    // dispatch({
    //   type: 'FILTER_TOGGLE',
    //   data: {
    //     value: `${filterName}: ${val}`,
    //   },
    // });
    setSelected({ ...selected, whatever: 'rerender' });
  };

  return (
    <Grid container spacing={2}>
      {filters.values.map((filter, i) => {
        if (filter.type === 'string') {
          return (
            <Grid item key={i}>
              <>
                <Tip filter={filter} />
                <br />
              </>
              <Chips key={i} state={state} filter={filter} handleChange={chipChange} />
            </Grid>
          );
        }
        return (
          <Grid key={i} item xs={12}>
            <Tip filter={filter} />
            <br />
            <DollarsAndRatings
              state={state}
              filter={filter}
              handleChange={dollarsAndRatingsChange}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}; // Filters

export default Filters;
