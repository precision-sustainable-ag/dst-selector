import { Button } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthToken } from '../../../shared/authToken';
import { saveHistory, loadHistory } from '../../../shared/api';
import {
  setHistoryState, setSelectedHistory, historyState, setUserHistoryList,
} from '../../../reduxStore/userSlice';

// FIXME: temporary use a button to save user history,
// might change to a dummy component to avoid performance issues(need to import all redux states)
const SaveUserHistory = () => {
  const dispatchRedux = useDispatch();

  const fieldRedux = useSelector((stateRedux) => stateRedux.userData.field);
  const mapDataRedux = useSelector((stateRedux) => stateRedux.mapData);
  const addressDataRedux = useSelector((stateRedux) => stateRedux.addressData);
  const selectedHistoryRedux = useSelector((stateRedux) => stateRedux.userData.selectedHistory);
  const consentRedux = useSelector((stateRedux) => stateRedux.userData.consent);

  const handleSave = () => {
    const token = getAuthToken();
    // remove regions from mapDataRedux
    const { regions, ...mapData } = mapDataRedux;
    const data = {
      mapData,
      userData: { consent: consentRedux },
      addressData: addressDataRedux,
      field: fieldRedux,
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
  return (
    <Button onClick={handleSave}>save history</Button>
  );
};
export default SaveUserHistory;
