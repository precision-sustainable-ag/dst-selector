import moment from 'moment';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { updateCropData } from '../reduxStore/cropSlice';
import { setAjaxInProgress } from '../reduxStore/sharedSlice';
import { callCoverCropApi, cropDataFormatter } from '../shared/constants';

const useCropLoader = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);
  const stateIdRedux = useSelector((stateRedux) => stateRedux.mapData.stateId);
  const queryStringRedux = useSelector((stateRedux) => stateRedux.sharedData.queryString);
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const cashCropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cashCropData);
  const cropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cropData);

  const lastCropQueryRef = useRef(null);

  const isExplorer = location.pathname.startsWith('/explorer');

  // For WA and Ecoregion 7
  const hasAdditionalSoilDrainage =
    councilShorthandRedux === 'WCCC' &&
    queryStringRedux &&
    queryStringRedux.includes('regions=51') &&
    queryStringRedux.includes('regions=1302');

  const currentCropQuery = `${stateIdRedux}?${queryStringRedux}${
    hasAdditionalSoilDrainage ? '&additional_soil_drainage=true' : ''
  }`;

  // reset query ref on reset
  useEffect(() => {
    if (!stateIdRedux || !queryStringRedux) {
      lastCropQueryRef.current = null;
    }
  }, [stateIdRedux, queryStringRedux]);

  // fetch crop data in background when progress >= 2 or in Explorer
  useEffect(() => {
    if ((progressRedux >= 2 || isExplorer) && stateIdRedux && queryStringRedux) {
      if (lastCropQueryRef.current === currentCropQuery) return;
      // record last crop query string, prevent duplicate api calls
      lastCropQueryRef.current = currentCropQuery;

      dispatch(setAjaxInProgress(true));
      callCoverCropApi(
        `https://${apiBaseUrlRedux}.covercrop-selector.org/v1/states/${stateIdRedux}/crops?minimal=true&${queryStringRedux}` +
          `${hasAdditionalSoilDrainage ? '&additional_soil_drainage=true' : ''}`,
      )
        .then((data) => {
          const { startDate, endDate } = cashCropDataRedux.dateRange;
          const start = startDate ? moment(startDate).format('MM/DD') : '';
          const end = endDate ? moment(endDate).format('MM/DD') : '';
          const formattedData = cropDataFormatter(data.data, start, end);
          dispatch(updateCropData(formattedData));
          dispatch(setAjaxInProgress(false));
        })
        .catch(() => {
          dispatch(setAjaxInProgress(false));
        });
    }
  }, [
    progressRedux,
    isExplorer,
    stateIdRedux,
    queryStringRedux,
    currentCropQuery,
    apiBaseUrlRedux,
    hasAdditionalSoilDrainage,
    cashCropDataRedux,
    dispatch,
  ]);

  // Re-format cash crop dates in memory when cash crop dates change
  // biome-ignore lint/correctness/useExhaustiveDependencies: <cropDataRedux omitted to prevent infinite dispatch loop>
  useEffect(() => {
    if (cropDataRedux?.length > 0) {
      const { startDate, endDate } = cashCropDataRedux.dateRange;
      const start = startDate ? moment(startDate).format('MM/DD') : '';
      const end = endDate ? moment(endDate).format('MM/DD') : '';
      const formattedData = cropDataFormatter(cropDataRedux, start, end);
      dispatch(updateCropData(formattedData));
    }
  }, [cashCropDataRedux, dispatch]);
};

export default useCropLoader;
