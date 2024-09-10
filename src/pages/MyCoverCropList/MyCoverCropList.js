/* eslint-disable max-len */
/* eslint-disable react/no-unstable-nested-components */
/*
  Contains the list of crops that the user selected
  redirectToExplorer is used to handle sending user back to the home page
  TopBar contains the blue bar for adding crops
*/

import {
  Typography, Grid, Box,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MyCoverCropComparisonTable from './MyCoverCropComparison/MyCoverCropComparisonTable';
import MyCoverCropCards from './MyCoverCropCards/MyCoverCropCards';
import { activateSpeicesSelectorTile } from '../../reduxStore/sharedSlice';
import pirschAnalytics from '../../shared/analytics';
import PSAButton from '../../components/PSAComponents/PSAButton';

const MyCoverCropList = ({ comparisonView, from }) => {
  const dispatchRedux = useDispatch();
  const comparison = comparisonView || false;
  const history = useHistory();
  const cropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cropData);
  const stateLabelRedux = useSelector((stateRedux) => stateRedux.mapData.stateLabel);
  const selectedCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCropIds);

  useEffect(() => {
    if (stateLabelRedux === null) {
      history.push('/');
    }
  }, [stateLabelRedux]);

  const redirectToSpeciesSelector = () => {
    history.replace('/');
    dispatchRedux(activateSpeicesSelectorTile({ speciesSelectorActivationFlag: true, myCoverCropActivationFlag: false }));
  };

  const redirectToExplorer = () => {
    history.replace('/');
  };

  useEffect(() => {
    pirschAnalytics('Visited Page', { meta: { visited: 'My Cover Crop List' } });
  }, []);

  return (
    <>
      {/* eslint-disable-next-line no-nested-ternary */}
      {selectedCropIdsRedux.length > 0
       && selectedCropIdsRedux.length === 0 ? (
         <Typography variant="body1">
           Your list is empty.
           {' '}
           <PSAButton
             onClick={
              from === 'myCoverCropListStatic' ? redirectToExplorer : redirectToSpeciesSelector
            }
             data="Add Crops"
           />
         </Typography>
        ) : comparison ? (
          <Box flexDirection="column" display="flex" height="100%" mt={1}>
            <Grid container spacing={2}>
              <MyCoverCropComparisonTable />
            </Grid>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {cropDataRedux.filter((crop) => selectedCropIdsRedux.includes(crop.id)).map((crop, index) => (
              <Grid item key={index}>
                <MyCoverCropCards
                  key={index}
                  cardNo={index + 1}
                  crop={crop}
                  btnId={crop.id}
                  itemNo={index}
                />
              </Grid>
            ))}
          </Grid>
        )}
    </>
  );
};

export default MyCoverCropList;
