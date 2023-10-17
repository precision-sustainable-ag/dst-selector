import {
  Typography, Box, Grid,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { reset } from '../../../reduxStore/store';
import '../../../styles/header.scss';
import DateComponent from '../DateComponent/DateComponent';
import { setMyCoverCropReset } from '../../../reduxStore/sharedSlice';

const HeaderLogoInfo = () => {
  const dispatchRedux = useDispatch();
  const history = useHistory();
  const selectedCropsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCrops);
  const councilLabelRedux = useSelector((stateRedux) => stateRedux.mapData.councilLabel);

  const handleClick = () => {
    if (selectedCropsRedux.length === 0) {
      dispatchRedux(reset());
      history.replace('/');
    } else {
      dispatchRedux(setMyCoverCropReset(true, false));
    }
  };

  useEffect(() => {
    let imageSrc;
    const favicon = document.getElementById('favicon');
    if (councilLabelRedux === 'Northeast Cover Crop Council') {
      imageSrc = '../images/neccc_wide_logo_color_web.jpg';
      favicon.href = 'favicons/neccc-favicon.ico';
    } else if (councilLabelRedux === 'Southern Cover Crop Council') {
      imageSrc = '../images/sccc_logo.png';
      favicon.href = 'favicons/sccc-favicon.ico';
    } else if (councilLabelRedux === 'Midwest Cover Crop Council') {
      imageSrc = '../images/mwccc_logo.png';
      favicon.href = 'favicons/mccc-favicon.ico';
    } else if (councilLabelRedux === 'Western Cover Crop Council') {
      imageSrc = '../images/wccc_logo.png';
      favicon.href = 'favicons/psa-favicon.ico';
    } else {
      imageSrc = '../images/PSAlogo-text.png';
      favicon.href = 'favicons/psa-favicon.ico';
    }

    const imageElement = document.getElementById('logoImage');
    if (imageElement) {
      imageElement.src = imageSrc;
    }
  }, [councilLabelRedux]);

  return (
    <Grid item container alignItems="center" sx={{ height: '150px' }} mb={2}>

      <Grid item lg={1} md={1} sm={1} xs={1}>
        <Box
          padding={0}
          margin={0}
          component="div"
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            position: 'relative',
            height: 'auto',
            marginRight: '10px',
            '@media (max-width: 768px)': {
              width: '120px', /* small screens */
            },
            '@media (min-width: 769px) and (max-width: 1024px)': {
              width: '120px', /*  medium screens */
            },
            '@media (min-width: 1025px)': {
              width: '200px', /* large screens */
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

      <Grid item lg={4} md={4} sm={6} xs={12} sx={{ marginLeft: '120px' }}>
        <Typography variant="h5">
          Cover Crop Decision Support Tools
        </Typography>
        <Typography variant="body1">
          <DateComponent />
        </Typography>
      </Grid>
    </Grid>
  );
};

export default HeaderLogoInfo;
