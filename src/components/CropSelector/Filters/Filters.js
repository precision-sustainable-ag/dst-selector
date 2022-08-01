import { Chip, Grid, Tooltip } from '@material-ui/core';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import React, {
  forwardRef,
  useEffect,
  useContext,
  // useImperativeHandle,
  useState,
} from 'react';

import { Context } from '../../../store/Store';

const DollarsAndRatings = ({ data, filter, handleChange }) => {
  const { state, change } = useContext(Context);
  const sfilters = window.location.href.includes('species') ? state.selector : state.explorer;

  // if (!data) return <Fragment></Fragment>;

  let style =
    filter.symbol === 'dollar'
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
          const filterKey = filter.name + ': ' + i;

          // const selected = data.includes(i);

          const selected = sfilters[filterKey];

          return (
            <Chip
              key={filter.name + i}
              label={filter.symbol === 'dollar' ? '$'.repeat(i) : i + ' \u2605'}
              style={{
                marginRight: 2,
                marginBottom: 3,
              }}
              color={selected ? 'primary' : 'secondary'}
              onClick={() => {
                if (filter.symbol === 'dollar') {
                  if (selected) {
                    change('FILTER_OFF', null, filter.name + ': ' + i);
                    // data = data.filter((d) => d !== i);
                  } else {
                    change('FILTER_ON', null, filter.name + ': ' + i);
                    // data.push(i);
                  }
                  // handleChange(filter.name || filter.alternateName, data);
                  handleChange(filter.name || filter.alternateName);
                } else {
                  if (selected) {
                    change('FILTER_OFF', null, filterKey);
                    // data = data.filter((j) => j !== i);
                  } else {
                    for (let j = 1; j <= filter.maxSize; j++) {
                      if (j < i) {
                        change('FILTER_OFF', null, filter.name + ': ' + j);
                      } else {
                        change('FILTER_ON', null, filter.name + ': ' + j);
                      }

                      // if (!data.includes(j)) {
                      //   data.push(j);
                      // }
                    }

                    // for (let j = i; j <= filter.maxSize; j++) {
                    //   if (!data.includes(j)) {
                    //     data.push(j);
                    //   }
                    // }
                  }
                  // handleChange(filter.name || filter.alternateName, data.sort());
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

  // let { sidebarFilterOptions } = props;

  return filter.values.map((val) => {
    // const selected = sidebarFilterOptions[filter.name].includes(val);

    const selected = sfilters[filter.name + ': ' + val];

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
  let [open, setOpen] = useState(false);

  return (
    <Tooltip
      interactive
      arrow
      placement="right"
      disableFocusListener
      disableHoverListener
      disableTouchListener
      open={open}
      onClick={() => setOpen(!open)}
      onMouseOut={() => setOpen(false)}
      title={
        <div className="filterTooltip">
          <p dangerouslySetInnerHTML={{ __html: filter.description }} />
        </div>
      }
    >
      <small style={{ whiteSpace: 'nowrap' }}>
        {omitHeading ? '' : filter.name}
        <HelpOutlineIcon style={{ cursor: 'pointer', transform: 'scale(0.7)' }} />
      </small>
    </Tooltip>
  );
}; // Tip

const Filters = forwardRef(({ props }, ref) => {
  const { state, change } = useContext(Context);

  let { filters, setSidebarFilterOptions, sidebarFilterOptions } = props;

  // const options = filters.values.reduce(function (acc, cur, i) {
  //   acc[cur.name || cur.alternateName] = [];
  //   return acc;
  // }, {});

  // const [selected, setSelected] = useState(options);
  const [selected, setSelected] = useState({});

  const setProps = (selected) => {
    setSidebarFilterOptions({
      ...sidebarFilterOptions,
      ...selected,
    });
  };

  useEffect(() => {
    setProps(selected);
  }, [selected]);

  //  useImperativeHandle(ref, () => ({
  //    resetFilters() {
  //      setSelected(options);
  //    },
  //  }));

  const dollarsAndRatingsChange = (filtername, val) => {
    // setSelected({ ...selected, [filtername]: val });
    setSelected({ ...selected, whatever: 'rerender' });
  };

  const chipChange = (filtername, val) => {
    change('FILTER_TOGGLE', null, filtername + ': ' + val);
    // change('FILTER_TOGGLE', filtername, val);
    setSelected({ ...selected, whatever: 'rerender' });
    // setSelected({ ...selected, [filtername]: val });

    // if (selected[filtername].includes(val)) {
    //   let filtered = selected[filtername].filter((vals) => vals !== val);
    //   setSelected({ ...selected, [filtername]: filtered });
    // } else {
    //   let added = selected[filtername];
    //   added.push(val);
    //   setSelected({ ...selected, [filtername]: added });
    // }
  };

  return (
    <Grid container spacing={2}>
      {filters.values.map((filter, i) => {
        if (filter.type === 'chip' || filters.type === 'chips-only') {
          if (filter.values && filter.values.length === 1) {
            return (
              <Grid item>
                <Chips state={state} filter={filter} props={props} handleChange={chipChange} />
                {filter.description && <Tip filter={filter} omitHeading={true} />}
              </Grid>
            );
          } else {
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
        } else {
          // let data = sidebarFilterOptions[filter.name || filter.alternateName];

          return (
            <Grid item xs={12}>
              <Tip filter={filter} />
              <br />
              <DollarsAndRatings
                state={state}
                filter={filter}
                // data={data}
                handleChange={dollarsAndRatingsChange}
              />
            </Grid>
          );
        }
      })}
    </Grid>
  );
}); // Filters

export { Filters };
