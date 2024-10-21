import {
  Collapse, List, ListItem, ListItemText, Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import React, { Fragment } from 'react';
import Filters from '../Filters/Filters';
import { toggleFilterValue } from '../../../reduxStore/filterSlice';
import PSATooltip from '../../../components/PSAComponents/PSATooltip';

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
        <PSATooltip
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
              primary={<Typography variant="body2">{filter.name.toUpperCase()}</Typography>}
            />
            {filterDataRedux[sectionFilter] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        </PSATooltip>
      ) : (
        <ListItem
          key={index}
          sx={{ backgroundColor: filterDataRedux[sectionFilter] ? '#add08f' : 'white' }}
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
    </>
  );
};

export default SidebarFilter;
