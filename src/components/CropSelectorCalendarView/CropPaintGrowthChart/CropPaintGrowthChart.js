import {
  Tooltip, Typography, Grid, Box,
} from '@mui/material';
import React from 'react';
import '../../../styles/cropSelectorCalendarView.scss';

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

const CropPaintGrowthChart = ({
  from = 'calendar',
  data = [],
  isCashCropMonth = () => {},
}) => (
  <Box className="growthCellsWrapper" sx={{ display: 'flex', width: from === 'calendar' ? 'auto' : '200px' }}>
    {data['Half Month Data'].map((item, index) => {
      const l = item.months.length;
      if (item.info.length > 0) {
        return (
          <Tooltip
            arrow
            title={(
              <div style={{ textAlign: 'center' }}>
                {item.info.length === 1 && !isHessianDate(item) ? (
                  <Typography color="secondary">
                    {`${item.startTime} - ${item.endTime}`}
                  </Typography>
                ) : null}
                {item.info.length === 1 && isHessianDate(item) ? (
                  <Typography color="secondary">
                    {`${item.startTime}`}
                  </Typography>
                ) : null}
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
                    } ${isCashCropMonth(month) && (!isHessianDate(item)) ? 'cashCropMonth' : ''}`
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
      return (
        <Box sx={{ display: 'flex', flex: l }} key={index}>
          {item.months.map((month, i) => (
            <div
              className={
                `${from === 'listView' ? 'growthCell-20' : 'growthCell-30'
                } ${isCashCropMonth(month) ? ' cashCropMonth' : ''}`
              }
              key={`${index}-${i}`}
            />
          ))}
        </Box>
      );
    })}
  </Box>
);
export default CropPaintGrowthChart;
