import {
  Collapse, Grid, List, ListItem, ListItemText, Tooltip, Typography,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import React, { Fragment, useContext } from 'react';
import ForwardFilter from '../Filters/ForwardFilter';
import { Context } from '../../../store/Store';

const FilterItem = ({
  index, state, handleToggle, sectionFilter, filter,
}) => (
  <ListItem
    key={index}
    className={state[sectionFilter] ? 'filterOpen' : 'filterClose'}
    component="div"
    onClick={() => handleToggle(sectionFilter)}
  >
    <ListItemText
      primary={<Typography variant="body2">{filter.name.toUpperCase()}</Typography>}
    />
    {state[sectionFilter] ? <ExpandLess /> : <ExpandMore />}
  </ListItem>
);

const SidebarFilter = ({
  filter,
  index,
  sidebarFilterOptions,
  setSidebarFilterOptions,
  resetAllFilters,
  sectionFilter,
  handleToggle,
  props,
}) => {
  const { state } = useContext(Context);

  const forwardFilter = (Component, filt, i) => (
    <Grid container spacing={1}>
      <Grid item>
        <Component
          key={i}
          filters={filt}
          sidebarFilterOptions={sidebarFilterOptions}
          setSidebarFilterOptions={setSidebarFilterOptions}
          resetAllFilters={resetAllFilters}
          {...props}
        />
      </Grid>
    </Grid>
  ); // Filter

  return (
    <Fragment key={index}>
      {filter.description !== null ? (
        <Tooltip
          arrow
          placement="right-start"
          title={(
            <div className="filterTooltip">
              <p>{filter.description}</p>
            </div>
          )}
          key={`tooltip${index}`}
        >
          <FilterItem index={index} state={state} handleToggle={handleToggle} sectionFilter={sectionFilter} filter={filter} />
        </Tooltip>
      ) : (
        <FilterItem index={index} state={state} handleToggle={handleToggle} sectionFilter={sectionFilter} filter={filter} />
      )}

      <Collapse in={state[sectionFilter]} timeout="auto">
        <List component="div" disablePadding>
          <ListItem key={index} component="div">{forwardFilter(ForwardFilter, filter, index)}</ListItem>
        </List>
      </Collapse>
    </Fragment>
  );
};

export default SidebarFilter;
