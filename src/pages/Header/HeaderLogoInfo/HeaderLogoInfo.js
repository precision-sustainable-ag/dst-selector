import { Typography } from '@mui/material';
import React, { useContext } from 'react';
import { Context } from '../../../store/Store';
import '../../../styles/header.scss';
import DateComponent from '../DateComponent/DateComponent';
import ForecastComponent from '../ForecastComponent/ForecastComponent';

const HeaderLogoInfo = () => {
  const { dispatch } = useContext(Context);
  return (
    <div className="row">
      <div className="col-lg-2 col-12" role="button">
        <button
          type="button"
          onClick={() => {
            dispatch({
              type: 'UPDATE_PROGRESS',
              data: {
                type: 'HOME',
              },
            });
          }}
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
    </div>
  );
};

export default HeaderLogoInfo;
