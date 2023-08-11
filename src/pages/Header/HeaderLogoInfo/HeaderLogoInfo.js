import {
  Typography, Box, Grid,
} from '@mui/material';
import React, { useContext, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { reset } from '../../../reduxStore/store';
import { Context } from '../../../store/Store';
import '../../../styles/header.scss';
import DateComponent from '../DateComponent/DateComponent';
import ForecastComponent from '../ForecastComponent/ForecastComponent';
import MyCoverCropReset from '../../../components/MyCoverCropReset/MyCoverCropReset';

const HeaderLogoInfo = () => {
  const { dispatch } = useContext(Context);
  const dispatchRedux = useDispatch();
  const history = useHistory();
  const selectedCropsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCrops);
  const [handleConfirm, setHandleConfirm] = useState(false);
  const defaultMarkers = [[40.78489145, -74.80733626930342]];
  const councilLabelRedux = useSelector((stateRedux) => stateRedux.mapData.councilLabel);

  const handleClick = () => {
    if (selectedCropsRedux.length === 0) {
      if (window.location.pathname === '/') {
      // if no cover crops selected, update state to return to the 1st progress
        dispatch({
          type: 'RESET',
          data: {
            markers: defaultMarkers,
            selectedCrops: [],
          },
        });
        dispatchRedux(reset());
      } else history.replace('/');
    } else {
      setHandleConfirm(true);
    }
  };

  useEffect(() => {
    let imageSrc;
    if (councilLabelRedux === 'Northeast Cover Crop Council') {
      imageSrc = '../images/neccc_wide_logo_color_web.jpg';
    } else if (councilLabelRedux === 'Southern Cover Crop Council') {
      imageSrc = '../images/sccc_logo.png';
    } else if (councilLabelRedux === 'Midwest Cover Crop Council') {
      imageSrc = '../images/mwccc_logo.png';
    } else if (councilLabelRedux === 'Western Cover Crop Council') {
      imageSrc = '../images/wccc_logo.png';
    } else {
      imageSrc = '../images/whitebg.png';
    }

    const imageElement = document.getElementById('logoImage');
    if (imageElement) {
      imageElement.src = imageSrc;
    }
  }, [councilLabelRedux]);

  return (
    <Grid lg={12} item container alignItems="center" sx={{ height: '150px', padding: '0', margin: '0' }}>

      <Grid item lg={1} md={1} sm={12} xs={12}>

        <Box
          padding={0}
          margin={0}
          component="div"
          sx={{
            position: 'relative',
            width: '100px',
            height: 'auto',
            marginRight: '10px',
            '@media (max-width: 768px)': {
              width: '80px', /* small screens */
            },
            '@media (min-width: 769px) and (max-width: 1024px)': {
              width: '120px', /*  medium screens */
            },
            '@media (min-width: 1025px)': {
              width: '160px', /* large screens */
            },
          }}
        >
          <button
            type="button"
            onClick={handleClick}
            style={{
              backgroundColor: 'white',
              border: 'none',
            }}
          >
            <img
              id="logoImage" // id to the img element to reference it in useEffect
              className="img-fluid"
              src="../images/neccc_wide_logo_color_web.jpg"
              // alt="NECCC Logo"
              width="150%"
              alt=""
              onContextMenu={() => false}
              style={{ cursor: 'pointer' }}
            />
          </button>
        </Box>
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12} sx={{ marginLeft: '80px' }}>
        <div className="d-flex align-items-center text-left">
          <div>
            <Typography variant="body1" className="font-weight-bold">
              Cover Crop Decision Support Tools
            </Typography>
            <Typography variant="body1">
              <DateComponent />
            </Typography>
          </div>
        </div>
      </Grid>

      <Grid item lg={3} md={4} sm={12} xs={12}>
        <div className="d-flex align-items-center">
          <div>
            <ForecastComponent />
          </div>
        </div>
      </Grid>

      <MyCoverCropReset handleConfirm={handleConfirm} setHandleConfirm={setHandleConfirm} goBack={false} returnToHome />
    </Grid>
  );
};

export default HeaderLogoInfo;
