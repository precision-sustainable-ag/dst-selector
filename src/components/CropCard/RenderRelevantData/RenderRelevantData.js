import {
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import {
  getRating,
  RenderSeedPriceIcons,
} from '../../../shared/constants';

const lightBG = {
  border: '1px solid white',
  backgroundColor: '#f1f7eb',
  padding: '5px',
  marginBottom: '5px',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  fontWeight: 'bold',
  minHeight: '36px',
};

const RenderRelevantData = ({ filterKey = '', data = [] }) => {
  const filterData = [];
  data.forEach((filter) => {
    if (filter.label === filterKey) {
      filterData.push(filter);
    }
  });

  const getFilterItems = () => {
    if (filterData.length > 0 && filterData[0]?.dataType === 'number') {
      if (filterData[0].values[0].toString().length === 1) {
        if (filterKey === 'Seed Price per Pound') {
          return (
            <div style={lightBG}>
              <RenderSeedPriceIcons val={filterData[0].values[0]} />
            </div>
          );
        } return <div style={lightBG}>{getRating(filterData[0].values[0])}</div>;
      }
      return (
        <div style={lightBG}>
          <Typography variant="body2">{filterData[0].values[0]}</Typography>
        </div>
      );
    }
    if ((filterKey === 'Frost Seeding' || (filterKey === 'Can Aerial Seed?' || filterKey === 'Aerial Seeding'))) {
      return (
        <div style={lightBG}>
          <Typography data={data} variant="body2" filterKey={filterKey === 'Frost Seeding' ? filterKey : 'Aerial Seeding'}>
            {filterData[0]?.values[0] ? 'Yes' : 'N/A'}
          </Typography>
        </div>
      );
    } if (filterData[0]?.values[0]) {
      return (
        <div style={lightBG}>
          <Typography variant="body2">{filterData[0].values[0].toString()}</Typography>
        </div>
      );
    }
    return <div />;
  };

  useEffect(() => {
    getFilterItems();
  }, [filterData]);

  return (
    <>
      {getFilterItems()}
    </>
  );
};

export default RenderRelevantData;
