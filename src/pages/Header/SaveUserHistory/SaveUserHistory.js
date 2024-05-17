import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthToken } from '../../../shared/authToken';
import { saveHistory, loadHistory } from '../../../shared/api';
import {
  setHistoryState, setSelectedHistory, historyState, setUserHistoryList,
} from '../../../reduxStore/userSlice';

// FIXME: temporary use a button to save user history,
// might change to a dummy component to avoid performance issues(need to import all redux states)
const SaveUserHistory = ({ pathname }) => {
  const dispatchRedux = useDispatch();

  const consentRedux = useSelector((stateRedux) => stateRedux.userData.consent);
  const fieldRedux = useSelector((stateRedux) => stateRedux.userData.field);
  const selectedHistoryRedux = useSelector((stateRedux) => stateRedux.userData.selectedHistory);
  const historyStateRedux = useSelector((stateRedux) => stateRedux.userData.historyState);

  const cropDataRedux = useSelector((stateRedux) => stateRedux.cropData);
  const mapDataRedux = useSelector((stateRedux) => stateRedux.mapData);
  const weatherDataRedux = useSelector((stateRedux) => stateRedux.weatherData);
  const goalsDataRedux = useSelector((stateRedux) => stateRedux.goalsData);
  const sharedDataRedux = useSelector((stateRedux) => stateRedux.sharedData);
  const soilDataRedux = useSelector((stateRedux) => stateRedux.soilData);
  const addressDataRedux = useSelector((stateRedux) => stateRedux.addressData);

  const { progress: progressRedux } = sharedDataRedux;

  const handleSave = () => {
    const token = getAuthToken();
    // remove cropData from cropDataRedux
    const { cropData: cropsData, ...cropData } = cropDataRedux;
    // remove regions from mapDataRedux
    const { regions, ...mapData } = mapDataRedux;
    const data = {
      cropData,
      mapData,
      weatherData: weatherDataRedux,
      goalsData: goalsDataRedux,
      sharedData: sharedDataRedux,
      soilData: soilDataRedux,
      userData: { consent: consentRedux, field: fieldRedux },
      addressData: addressDataRedux,
    };
    const { label, id } = selectedHistoryRedux;
    saveHistory(label, data, token, id).then((res) => {
      // console.log('saved history', res);
      dispatchRedux(setHistoryState(historyState.imported));
      // set history id
      dispatchRedux(setSelectedHistory({ ...selectedHistoryRedux, id: res.data.id }));
      // if id is null, it means a new history record is created, load history list again to get the new history
      if (!id) {
        // eslint-disable-next-line no-shadow
        loadHistory(token).then((res) => dispatchRedux(setUserHistoryList(res)));
      }
    });
  };

  // useEffect to save user history
  useEffect(() => {
    // not saving history when switch from landing to location since it'll not let location selection available
    if (historyStateRedux !== historyState.none && progressRedux !== 1) {
      console.log('save history');
      handleSave();
    }
  }, [progressRedux, pathname]);

  return (
    <Button onClick={handleSave}>save history</Button>
  );
};
export default SaveUserHistory;
