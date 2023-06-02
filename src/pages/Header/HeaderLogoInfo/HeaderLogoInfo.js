import {
  Dialog, DialogActions, DialogContent, Typography, Box, Grid
} from '@mui/material';
import React, { useContext, useState, useEffect } from 'react';
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

  useEffect(() => {
    let imageSrc;
    if (state.councilLabel === "Northeast Cover Crop Council") {
      imageSrc = '../images/neccc_wide_logo_color_web.jpg';
    } else if (state.councilLabel === "Southern Cover Crop Council"){
      imageSrc = '../images/sccc_logo.png'
    } else if (state.councilLabel === "Midwest Cover Crop Council"){
      imageSrc = '../images/mwccc_logo.png'
    } else if (state.councilLabel === "Western Cover Crop Council"){
      imageSrc = '../images/wccc_logo.png'
    } else {
      imageSrc = '../images/whitebg.png'
    }


  const imageElement = document.getElementById('logoImage');
    if (imageElement) {
      imageElement.src = imageSrc;
    }
  }, [state.councilLabel]); 

  return (
    <Grid lg={12} item container alignItems="center" sx={{height: '150px', padding:'0', margin:'0',}}>

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
            onClick={selectedCrops.length > 0 ? () => setHandleConfirm(true) : () => logoClick(true)}
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


      <Dialog onClose={() => setHandleConfirm(false)} open={handleConfirm}>
        <DialogContent dividers>
          <Typography variant="body1">
            You will need to clear your My Cover Crop List to continue. Would you like to continue?
          </Typography>
        </DialogContent>
        <DialogActions>
          <BinaryButton action={logoClick} />
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default HeaderLogoInfo;
