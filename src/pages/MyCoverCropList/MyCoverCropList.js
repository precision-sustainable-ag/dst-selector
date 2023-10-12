/* eslint-disable max-len */
/* eslint-disable react/no-unstable-nested-components */
/*
  Contains the list of crops that the user selected
  redirectToExplorer is used to handle sending user back to the home page
  TopBar contains the blue bar for adding crops
*/

import {
  Button, Typography, Grid, Box,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ReactGA from 'react-ga';
import MyCoverCropComparisonTable from './MyCoverCropComparison/MyCoverCropComparisonTable';
import MyCoverCropCards from './MyCoverCropCards/MyCoverCropCards';
import { activateSpeicesSelectorTile } from '../../reduxStore/sharedSlice';

const MyCoverCropList = ({ comparisonView, from }) => {
  const dispatchRedux = useDispatch();
  const comparison = comparisonView || false;
  const history = useHistory();
  const [updatedSelectedCrops, setUpdatedSelectedCrops] = useState([]);
  const activeCropDataRedux = useSelector((stateRedux) => stateRedux.cropData.activeCropData);
  const cropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cropData);
  const stateLabelRedux = useSelector((stateRedux) => stateRedux.mapData.stateLabel);
  const selectedCropsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCrops);
  const consentRedux = useSelector((stateRedux) => stateRedux.userData.consent);
  // const { selectedCrops } = state;

  // TODO: Update SelectedCropsRedux

  useEffect(() => {
    setUpdatedSelectedCrops(selectedCropsRedux);
  }, [selectedCropsRedux]);

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
    if (consentRedux === true) {
      ReactGA.initialize('UA-181903489-1');

      ReactGA.pageview('cover crop list');
    }
  }, [consentRedux]);

  const TopBar = ({ view }) => (
    <div className="row">
      <div
        className="col-12 myCoverCropsBlueBar"
        style={{
          backgroundColor: '#35999b',
          height: '40px',
          borderTopLeftRadius: '5px',
          borderTopRightRadius: '5px',
        }}
      >
        <div className="row">
          {view ? (
            <div className="col-8">
              <Button
                style={{ color: 'white' }}
                onClick={
                    from === 'myCoverCropListStatic'
                      ? redirectToExplorer
                      : redirectToSpeciesSelector
                  }
              >
                <Add />
                {' '}
                <span className="pl-2">ADD A CROP</span>
              </Button>
            </div>
          ) : (
            <div className="col-8">
              <Button
                style={{ color: 'white' }}
                onClick={
                    from === 'myCoverCropListStatic'
                      ? redirectToExplorer
                      : redirectToSpeciesSelector
                  }
              >
                <Add />
                {' '}
                <span className="pl-2">ADD A CROP</span>
              </Button>
            </div>
          )}

          <div className="col-6" />
        </div>
      </div>
    </div>
  );
  return (
    <div className="container-fluid">
      {/* eslint-disable-next-line no-nested-ternary */}
      {updatedSelectedCrops.length > 0
       && updatedSelectedCrops.length === 0 ? (
         <Typography variant="body1">
           Your list is empty.
           {' '}
           <Button
             onClick={
              from === 'myCoverCropListStatic' ? redirectToExplorer : redirectToSpeciesSelector
            }
           >
             Add Crops
           </Button>
         </Typography>
        ) : comparison ? (
          <>
            <TopBar view={comparison} />
            <Box flexDirection="column" display="flex" height="100%">
              <Grid container spacing={2} mt={1}>
                <MyCoverCropComparisonTable />
              </Grid>
            </Box>

          </>
        ) : (
          <>
            <TopBar view={comparison} />
            <Grid container spacing={2} mt={1}>
              {cropDataRedux.filter((crop) => activeCropDataRedux.includes(crop.id)).filter((crop) => selectedCropsRedux.includes(crop.id)).map((crop, index) => (
                <Grid item>
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
          </>
        )}
    </div>
  );
};

export default MyCoverCropList;
