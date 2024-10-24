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
    <>
      {filter.description !== '' ? (
        <Tooltip
          arrow
          placement="right-start"
          enterTouchDelay={0}
          title={(
            <p>{filter.description}</p>
          )}
          key={`tooltip${index}`}
        >
          <ListItem
            key={index}
            sx={{ paddingLeft: 3, backgroundColor: filterDataRedux[sectionFilter] ? '#add08f' : 'white' }}
            component="div"
            onClick={() => dispatchRedux(toggleFilterValue(sectionFilter))}
          >
            <ListItemText
              primary={
                <Typography variant="body2">{filter.name.toUpperCase()}</Typography>
              }
            />
            {
              filterDataRedux[sectionFilter]
                ? <ExpandLess data-test={`${filter.name.toUpperCase()}-expandless-icon`} />
                : <ExpandMore data-test={`${filter.name.toUpperCase()}-expandmore-icon`} />
            }
          </ListItem>
        </Tooltip>
      ) : (
        <ListItem
          key={index}
          sx={{ backgroundColor: filterDataRedux[sectionFilter] ? '#add08f' : 'white' }}
          component="div"
          onClick={() => dispatchRedux(toggleFilterValue(sectionFilter))}
        >
          <ListItemText
            primary={
              <Typography variant="body2" data-test={filter.name.toUpperCase()}>{filter.name.toUpperCase()}</Typography>
            }
          />
          {
            filterDataRedux[sectionFilter]
              ? <ExpandLess data-test={`${filter.name.toUpperCase()}-expandless-icon`} />
              : <ExpandMore data-test={`${filter.name.toUpperCase()}-expandmore-icon`} />
          }
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
    </>
  );
};

export default SidebarFilter;
