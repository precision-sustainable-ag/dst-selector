import {
  Collapse, List, ListItem, ListItemText, Tooltip, Typography,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import React, { Fragment, useContext } from 'react';
import Filters from '../Filters/Filters';
import { Context } from '../../../store/Store';

const SidebarFilter = ({
  filter,
  index,
  sidebarFilterOptions,
  setSidebarFilterOptions,
  resetAllFilters,
  sectionFilter,
  handleToggle,
}) => {
  const { state } = useContext(Context);

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
        </Tooltip>
      ) : (
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
      )}

      <Collapse in={state[sectionFilter]} timeout="auto">
        <List component="div" disablePadding>
          <ListItem key={index} component="div">
            <Filters
              filters={filter}
              sidebarFilterOptions={sidebarFilterOptions}
              setSidebarFilterOptions={setSidebarFilterOptions}
              resetAllFilters={resetAllFilters}
            />
          </ListItem>
        </List>
      </Collapse>
    </Fragment>
  );
};

export default SidebarFilter;
