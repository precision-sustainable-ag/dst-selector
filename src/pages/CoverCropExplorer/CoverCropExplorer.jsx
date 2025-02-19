/*
  This file contains the CoverCropExplorer component
  The CoverCropExplorer component allows users to look at a list of all the cover crops for their zone
  styled from from CustomStyles in ../../../shared/constants
*/

import {
  Grid,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ExplorerCardView from './ExplorerCardView/ExplorerCardView';
import CropSidebar from '../CropSidebar/CropSidebar';
import { updateRegion, updateStateInfo } from '../../reduxStore/mapSlice';
import pirschAnalytics from '../../shared/analytics';
import SkipContent from '../../components/SkipContent/SkipContent';

const CoverCropExplorer = () => {
  const history = useHistory();
  const dispatchRedux = useDispatch();
  const activeCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.activeCropIds);
  const cropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cropData);
  const consentRedux = useSelector((stateRedux) => stateRedux.userData.consent);
  const [updatedActiveCropData, setUpdatedActiveCropData] = useState([]);
  const stateIdRedux = useSelector((stateRedux) => stateRedux.mapData.stateId);

  // open crop if url exists
  // eslint-disable-next-line
  const urlCrop = window.location.search.match(/crop=([^\^]+)/);
  // eslint-disable-next-line
  const urlParamStateId = window.location.search.match(/state=([^\^]+)/); // for automating Information Sheet PDFs
  // eslint-disable-next-line
  const urlRegionId = window.location.search.match(/region=([^\^]+)/); // for automating Information Sheet PDFs

  useEffect(() => {
    const filteredActiveCropData = cropDataRedux.filter((crop) => activeCropIdsRedux.includes(crop.id))?.filter((a) => !a.inactive);
    setUpdatedActiveCropData(filteredActiveCropData);
    if (urlCrop && urlParamStateId && urlRegionId) {
      localStorage.setItem('stateId', urlParamStateId[1]);
      dispatchRedux(updateStateInfo({
        stateLabel: null,
        stateId: urlParamStateId[1],
        councilShorthand: null,
        councilLabel: null,
      }));
      localStorage.setItem('regionId', urlRegionId[1]);
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
  }, [activeCropIdsRedux]);

  useEffect(() => {
    pirschAnalytics('Visited Page', { meta: { visited: 'Browse Cover Crops' } });
  }, [consentRedux]);

  useEffect(() => {
    if ((stateIdRedux === null) && !urlParamStateId) {
      history.push('/');
    }
  }, [stateIdRedux]);

  return (
    <Grid container spacing={3}>
      <Grid item xl={3} lg={4} md={4} sm={12} xs={12}>

        <SkipContent
          href="#crop-list"
          text="Skip to crop list"
          sx={{
            '&:focus': {
              top: '16px',
              transition: 'top 225ms cubic-bezier(0, 0, 0.2, 1)',
            },
          }}
        />

        <CropSidebar
          from="explorer"
          activeCropData={activeCropIdsRedux?.length > 0 ? cropDataRedux.filter((crop) => activeCropIdsRedux.includes(crop.id)) : cropDataRedux}
          listView
        />
      </Grid>

      <SkipContent
        href="#page-footer"
        text="Skip to bottom"
        sx={{
          left: 'auto',
          right: '16px',
          '&:focus': {
            top: '16px',
            transition: 'top 225ms cubic-bezier(0, 0, 0.2, 1)',
          },
        }}
      />

      <Grid item xl={9} lg={8} md={8} sm={12} xs={12} id="crop-list">
        <ExplorerCardView
          activeCropData={updatedActiveCropData}
        />
      </Grid>
    </Grid>
  );
};

export default CoverCropExplorer;
