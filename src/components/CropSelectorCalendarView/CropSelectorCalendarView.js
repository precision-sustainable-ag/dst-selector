import React from 'react';
import {
  Tooltip, Typography, Grid, Box,
} from '@mui/material';
import '../../styles/cropSelectorCalendarView.scss';

const isHessianDate = (item) => {
  if (item.info.includes('Hessian Fly Free Date')) {
    return true;
  }
  return false;
};

const generateToolTipText = (item) => {
  if (!isHessianDate(item)) {
    return item.info.join(', ');
  }
  const textArr = item.info.slice(0);
  textArr.splice(textArr.indexOf('Hessian Fly Free Date'));
  textArr.push(`Plant after ${item.startTime} to avoid Hessian flies`);
  return textArr.join(', ');
};

const CropSelectorCalendarView = ({ from = 'calendar', data = [] }) => (
  <Box className="growthCellsWrapper" sx={{ display: 'flex', width: from === 'calendar' ? 'auto' : '200px' }}>
    {data.cropGrowthWindow.map((growthWindow, index) => {
      const {
        startTime, endTime, info, length,
      } = growthWindow;
      const hessianDate = isHessianDate(growthWindow);
      const isCashCropTime = info.indexOf('Cash Crop Growing') > -1;
      const isMultiple = isCashCropTime ? info.length > 2 : info.length > 1;
      const classNames = `${from === 'listView' ? 'growthCell-20' : 'growthCell-30'
      } ${isMultiple && !hessianDate ? 'Multiple' : info.join(' ')
      } ${isCashCropTime ? 'cashCropMonth' : ''}`;
      return (
        <Box flex={length} key={index}>
          <Tooltip
            sx={{ flex: length }}
            arrow
            title={
            info.length > 0 ? (
              <Box style={{ textAlign: 'center' }}>
                <Typography color="secondary">
                  {hessianDate
                    ? `${startTime}`
                    : `${startTime} - ${endTime}`}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {generateToolTipText(growthWindow)}
                </Typography>
              </Box>
            ) : null
          }
            enterTouchDelay={0}
          >
            <Box
              className={classNames}
              key={index}
            >
              {hessianDate && from !== 'listView'
                ? (
                  <Grid
                    item
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    height="100%"
                  >
                    <svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <polygon points="50,0 100,50 50,100 0,50" fill="green" strokeWidth={0} />
                    </svg>
                  </Grid>

                )
                : null}

            </Box>
          </Tooltip>
        </Box>

      );
    })}
  </Box>
);

export default CropSelectorCalendarView;
