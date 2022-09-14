import { Chip, Grid, Tooltip } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import React, {
  forwardRef, useEffect, useContext, useState,
} from 'react';
import { Context } from '../../../store/Store';

const DollarsAndRatings = ({ filter, handleChange }) => {
  const { state, dispatch } = useContext(Context);
  const sfilters = window.location.href.includes('species') ? state.selector : state.explorer;

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
          const filterOn = (key = filterKey) => dispatch({
            type: 'FILTER_ON',
            data: {
              value: key,
            },
          });

          const filterOff = (key = filterKey) => dispatch({
            type: 'FILTER_OFF',
            data: {
              value: key,
            },
          });

          return (
            <Chip
              key={filter.name + i}
              label={filter.symbol === 'dollar' ? '$'.repeat(i) : `${i} \u2605`}
              style={{
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
  const sfilters = window.location.href.includes('species') ? state.selector : state.explorer;

  return filter.values.map((val) => {
    const selected = sfilters[`${filter.name}: ${val}`];

    return (
      <Chip
        key={filter.name + val}
        onClick={() => handleChange(filter.name, val)}
        component="li"
        size="medium"
        label={val}
        style={{
          marginRight: 3,
          marginBottom: 3,
        }}
        color={selected ? 'primary' : 'secondary'}
      />
    );
  });
}; // Chips

const Tip = ({ filter, omitHeading }) => {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip
      arrow
      placement="right"
      disableFocusListener
      disableHoverListener
      disableTouchListener
      open={open}
      onClick={() => setOpen(!open)}
      onMouseOut={() => setOpen(false)}
      title={(
        <div className="filterTooltip">
          <p dangerouslySetInnerHTML={{ __html: filter.description }} />
        </div>
      )}
    >
      <small style={{ whiteSpace: 'nowrap' }}>
        {omitHeading ? '' : filter.name}
        <HelpOutlineIcon style={{ cursor: 'pointer', transform: 'scale(0.7)' }} />
      </small>
    </Tooltip>
  );
}; // Tip

const Filters = forwardRef(({ props }) => {
  const { state, dispatch } = useContext(Context);

  const { filters, setSidebarFilterOptions, sidebarFilterOptions } = props;
  const [selected, setSelected] = useState({});

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

  const chipChange = (filtername, val) => {
    dispatch({
      type: 'FILTER_TOGGLE',
      data: {
        value: `${filtername}: ${val}`,
      },
    });
    setSelected({ ...selected, whatever: 'rerender' });
  };

  return (
    <Grid container spacing={2}>
      {filters.values.map((filter, i) => {
        if (filter.type === 'chip' || filters.type === 'chips-only') {
          if (filter.values && filter.values.length === 1) {
            return (
              <Grid key={i} item>
                <Chips state={state} filter={filter} props={props} handleChange={chipChange} />
                {filter.description && <Tip filter={filter} omitHeading />}
              </Grid>
            );
          }
          return (
            <Grid item key={i}>
              {filter.description && (
                <>
                  <Tip filter={filter} />
                  <br />
                </>
              )}
              <Chips state={state} filter={filter} props={props} handleChange={chipChange} />
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
}); // Filters

export default Filters;
