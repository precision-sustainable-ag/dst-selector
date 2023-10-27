/*
  Contains the data listed in InformationSheetContent
  RenderCats renders the categories
*/

import { Grid, Typography } from '@mui/material';
import React, {
  useEffect, useMemo, useState,
} from 'react';

const DictionaryContent = ({ dictData = [{}], from = '' }) => {
  const [groupedCats, setGroupedCats] = useState({});

  const groupBy = (arr, property) => arr.reduce((acc, cur) => {
    acc[cur[property]] = [...(acc[cur[property]] || []), cur];
    return acc;
  }, {});

  const allCats = useMemo(() => dictData.filter(
    (dict) => dict['Information Sheet'] === true || dict['Infromation Sheet'] === true,
  ), [dictData]);

  useEffect(() => {
    const groupedCategories = groupBy(allCats, 'Category');
    setGroupedCats(groupedCategories);
  }, [allCats]);

  const RenderCats = () => Object.keys(groupedCats).map((key, index) => (
    <Grid container key={index} xs={12} sm={12} md={12} lg={12} xl={12}>
      <Typography
        variant="h6"
        style={from === 'help' ? { border: '0px', borderBottom: '1px solid gray', width: '100%' } : { width: '100%' }}
        ml={2}
        mr={4}
      >
        {key}
      </Typography>
      {groupedCats[key].map((innerCat, index2) => {
        if (from === 'help') {
          if (!innerCat.Variable.startsWith('Notes')) {
            return (
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Typography
                  variant="body1"
                  ml={4}
                  mt={3}
                  key={index2}
                >
                  <b>
                    {innerCat.Variable}
                    :
                  </b>
                  {' '}
                  {innerCat.Description}
                </Typography>
              </Grid>
            );
          }
        }
        return (
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Typography
              variant="body1"
              key={index2}
              ml={4}
              mt={3}
            >
              <b>
                {innerCat.Variable}
                :
              </b>
              {' '}
              {innerCat.Description}
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  ));

  return (
    Object.keys(groupedCats).length > 0 ? <RenderCats /> : null
  );
};

export default DictionaryContent;
