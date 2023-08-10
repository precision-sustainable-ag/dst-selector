import {
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import React, {
  useContext,
} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BinaryButton } from '../../shared/constants';
import { Context } from '../../store/Store';
import { reset } from '../../reduxStore/store';

const MyCoverCropReset = ({ handleConfirm, setHandleConfirm }) => {
  const { dispatch } = useContext(Context);
  const dispatchRedux = useDispatch();
  const history = useHistory();
  const defaultMarkers = [[40.78489145, -74.80733626930342]];

  const handleConfirmChoice = (clearMyList = false) => {
    if (clearMyList !== null) {
      if (clearMyList) {
        history.push('/');
        dispatch({
          type: 'RESET',
          data: {
            markers: defaultMarkers,
            selectedCrops: [],
          },
        });
        dispatchRedux(reset());
      // setSpeciesSelectorActivationFlag();
      } else {
        history.goBack();
        if (window.location.pathname !== '/') {
          history.push('/');
        }
        setHandleConfirm(false);
      }
    }
    setHandleConfirm(false);
  };

  return (
    <div className="container-fluid mt-5">

      <Dialog onClose={() => setHandleConfirm(false)} open={handleConfirm}>
        <DialogContent dividers>
          <Typography variant="body1">
            In order to continue you will need to reset the My Cover Crop List.  Would you like to continue?
          </Typography>
        </DialogContent>
        <DialogActions>
          <BinaryButton
            action={handleConfirmChoice}
          />
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default MyCoverCropReset;
