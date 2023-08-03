import { Tooltip, Typography } from '@mui/material';
import React from 'react';
import '../../../styles/cropSelectorCalendarView.scss';

const CropPaintGrowthChart = ({
  from = 'calendar',
  months = [],
  data = [],
  isThisCashCropMonth = () => {},
  isCashCropMonth = () => {},
}) => {
  // TODO: add listView here, change growthCell-30 to growthCell-20
  if (from === 'listView') {
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
        <br />

        <div>
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
                          className={`basic growthCell-20 ${item.info.join(' ')} ${isCashCropMonth(month) ? 'cashCropMonth' : ''}`}
                          key={`${index}-${i}`}
                        />
                      ))}

                    </div>
                  </Tooltip>
                );
              }
              return (
                <div className="d-flex flex-row" style={{ flex: l }}>
                  {item.months.map((month, i) => (
                    <div
                      className={`basic growthCell-20 ${item.info.join(' ')} ${isCashCropMonth(month) ? 'cashCropMonth' : ''}`}
                      key={`${index}-${i}`}
                    />
                  ))}

                </div>
              );
            })}
          </div>
        </div>
      </>
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
        {/* TODO: This is the implementation of the new calendar chart */}
        <br />

        <div>
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
                          className={`basic growthCell-30 ${item.info.join(' ')} 
                          ${isCashCropMonth(month) ? 'cashCropMonth' : ''}`}
                          key={`${index}-${i}`}
                        />
                      ))}

                    </div>
                  </Tooltip>
                );
              }
              return (
                <div className="d-flex flex-row" style={{ flex: l }}>
                  {item.months.map((month, i) => (
                    <div
                      className={`basic growthCell-30 ${item.info.join(' ')} 
                      ${isCashCropMonth(month) ? 'cashCropMonth' : ''}`}
                      key={`${index}-${i}`}
                    />
                  ))}

                </div>
              );
            })}
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
