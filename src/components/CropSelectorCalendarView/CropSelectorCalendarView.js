import React from 'react';
import {
  Tooltip, Typography, Grid, Box,
} from '@mui/material';
import '../../styles/cropSelectorCalendarView.scss';

// FIXME: current api don't have hessian fly date, this feature will hold temprorarily
const isHessianDate = (item) => {
  if (item.info.includes('Fly Free Date')) {
    return true;
  }
  return false;
};

const generateToolTipText = (item) => {
  if (!isHessianDate(item)) {
    return item.info.join(', ');
  }
  const textArr = item.info.slice(0);
  textArr.splice(textArr.indexOf('Fly Free Date'));
  textArr.push(`Plant after ${item.startTime} to avoid Hessian flies`);
  return textArr.join(', ');
};

const CropSelectorCalendarView = ({ from = 'calendar', data = [] }) => (
  <Box className="growthCellsWrapper" sx={{ display: 'flex', width: from === 'calendar' ? 'auto' : '200px' }}>

    {/* {data['Half Month Data'].map((item, index) => {
      const l = item.months.length;
      if (item.info.length > 0) {
        return (
          <Tooltip
            arrow
            title={(
              <div style={{ textAlign: 'center' }}>
                <Typography color="secondary">
                  {item.info.length === 1 && isHessianDate(item)
                    ? `${item.startTime}`
                    : `${item.startTime} - ${item.endTime}`}
                </Typography>

                <Typography variant="body1" gutterBottom>
                  {generateToolTipText(item)}
                </Typography>
              </div>
                  )}
            key={index}
            enterTouchDelay={0}
          >
            <Box sx={{ display: 'flex', flex: l }}>
              {item.months.map((month, i) => (
                <div
                  className={
                    `${from === 'listView' ? 'growthCell-20' : 'growthCell-30'
                    } ${item.info.length > 1 && !isHessianDate(item) ? 'Multiple' : item.info[0] || 'Can Interseed'
                    } `
                  }
                  key={`${index}-${i}`}
                >
                  {isHessianDate(item) && from !== 'listView'
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
                </div>
              ))}
            </Box>
          </Tooltip>
        );
      }
      return null;
    })} */}

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
              {/* FIXME: the diamond will not be shown now */}
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
