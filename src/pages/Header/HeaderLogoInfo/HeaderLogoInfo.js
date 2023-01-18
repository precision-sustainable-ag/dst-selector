import {
  Dialog, DialogActions, DialogContent, Typography,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BinaryButton } from '../../../shared/constants';
import { Context } from '../../../store/Store';
import '../../../styles/header.scss';
import DateComponent from '../DateComponent/DateComponent';
import ForecastComponent from '../ForecastComponent/ForecastComponent';

const HeaderLogoInfo = () => {
  const { state, dispatch } = useContext(Context);
  const history = useHistory();
  const [handleConfirm, setHandleConfirm] = useState(false);
  const defaultMarkers = [[40.78489145, -74.80733626930342]];
  const { selectedCrops } = state;

  const logoClick = (clearMyList = false) => {
    if (clearMyList) {
      dispatch({
        type: 'RESET',
        data: {
          markers: defaultMarkers,
          selectedCrops: [],
        },
      });
      history.replace('/');
    }
    setHandleConfirm(false);
  };

  return (
    <div className="row">
      {state.council === 'Northeast'
          && (
          <div className="col-lg-2 col-12" role="button">
            <button
              type="button"
              onClick={selectedCrops.length > 0 ? () => setHandleConfirm(true) : () => logoClick(true)}
            >

              <img
                className="img-fluid"
                src="/images/neccc_wide_logo_color_web.jpg"
                alt="NECCC Logo"
                width="100%"
                onContextMenu={() => false}
                style={{ cursor: 'pointer' }}
              />

            </button>
          </div>
          )}
      <div className="col-12 col-lg-10 col-sm-12 row">
        <div className="col-lg-4 col-12 d-flex align-items-center text-left">
          <div>
            <Typography variant="body1" className="font-weight-bold">
              Cover Crop Decision Support Tools
            </Typography>

            <Typography variant="body1">
              <DateComponent />
            </Typography>
          </div>
        </div>
        <div className="col-lg-8 col-12 d-flex align-items-center">
          <div>
            <ForecastComponent />
          </div>
        </div>
      </div>
      <Dialog onClose={() => setHandleConfirm(false)} open={handleConfirm}>
        <DialogContent dividers>
          <Typography variant="body1">
            You will need to clear your My Cover Crop List to continue.  Would you like to continue?
          </Typography>
        </DialogContent>
        <DialogActions>
          <BinaryButton
            action={logoClick}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HeaderLogoInfo;
