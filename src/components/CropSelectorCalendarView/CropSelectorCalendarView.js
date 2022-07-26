import { Tooltip, Typography } from '@mui/material';
import moment from 'moment';
import React, { Fragment, useContext } from 'react';
import { allMonths, getActiveCropMonths } from '../../shared/constants';
import { Context } from '../../store/Store';
import '../../styles/cropSelectorCalendarView.scss';
import CropPaintGrowthChart from './CropPaintGrowthChart/CropPaintGrowthChart';

const CropSelectorCalendarView = ({ from = 'calendar', data = [] }) => {
  const { state } = useContext(Context);
  const cashCropStartDate = state.cashCropData.dateRange.startDate === ''
    ? null
    : moment(state.cashCropData.dateRange.startDate).toISOString();
  const cashCropEndDate = state.cashCropData.dateRange.endDate === ''
    ? null
    : moment(state.cashCropData.dateRange.endDate).toISOString();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const isThisCashCropMonth = (month = 'January') => {
    if (cashCropStartDate === null || cashCropEndDate === null) {
      return false;
    }
    const result = new Set();
    const start = moment(cashCropStartDate);
    const end = moment(cashCropEndDate);

    while (start.isBefore(end)) {
      result.add(start.format('MMMM'));

      start.add(moment.duration(1, 'month'));
    }

    if (result.has(month)) {
      return true;
    }
    return false;
  };
  // eslint-disable-next-line no-nested-ternary
  return from === 'calendar' ? (
    <CropPaintGrowthChart
      data={data}
      from="calendar"
      months={months}
      isThisCashCropMonth={isThisCashCropMonth}
    />
  ) : from === 'listView' ? (
    <>
      <CropPaintGrowthChart
        data={data}
        from="listView"
        months={months}
        isThisCashCropMonth={isThisCashCropMonth}
      />

      <table>
        <tbody>
          <tr>
            {state.selectedGoals.length === 0
              ? allMonths.map((month, index) => <td key={index}>{month}</td>)
              : allMonths.map((month, index) => (month === 'Jan' || month === 'Dec' ? (
                <td key={index} style={index === 11 ? { textAlign: 'right' } : {}}>
                  <Typography variant="body1">{month}</Typography>
                </td>
              ) : (
                <td key={index} />
              )))}
          </tr>
        </tbody>
      </table>
    </>
  ) : (
    months.map((month, index) => {
      const earlyStr = `${month}, Early`;
      const midStr = `${month}, Mid`;

      return (
        <td
          key={index}
          className={
            isThisCashCropMonth(month) ? 'cashCropMonth listView p-0 growthTd' : 'p-0 growthTd'
          }
          style={
            // eslint-disable-next-line no-nested-ternary
            getActiveCropMonths(data.fields).includes('Jan')
              ? {
                borderLeft: '0px solid white',
                borderRight: '2px solid white',
              }
              // eslint-disable-next-line no-nested-ternary
              : getActiveCropMonths(data.fields).includes('Dec')
                ? {
                  borderLeft: '2px solid white',
                  borderRight: '0px solid white',
                }
                : {
                  borderLeft: '2px solid white',
                  borderRight: '2px solid white',
                }
          }
        >
          <div className="d-flex flex-row w-100 growthCellsWrapper">
            {data.fields[earlyStr] ? (
              <Tooltip
                arrow
                title={(
                  <>
                    <Typography color="secondary">
                      {month.toUpperCase()}
                      , EARLY
                    </Typography>
                    {data.fields[earlyStr].map((v, i) => (
                      <Typography variant="body1" key={i} gutterBottom>
                        {v}
                      </Typography>
                    ))}
                  </>
                )}
              >
                <div className={`${data.fields[earlyStr].toString()} w-50 growthCell-20`} />
              </Tooltip>
            ) : (
              <Tooltip
                arrow
                title={(
                  <Typography color="secondary">
                    {month.toUpperCase()}
                    , EARLY
                  </Typography>
)}
              >
                <div className="w-50 basic growthCell-20" />
              </Tooltip>
            )}
            {data.fields[midStr] ? (
              <Tooltip
                arrow
                title={(
                  <>
                    <Typography color="secondary">
                      {month.toUpperCase()}
                      , MID
                    </Typography>
                    {data.fields[midStr].map((v, i) => (
                      <Typography variant="body1" key={i} gutterBottom>
                        {v}
                      </Typography>
                    ))}
                  </>
                )}
              >
                <div className={`${data.fields[midStr].toString()} w-50 growthCell-20`} />
              </Tooltip>
            ) : (
              <Tooltip
                arrow
                title={(
                  <Typography color="secondary">
                    {month.toUpperCase()}
                    , MID
                  </Typography>
                )}
              >
                <div className="w-50 basic growthCell-20" />
              </Tooltip>
            )}
          </div>
        </td>
      );
    })
  );
};

export default CropSelectorCalendarView;
