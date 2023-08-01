import { Tooltip, Typography } from '@mui/material';
import React from 'react';
import '../../../styles/cropSelectorCalendarView.scss';

const CropPaintGrowthChart = ({
  from = 'calendar',
  months = [],
  data = [],
  isThisCashCropMonth = () => {},
}) => {
  // console.log('data', data.data['Planting and Growth Windows']);
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
                    {data[earlyStr] ? (
                      <Tooltip
                        arrow
                        title={(
                          <>
                            <Typography color="secondary">
                              {month.toUpperCase()}
                              , EARLY
                            </Typography>
                            {data[earlyStr].map((v, i) => (
                              <Typography variant="body1" key={i} gutterBottom>
                                {v}
                              </Typography>
                            ))}
                          </>
                        )}
                      >
                        <div
                          className={`${data[earlyStr].toString()} w-50 growthCell-20`}
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
                    {data[midStr] ? (
                      <Tooltip
                        arrow
                        title={(
                          <>
                            <Typography color="secondary">
                              {month.toUpperCase()}
                              , MID
                            </Typography>
                            {data[midStr].map((v, i) => (
                              <Typography variant="body1" key={i} gutterBottom>
                                {v}
                              </Typography>
                            ))}
                          </>
                        )}
                      >
                        <div
                          className={`${data[midStr].toString()} w-50 growthCell-20`}
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
      <>
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
                      {data[earlyStr] ? (
                        <Tooltip
                          arrow
                          title={(
                            <>
                              <Typography color="secondary">
                                {month.toUpperCase()}
                                , EARLY123
                              </Typography>
                              {data[earlyStr].map((v, i) => (
                                <Typography variant="body1" key={i} gutterBottom>
                                  {v}
                                </Typography>
                              ))}
                            </>
                        )}
                        >
                          <div
                            className={`${data[earlyStr][0].toString()} w-50 growthCell-30`}
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip
                          arrow
                          title={(
                            <Typography color="secondary">
                              {month.toUpperCase()}
                              , EARLY456
                            </Typography>
                        )}
                        >
                          <div className="w-50 basic growthCell-30" />
                        </Tooltip>
                      )}
                      {data[midStr] ? (
                        <Tooltip
                          arrow
                          title={(
                            <>
                              <Typography color="secondary">
                                {month.toUpperCase()}
                                , MID
                              </Typography>
                              {data[midStr].map((v, i) => (
                                <Typography variant="body1" key={i} gutterBottom>
                                  {v}
                                </Typography>
                              ))}
                            </>
                        )}
                        >
                          <div
                            className={`${data[midStr][0].toString()} w-50 growthCell-30`}
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
        <br />
        <div>
          <div className="d-flex flex-row w-100 growthCellsWrapper">
            <div
              className="w-50 basic growthCell-30"
            />
            <Tooltip
              arrow
              title="01/01-03/01"
            >
              <div
                className="w-25 basic growthCell-30 Reliable Establishment"
                style={{ flex: 3 }}
              />

            </Tooltip>
            <div
              className="w-50 basic growthCell-30"
            />
            <div
              className="w-50 basic growthCell-30"
            />

            <div
              className="w-50 basic growthCell-30"
            />
          </div>
        </div>
      </>
    );
  }
  return '';
};

// const buildArray = () => {
//   const arr = Array.from({ length: 24 }, (_, i) => ({ startDate: '', endDate: '', info: '' }));
// };

export default CropPaintGrowthChart;
