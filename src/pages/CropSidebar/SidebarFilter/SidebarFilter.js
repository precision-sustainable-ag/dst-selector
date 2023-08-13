import {
  Collapse, List, ListItem, ListItemText, Tooltip, Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import React, { Fragment } from 'react';
import Filters from '../Filters/Filters';

const SidebarFilter = ({
  filter,
  index,
  sidebarFilterOptions,
  setSidebarFilterOptions,
  resetAllFilters,
  sectionFilter,
  handleToggle,
}) => {
  const sharedDataState = useSelector((stateRedux) => stateRedux.sharedData);

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
            className={sharedDataState[sectionFilter] ? 'filterOpen' : 'filterClose'}
            component="div"
            onClick={() => handleToggle(sectionFilter)}
          >
            <ListItemText
              primary={<Typography variant="body2">{filter.name.toUpperCase()}</Typography>}
            />
            {sharedDataState[sectionFilter] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        </Tooltip>
      ) : (
        <ListItem
          key={index}
          className={sharedDataState[sectionFilter] ? 'filterOpen' : 'filterClose'}
          component="div"
          onClick={() => handleToggle(sectionFilter)}
        >
          <ListItemText
            primary={<Typography variant="body2">{filter.name.toUpperCase()}</Typography>}
          />
          {sharedDataState[sectionFilter] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      )}

      <Collapse in={sharedDataState[sectionFilter]} timeout="auto">
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
