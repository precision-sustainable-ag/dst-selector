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
import { PSAButton } from 'shared-react-components/src';
import MyCoverCropComparisonTable from './MyCoverCropComparison/MyCoverCropComparisonTable';
import { activateSpeicesSelectorTile } from '../../reduxStore/sharedSlice';
import pirschAnalytics from '../../shared/analytics';

const MyCoverCropList = ({ from }) => {
  const dispatchRedux = useDispatch();
  const history = useHistory();
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
             buttonType=""
             onClick={
              from === 'myCoverCropListStatic' ? redirectToExplorer : redirectToSpeciesSelector
            }
             title="Add Crops"
           />
         </Typography>
        ) : (
          <Box flexDirection="column" display="flex" height="100%" mt={2}>
            <Grid container spacing={2}>
              <MyCoverCropComparisonTable />
            </Grid>
          </Box>
        )}
    </>
  );
};

export default MyCoverCropList;
