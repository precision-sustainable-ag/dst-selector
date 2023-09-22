/*
  This file contains the CoverCropExplorer component
  The CoverCropExplorer component allows users to look at a list of all the cover crops for their zone
  styled from from CustomStyles in ../../../shared/constants
*/

import {
  Grid, Typography,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactGA from 'react-ga';
import ExplorerCardView from './ExplorerCardView/ExplorerCardView';
import ConsentModal from './ConsentModal/ConsentModal';
import CropSidebar from '../CropSidebar/CropSidebar';
import { updateRegion, updateStateInfo } from '../../reduxStore/mapSlice';

const CoverCropExplorer = () => {
  const history = useHistory();
  const dispatchRedux = useDispatch();
  const filterStateRedux = useSelector((stateRedux) => stateRedux.filterData);
  const section = window.location.href.includes('species-selector') ? 'selector' : 'explorer';
  const sfilters = filterStateRedux[section];
  const activeCropDataRedux = useSelector((stateRedux) => stateRedux.cropData.activeCropData);
  const cropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cropData);
  const consentRedux = useSelector((stateRedux) => stateRedux.userData.consent);
  const [updatedActiveCropData, setUpdatedActiveCropData] = useState([]);
  // const { activeCropData } = state;
  const stateIdRedux = useSelector((stateRedux) => stateRedux.mapData.stateId);

  // open crop if url exists
  // eslint-disable-next-line
  const urlCrop = window.location.search.match(/crop=([^\^]+)/);
  // eslint-disable-next-line
  const urlParamStateId = window.location.search.match(/state=([^\^]+)/); // for automating Information Sheet PDFs
  // eslint-disable-next-line
  const urlRegionId = window.location.search.match(/region=([^\^]+)/); // for automating Information Sheet PDFs

  useEffect(() => {
    const filteredActiveCropData = activeCropDataRedux?.filter((a) => !a.inactive);
    setUpdatedActiveCropData(filteredActiveCropData);

    if (urlCrop && urlParamStateId && urlRegionId) {
      dispatchRedux(updateStateInfo({
        stateLabel: null,
        stateId: urlParamStateId[1],
        councilShorthand: null,
        councilLabel: null,
      }));
      dispatchRedux(updateRegion({
        regionId: urlRegionId[1],
      }));

      // eslint-disable-next-line
      for (const o of [...document.querySelectorAll('.MuiCardContent-root')]) {
        if (o.textContent.includes(decodeURI(urlCrop[1]))) {
          o.querySelector('.MuiButtonBase-root').click();
          break;
        }
      }
    }
  }, [activeCropDataRedux]);

  useEffect(() => {
    if (consentRedux === true) {
      ReactGA.initialize('UA-181903489-1');

      ReactGA.pageview('cover crop explorer');
    }
  }, [consentRedux]);

  useEffect(() => {
    if ((stateIdRedux === null) && !urlParamStateId) {
      history.push('/');
    }
  }, [stateIdRedux]);

  return (
    <>
      <ConsentModal />
      <div className="container-fluid mt-4 mb-4">
        <div className="row mt-3">
          <div className="col-md-12 col-lg-3 col-xl-2 col-12">
            <CropSidebar
              from="explorer"
              activeCropData={activeCropDataRedux?.length > 0 ? activeCropDataRedux : cropDataRedux}
              isListView
            />
          </div>
          <div className="col-md-12 col-lg-8 col-xl-9 col-10">
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
                cropData={cropDataRedux}
                activeCropData={updatedActiveCropData}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CoverCropExplorer;
