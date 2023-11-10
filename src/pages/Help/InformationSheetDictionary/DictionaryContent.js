/*
  Contains the data listed in InformationSheetContent
  RenderCats renders the categories
*/

import { Grid, Typography } from '@mui/material';
import React, {
// useEffect, useMemo, useState,
} from 'react';

const DictionaryContent = ({ dictData = [{}], from = '' }) => {
  const getGridItem = (att, index2) => {
    if (att.description?.length > 0) {
      return (
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Typography
            variant="body1"
            key={index2}
          >
            <b>
              {att.label}
              :
            </b>
            {' '}
            {att.description}
          </Typography>
        </Grid>
      );
    }
    return (<div />);
  };

  const RenderCats = () => dictData.map((catData, index) => (
    <Grid container key={index} xs={12} sm={12} md={12} lg={12} xl={12}>
      <Typography
        variant="h6"
        style={from === 'help' ? { border: '0px', borderBottom: '1px solid gray', width: '100%' } : { width: '100%' }}
        ml={2}
        mr={4}
      >
        {catData.label}
      </Typography>
      {catData.attributes.map((att, index2) => (
        getGridItem(att, index2)
      ))}
    </Grid>
  ));

  return (
    dictData.length > 0 ? <RenderCats /> : ''
  );
};

export default DictionaryContent;
