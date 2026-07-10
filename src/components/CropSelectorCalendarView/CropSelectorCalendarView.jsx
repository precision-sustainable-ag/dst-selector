import { Box, Grid, Typography } from '@mui/material';
import '../../styles/cropSelectorCalendarView.scss';
import { useSelector } from 'react-redux';
import { PSATooltip } from 'shared-react-components/src';

const isHessianDate = (item) => {
  if (item.info.includes('Hessian Fly Free Date')) {
    return true;
  }
  return false;
};

const generateToolTipText = (item) => {
  const textArr = item.info.slice(0);
  if (isHessianDate(item)) {
    textArr.splice(textArr.indexOf('Hessian Fly Free Date'));
    textArr.push(`Plant after ${item.startTime} to avoid Hessian flies`);
  }
  return textArr.join(', ');
};

const CropSelectorCalendarView = ({ from = 'calendar', data = [] }) => {
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const irrigationFilter = useSelector(
    (stateRedux) => stateRedux.filterData.filters.irrigationFilter,
  );

  return (
    <Box
      className="growthCellsWrapper"
      sx={{ display: 'flex', width: from === 'calendar' ? 'auto' : '200px' }}
    >
      {data.cropGrowthWindow.map((growthWindow, index) => {
        const filteredWindow = { ...growthWindow };
        if (councilShorthandRedux === 'WCCC') {
          filteredWindow.info = filteredWindow.info.filter(
            (text) => !text.includes(irrigationFilter ? 'rainfed' : 'irrigation'),
          );
        }
        const { startTime, endTime, info, length } = filteredWindow;
        const hessianDate = isHessianDate(filteredWindow);
        const isCashCropTime = info.indexOf('Cash Crop Growing') > -1;
        const isMultiple = isCashCropTime ? info.length > 2 : info.length > 1;
        const classNames = `${from === 'listView' ? 'growthCell-20' : 'growthCell-30'} ${
          isMultiple && !hessianDate ? 'Multiple' : info.join(' ')
        } ${isCashCropTime ? 'cashCropMonth' : ''}`;
        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: <No unique element to use as key>
          <Box sx={{ flex: length }} key={index}>
            <PSATooltip
              sx={{ flex: length }}
              arrow
              title={
                info.length > 0 ? (
                  <Box style={{ textAlign: 'center' }}>
                    <Typography color="primary">
                      {hessianDate ? `${startTime}` : `${startTime} - ${endTime}`}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {generateToolTipText(filteredWindow)}
                    </Typography>
                  </Box>
                ) : null
              }
              enterTouchDelay={0}
              tooltipContent={
                <Box
                  className={classNames}
                  tabIndex="0"
                  aria-label={`${generateToolTipText(filteredWindow)}
                 ${hessianDate ? `${startTime}` : `${startTime} - ${endTime}`}`}
                >
                  {hessianDate && from !== 'listView' ? (
                    <Grid
                      container
                      sx={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                      }}
                    >
                      <svg
                        width="20px"
                        height="20px"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        role="img"
                        aria-labelledby={`hessianFlyFreeDate${index}`}
                      >
                        <title id={`hessianFlyFreeDate${index}`}>Hessian Fly Free Date</title>
                        <polygon points="50,0 100,50 50,100 0,50" fill="#f8a504" strokeWidth={0} />
                      </svg>
                    </Grid>
                  ) : null}
                </Box>
              }
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default CropSelectorCalendarView;
