/*
  This file contains the CropCalendarViewComponent  
  The CropCalendarViewComponent shows the crops in calendar format
*/

import { Tooltip, Typography } from '@mui/material';
import moment from 'moment';
import React, { Fragment, useContext } from 'react';
import { allMonths, getActiveCropMonths } from '../../shared/constants';
import { Context } from '../../store/Store';
import '../../styles/cropSelectorCalendarView.scss';

const CropSelectorCalendarView = ({ from = 'calendar', data = [] }) => {
  const { state } = useContext(Context);
  const cashCropStartDate =
    state.cashCropData.dateRange.startDate === ''
      ? null
      : moment(state.cashCropData.dateRange.startDate).toISOString();
  const cashCropEndDate =
    state.cashCropData.dateRange.endDate === ''
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
    } else {
      var result = new Set();
      console.log('End', cashCropEndDate);
      console.log('Start', cashCropStartDate);
      let start = moment(cashCropStartDate);
      let end = moment(cashCropEndDate);

      while (start.isBefore(end)) {
        result.add(start.format('MMMM'));

        start.add(moment.duration(1, 'month'));
      }

      if (result.has(month)) {
        return true;
      } else {
        return false;
      }
    }
  };
  return from === 'calendar' ? (
    <PaintGrowthChart
      data={data}
      from="calendar"
      months={months}
      isThisCashCropMonth={isThisCashCropMonth}
    />
  ) : from === 'listView' ? (
    <>
      <PaintGrowthChart
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
              : allMonths.map((month, index) =>
                  month === 'Jan' || month === 'Dec' ? (
                    <td key={index} style={index === 11 ? { textAlign: 'right' } : {}}>
                      <Typography variant="body1">{month}</Typography>
                    </td>
                  ) : (
                    <td key={index}></td>
                  ),
                )}
          </tr>
        </tbody>
      </table>
    </>
  ) : (
    months.map((month, index) => {
      let earlyStr = `${month}, Early`;
      let midStr = `${month}, Mid`;

      return (
        <td
          key={index}
          className={
            isThisCashCropMonth(month) ? `cashCropMonth listView p-0 growthTd` : `p-0 growthTd`
          }
          style={
            getActiveCropMonths(data.fields).includes('Jan')
              ? {
                  borderLeft: '0px solid white',
                  borderRight: '2px solid white',
                }
              : getActiveCropMonths(data.fields).includes('Dec')
              ? {
                  borderLeft: '2px solid white',
                  borderRight: '0px solid white',
                }
              : getActiveCropMonths(data.fields).includes(month.substring(0, 3))
              ? {
                  borderLeft: '2px solid white',
                  borderRight: '2px solid white',
                }
              : {
                  borderLeft: '2px solid white',
                  borderRight: '2px solid white',
                }
          }
        >
          <div className={`d-flex flex-row w-100 growthCellsWrapper`}>
            {data.fields[earlyStr] ? (
              <Tooltip
                arrow
                title={
                  <Fragment>
                    <Typography color="secondary">{month.toUpperCase()}, EARLY</Typography>
                    {data.fields[earlyStr].map((v, i) => (
                      <Typography variant="body1" key={i} gutterBottom>
                        {v}
                      </Typography>
                    ))}
                  </Fragment>
                }
              >
                <div className={`${data.fields[earlyStr].toString()} w-50 growthCell-20`}></div>
              </Tooltip>
            ) : (
              <Tooltip
                arrow
                title={<Typography color="secondary">{month.toUpperCase()}, EARLY</Typography>}
              >
                <div className="w-50 basic growthCell-20"></div>
              </Tooltip>
            )}
            {data.fields[midStr] ? (
              <Tooltip
                arrow
                title={
                  <Fragment>
                    <Typography color="secondary">{month.toUpperCase()}, MID</Typography>
                    {data.fields[midStr].map((v, i) => (
                      <Typography variant="body1" key={i} gutterBottom>
                        {v}
                      </Typography>
                    ))}
                  </Fragment>
                }
              >
                <div className={`${data.fields[midStr].toString()} w-50 growthCell-20`}></div>
              </Tooltip>
            ) : (
              <Tooltip
                arrow
                title={
                  <Fragment>
                    <Typography color="secondary">{month.toUpperCase()}, MID</Typography>
                  </Fragment>
                }
              >
                <div className="w-50 basic growthCell-20"></div>
              </Tooltip>
            )}
          </div>
        </td>
      );
    })
  );
};

export default CropSelectorCalendarView;

const PaintGrowthChart = ({
  size = '30',
  from = 'calendar',
  months = [],
  data = [],
  isThisCashCropMonth = () => {},
}) => {
  if (from === 'listView') {
    return (
      <table className="w-100">
        <tbody>
          <tr>
            {months.map((month, index) => {
              let earlyStr = `${month}, Early`;
              let midStr = `${month}, Mid`;

              return (
                <td
                  key={index}
                  className={
                    isThisCashCropMonth(month)
                      ? `cashCropMonth listView p-0 growthTd`
                      : `p-0 growthTd`
                  }
                >
                  <div className={`d-flex flex-row w-100 growthCellsWrapper`}>
                    {data.fields[earlyStr] ? (
                      <Tooltip
                        arrow
                        title={
                          <Fragment>
                            <Typography color="secondary">{month.toUpperCase()}, EARLY</Typography>
                            {data.fields[earlyStr].map((v, i) => (
                              <Typography variant="body1" key={i} gutterBottom>
                                {v}
                              </Typography>
                            ))}
                          </Fragment>
                        }
                      >
                        <div
                          className={`${data.fields[earlyStr].toString()} w-50 growthCell-20`}
                        ></div>
                      </Tooltip>
                    ) : (
                      <Tooltip
                        arrow
                        title={
                          <Typography color="secondary">{month.toUpperCase()}, EARLY</Typography>
                        }
                      >
                        <div className="w-50 basic growthCell-20"></div>
                      </Tooltip>
                    )}
                    {data.fields[midStr] ? (
                      <Tooltip
                        arrow
                        title={
                          <Fragment>
                            <Typography color="secondary">{month.toUpperCase()}, MID</Typography>
                            {data.fields[midStr].map((v, i) => (
                              <Typography variant="body1" key={i} gutterBottom>
                                {v}
                              </Typography>
                            ))}
                          </Fragment>
                        }
                      >
                        <div
                          className={`${data.fields[midStr].toString()} w-50 growthCell-20`}
                        ></div>
                      </Tooltip>
                    ) : (
                      <Tooltip
                        arrow
                        title={
                          <Fragment>
                            <Typography color="secondary">{month.toUpperCase()}, MID</Typography>
                          </Fragment>
                        }
                      >
                        <div className="w-50 basic growthCell-20"></div>
                      </Tooltip>
                    )}
                  </div>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    );
  } else if (from === 'calendar') {
    return (
      <table className="w-100">
        <tbody>
          <tr>
            {months.map((month, index) => {
              let earlyStr = `${month}, Early`;
              let midStr = `${month}, Mid`;

              return (
                <td
                  key={index}
                  className={
                    isThisCashCropMonth(month) ? `cashCropMonth p-0 growthTd` : `p-0 growthTd`
                  }
                >
                  <div className={`d-flex flex-row w-100 growthCellsWrapper`}>
                    {data.fields[earlyStr] ? (
                      <Tooltip
                        arrow
                        title={
                          <Fragment>
                            <Typography color="secondary">{month.toUpperCase()}, EARLY</Typography>
                            {data.fields[earlyStr].map((v, i) => (
                              <Typography variant="body1" key={i} gutterBottom>
                                {v}
                              </Typography>
                            ))}
                          </Fragment>
                        }
                      >
                        <div
                          className={`${data.fields[earlyStr].toString()} w-50 growthCell-30`}
                        ></div>
                      </Tooltip>
                    ) : (
                      <Tooltip
                        arrow
                        title={
                          <Fragment>
                            <Typography color="secondary">{month.toUpperCase()}, EARLY</Typography>
                          </Fragment>
                        }
                      >
                        <div className="w-50 basic growthCell-30"></div>
                      </Tooltip>
                    )}
                    {data.fields[midStr] ? (
                      <Tooltip
                        arrow
                        title={
                          <Fragment>
                            <Typography color="secondary">{month.toUpperCase()}, MID</Typography>
                            {data.fields[midStr].map((v, i) => (
                              <Typography variant="body1" key={i} gutterBottom>
                                {v}
                              </Typography>
                            ))}
                          </Fragment>
                        }
                      >
                        <div
                          className={`${data.fields[midStr].toString()} w-50 growthCell-30`}
                        ></div>
                      </Tooltip>
                    ) : (
                      <Tooltip
                        arrow
                        title={
                          <Fragment>
                            <Typography color="secondary">{month.toUpperCase()}, MID</Typography>
                          </Fragment>
                        }
                      >
                        <div className="w-50 basic growthCell-30"></div>
                      </Tooltip>
                    )}
                  </div>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    );
  } else {
    return '';
  }
};
