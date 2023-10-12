import { Tooltip, Typography } from '@mui/material';
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
  <div className="d-flex flex-row w-100 growthCellsWrapper">
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
          >
            <div className="d-flex flex-row" style={{ flex: l }}>
              {item.months.map((month, i) => (
                <div
                  className={`basic\
                  ${from === 'listView' ? 'growthCell-20' : 'growthCell-30'}\
                  ${item.info.length > 1 && !isHessianDate(item) ? 'Multiple' : item.info[0]}\
                  ${isCashCropMonth(month) && (!isHessianDate(item)) ? 'cashCropMonth' : ''}`}
                  key={`${index}-${i}`}
                >
                  {isHessianDate(item) && from !== 'listView'
                    ? (
                      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <polygon points="50,0 100,50 50,100 0,50" fill="green" strokeWidth={0} />
                      </svg>
                    )
                    : null}
                </div>
              ))}
            </div>
          </Tooltip>
        );
      }
      return (
        <div className="d-flex flex-row" style={{ flex: l }} key={index}>
          {item.months.map((month, i) => (
            <div
              className={`basic\
              ${from === 'listView' ? 'growthCell-20' : 'growthCell-30'} \
              ${item.info.length > 1 ? 'Multiple' : item.info[0]}\
              ${isCashCropMonth(month) ? 'cashCropMonth' : ''}`}
              key={`${index}-${i}`}
            />
          ))}
        </div>
      );
    })}
  </div>
);
export default CropPaintGrowthChart;
