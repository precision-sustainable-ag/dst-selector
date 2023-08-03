import { Tooltip, Typography } from '@mui/material';
import React from 'react';
import '../../../styles/cropSelectorCalendarView.scss';

const CropPaintGrowthChart = ({
  from = 'calendar',
  data = [],
  isCashCropMonth = () => {},
}) => (
  // TODO: add listView here, change growthCell-30 to growthCell-20
  <div className="d-flex flex-row w-100 growthCellsWrapper">
    {data['Half Month Data'].map((item, index) => {
      const l = item.months.length;
      if (item.info.length > 0) {
        return (
          <Tooltip
            arrow
            title={(
              <>
                {item.info.length === 1 ? (
                  <Typography color="secondary">
                    {`${item.startTime} - ${item.endTime}`}
                  </Typography>
                ) : null}
                <Typography variant="body1" gutterBottom>
                  {item.info.join(', ')}
                </Typography>
              </>
                  )}
            key={index}
          >
            <div className="d-flex flex-row" style={{ flex: l }}>
              {item.months.map((month, i) => (
                <div
                  className={`basic\
                  ${from === 'listView' ? 'growthCell-20' : 'growthCell-30'}\
                  ${item.info.join(' ')}\
                  ${isCashCropMonth(month) ? 'cashCropMonth' : ''}`}
                  key={`${index}-${i}`}
                />
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
              ${item.info.join(' ')} \
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
