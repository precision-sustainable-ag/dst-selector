import {
  Collapse, List, ListItem, ListItemText, Tooltip, Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import React, { Fragment } from 'react';
import Filters from '../Filters/Filters';
import { toggleFilterValue } from '../../../reduxStore/filterSlice';

const SidebarFilter = ({
  filter,
  index,
  sidebarFilterOptions,
  setSidebarFilterOptions,
  resetAllFilters,
  sectionFilter,
}) => {
  const dispatchRedux = useDispatch();
  const filterDataRedux = useSelector((stateRedux) => stateRedux.filterData);

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
            className={filterDataRedux[sectionFilter] ? 'filterOpen' : 'filterClose'}
            component="div"
            onClick={() => dispatchRedux(toggleFilterValue(sectionFilter))}
          >
            <ListItemText
              primary={<Typography variant="body2">{filter.name.toUpperCase()}</Typography>}
            />
            {filterDataRedux[sectionFilter] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        </Tooltip>
      ) : (
        <ListItem
          key={index}
          className={filterDataRedux[sectionFilter] ? 'filterOpen' : 'filterClose'}
          component="div"
          onClick={() => dispatchRedux(toggleFilterValue(sectionFilter))}
        >
          <ListItemText
            primary={<Typography variant="body2">{filter.name.toUpperCase()}</Typography>}
          />
          {filterDataRedux[sectionFilter] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      )}

      <Collapse in={filterDataRedux[sectionFilter]} timeout="auto">
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
