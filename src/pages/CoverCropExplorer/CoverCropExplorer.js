/*
  This file contains the CoverCropExplorer component
  The CoverCropExplorer component allows users to look at a list of all the cover crops for their zone
  styled from from CustomStyles in ../../../shared/constants
*/

import { Grid, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { Context } from '../../store/Store';
import Header from '../Header/Header';
import ExplorerCardView from './ExplorerCardView/ExplorerCardView';
import ConsentModal from './ConsentModal/ConsentModal';
import CropSidebar from '../CropSidebar/CropSidebar';

const CoverCropExplorer = () => {
  const { state } = useContext(Context);
  const section = window.location.href.includes('selector') ? 'selector' : 'explorer';
  const sfilters = state[section];
  const [updatedActiveCropData, setUpdatedActiveCropData] = useState([]);
  const { activeCropData } = state;

  useEffect(() => {
    async function getData() {
      await fetch('https://develop.covercrop-data.org/crops')
        .then((res) => res.json())
        .then((data) => {
          const filteredActiveCropData = activeCropData.filter((a) => !a.inactive);
          if (data.data.length > 0 && filteredActiveCropData.length > 0) {
            filteredActiveCropData.forEach((crop) => {
              data.data.forEach((thumb) => {
                if (thumb.label === crop.fields['Cover Crop Name']) {
                  crop.fields['Image Data']['Key Thumbnail'] = thumb.thumbnail.src;
                  crop.fields['Image Data'].id = thumb.id;
                }
              });
            });
          }

          setUpdatedActiveCropData(filteredActiveCropData);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err.message);
        });
    }

    getData();
  }, [activeCropData]);

  useEffect(() => {
    if (state.consent === true) {
      ReactGA.initialize('UA-181903489-1');

      ReactGA.pageview('cover crop explorer');
    }
  }, [state.consent]);

  useEffect(() => {
    document.title = 'Cover Crop Explorer';
  }, []);

  return (
    <div className="contentWrapper">
      <ConsentModal consent={state.consent} />
      <Header logo="neccc_wide_logo_color_web.jpg" />
      <div className="container-fluid mt-4 mb-4">
        <div className="row mt-3">
          <div className="col-md-12 col-lg-3 col-xl-2 col-12">
            <CropSidebar
              from="explorer"
              activeCropData={activeCropData.length > 0 ? activeCropData : state.cropData}
              isListView
            />
          </div>
          <div className="col-md-12 col-lg-9 col-xl-10 col-12">
            {sfilters.zone === '' || sfilters.zone === undefined ? (
              <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                  <Typography variant="h5" align="center">
                    Please choose a zone from the sidebar
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <ExplorerCardView
                cropData={state.cropData}
                activeCropData={updatedActiveCropData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverCropExplorer;
