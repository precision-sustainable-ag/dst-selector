import {
  Typography,
} from '@mui/material';
import React from 'react';
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
  if (typeof data[filterKey] === 'number') {
    if (data[filterKey].toString().length === 1) {
      if (filterKey === 'Seed Price per Pound') {
        return (
          <div style={lightBG}>
            <RenderSeedPriceIcons val={data['Seed Price per Pound']} />
          </div>
        );
      } return <div style={lightBG}>{getRating(data[filterKey])}</div>;
    }
    return (
      <div style={lightBG}>
        <Typography variant="body2">{data[filterKey]}</Typography>
      </div>
    );
  }
  if (filterKey === 'Frost Seeding' || (filterKey === 'Can Aerial Seed?' || filterKey === 'Aerial Seeding')) {
    return (
      <div style={lightBG}>
        <Typography data={data} variant="body2" filterKey={filterKey === 'Frost Seeding' ? filterKey : 'Aerial Seeding'}>
          {data[filterKey] ? 'Yes' : 'N/A'}
        </Typography>
      </div>
    );
  } if (data[filterKey]) {
    return (
      <div style={lightBG}>
        <Typography variant="body2">{data[filterKey].toString()}</Typography>
      </div>
    );
  }
  return <div />;
};

export default RenderRelevantData;
