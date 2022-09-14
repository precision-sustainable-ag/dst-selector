import {
  Collapse, Grid, List, ListItem, ListItemText, Tooltip, Typography,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import React, { Fragment, useContext } from 'react';
import ForwardFilter from '../../Filters/ForwardFilter';
import { Context } from '../../../../store/Store';

const SidebarFilter = (props) => {
  const {
    filter,
    index,
    sidebarFilterOptions,
    setSidebarFilterOptions,
    resetAllFilters,
    sectionFilter,
    handleToggle,
  } = props;

  const { state } = useContext(Context);

  const forwardFilter = (Component, filt) => (
    <Grid container spacing={1}>
      <Grid item>
        <Component
          filters={filt}
          sidebarFilterOptions={sidebarFilterOptions}
          setSidebarFilterOptions={setSidebarFilterOptions}
          resetAllFilters={resetAllFilters}
          {...props}
        />
      </Grid>
    </Grid>
  ); // Filter

  const listItem = (
    <ListItem
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
          {listItem}
        </Tooltip>
      ) : (
        listItem
      )}

      <Collapse in={state[sectionFilter]} timeout="auto">
        <List component="div" disablePadding>
          <ListItem component="div">{forwardFilter(ForwardFilter, filter)}</ListItem>
        </List>
      </Collapse>
    </Fragment>
  );
};

export default SidebarFilter;
