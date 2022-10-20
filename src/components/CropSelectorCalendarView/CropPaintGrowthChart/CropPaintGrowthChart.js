import { Tooltip, Typography } from '@mui/material';
import React from 'react';
import '../../../styles/cropSelectorCalendarView.scss';

const CropPaintGrowthChart = ({
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
              const earlyStr = `${month}, Early`;
              const midStr = `${month}, Mid`;

              return (
                <td
                  key={index}
                  className={
                    isThisCashCropMonth(month)
                      ? 'cashCropMonth listView p-0 growthTd'
                      : 'p-0 growthTd'
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
                        <div
                          className={`${data.fields[earlyStr].toString()} w-50 growthCell-20`}
                        />
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
                        <div
                          className={`${data.fields[midStr].toString()} w-50 growthCell-20`}
                        />
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
            })}
          </tr>
        </tbody>
      </table>
    );
  } if (from === 'calendar') {
    return (
      <table className="w-100">
        <tbody>
          <tr>
            {months.map((month, index) => {
              const earlyStr = `${month}, Early`;
              const midStr = `${month}, Mid`;

              return (
                <td
                  key={index}
                  className={
                    isThisCashCropMonth(month) ? 'cashCropMonth p-0 growthTd' : 'p-0 growthTd'
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
                        <div
                          className={`${data.fields[earlyStr].toString()} w-50 growthCell-30`}
                        />
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
                        <div className="w-50 basic growthCell-30" />
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
                        <div
                          className={`${data.fields[midStr].toString()} w-50 growthCell-30`}
                        />
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
                        <div className="w-50 basic growthCell-30" />
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
  }
  return '';
};

export default CropPaintGrowthChart;
