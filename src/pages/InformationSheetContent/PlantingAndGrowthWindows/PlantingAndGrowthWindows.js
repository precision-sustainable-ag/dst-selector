import React from 'react';
import { AccordionDetails, Typography } from '@mui/material';
import { ExpandMore, FiberManualRecord } from '@mui/icons-material';
import moment from 'moment-timezone';
import CropSelectorCalendarView from '../../../components/CropSelectorCalendarView/CropSelectorCalendarView';
import getMonthDayString from './getMonthDayString';
import { allMonths, getActiveCropMonths } from '../../../shared/constants';
import { Accordion, AccordionSummary, useStyles } from '../informationSheet.styles';

const PlantingAndGrowthWindows = ({ crop }) => {
  const classes = useStyles();

  return (
    <div className="row otherRows mb-4 avoidPage">
      <div className="col-7 col-lg-6 basicAgWrapper">
        <div className="col-12 otherHeaderRow p-0" style={{ marginTop: '1em' }}>
          <Accordion defaultExpanded style={{ border: '1px solid #2b7b79' }}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              classes={{ expanded: classes.expanded }}
            >
              <Typography variant="h6" className="px-3 py-2" style={{ border: '0px' }}>
                Planting and Growth Windows
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="row col-12 text-right">
                <div className="col-9 mb-2">
                  <Typography variant="body1">
                    <FiberManualRecord style={{ color: '#2f80ed' }} />
                      &nbsp;Frost Seeding
                  </Typography>
                </div>
                <div className="col-3 mb-2">
                  <div className="blue-bg shrt_perennial wd-110">
                    <Typography variant="body1">
                      {crop['Frost Seeding']
                        ? `${moment(crop['Frost Seeding Start'], 'YYYY-MM-DD')
                          .format('MM/DD')
                          .toString()} - ${moment(crop['Frost Seeding End'], 'YYYY-MM-DD')
                          .format('MM/DD')
                          .toString()}`
                        : 'N/A'}
                    </Typography>
                  </div>
                </div>
                <div className="col-9 mb-2">
                  <Typography variant="body1">
                    <FiberManualRecord style={{ color: '#2d7b7b' }} />
                      &nbsp;Reliable Establishment
                  </Typography>
                </div>
                <div className="mb-2">
                  {crop['Second Reliable Establishment/Growth Start']
                    && crop['Second Reliable Establishment/Growth End'] ? (
                      <div className="blueBgFlex borderWrapped wd-112">
                        <div className="blue-bg shrt_perennial wd-110">
                          <Typography variant="body1">
                            {getMonthDayString('reliable', crop)}
                          </Typography>
                        </div>
                        <div className="blue-bg shrt_perennial wd-110">
                          <Typography variant="body1">
                            {getMonthDayString('reliable-second', crop)}
                          </Typography>
                        </div>
                      </div>
                    ) : (
                      <div className="blue-bg shrt_perennial wd-110">
                        <Typography variant="body1">{getMonthDayString('reliable', crop)}</Typography>
                      </div>
                    )}
                </div>

                <div className="col-9 mb-2">
                  <Typography variant="body1">
                    <FiberManualRecord style={{ color: '#f2c94c' }} />
                      &nbsp;Temperature/Moisture Risk
                  </Typography>
                </div>
                <div className="mb-2">
                  {crop['Second Temperature/Moisture Risk to Establishment Start']
                    && crop['Second Temperature/Moisture Risk to Establishment End'] ? (
                      <div className="blueBgFlex borderWrapped wd-112">
                        <div className="blue-bg shrt_perennial wd-110">
                          <Typography variant="body1">
                            {getMonthDayString('temperature', crop)}
                          </Typography>
                        </div>
                        <div className="blue-bg shrt_perennial wd-110">
                          <Typography variant="body1">
                            {getMonthDayString('temperature-second', crop)}
                          </Typography>
                        </div>
                      </div>
                    ) : (
                      <div className="blue-bg shrt_perennial wd-110">
                        <Typography variant="body1">
                          {getMonthDayString('temperature', crop)}
                        </Typography>
                      </div>
                    )}
                </div>

                <div className="col-9 mb-2">
                  <Typography variant="body1">
                    <FiberManualRecord style={{ color: '#598445' }} />
                      &nbsp;Active Growth Period
                  </Typography>
                </div>
                <div className="mb-2">
                  <div
                    className={`blueBgFlex ${
                      crop['Active Growth Period'].length > 1 ? 'borderWrapped' : ''
                    }`}
                  >
                    {crop['Active Growth Period'].map((val, index) => (
                      <div className="blue-bg bordered" key={index}>
                        <Typography variant="body1">{val}</Typography>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-9 mb-2">
                  <Typography variant="body1">Winter Survival</Typography>
                </div>
                <div className="mb-2">
                  <div className="blue-bg">
                    <Typography variant="body1">{crop['Winter Survival']}</Typography>
                  </div>
                </div>

                <div className="col-9 mb-2">
                  <Typography variant="body1">Can Interseed</Typography>
                </div>
                <div className="mb-2">
                  <div className="blue-bg shrt_perennial wd-110">
                    <Typography variant="body1">
                      {crop['Interseed possible'] ? 'Yes' : 'N/A'}
                    </Typography>
                  </div>
                </div>

                <div className="col-12 pt-4">
                  <table style={{ width: '100%', height: '40px' }}>
                    <tbody>
                      <tr>
                        {allMonths.map((month, index) => (
                          <td
                            style={{
                              background: getActiveCropMonths(crop).includes(month)
                                ? '#598445'
                                : '#f0f7eb',
                              // width: "100%",
                              height: '20px',
                              borderRight: `${month !== 'Dec' ? '2px solid white' : ''}`,
                            }}
                            key={`growth-${index}`}
                          />
                        ))}
                      </tr>
                      <tr style={{ borderTop: '2px solid white' }}>
                        {/* {allMonths.map((month, index) => (
                            <GrowthWindowComponent
                              from="infosheet"
                              data={crop}
                              key={index}
                              id={`growthCell${index}`}
                              month={index}
                            />
                          ))} */}
                        <CropSelectorCalendarView data={{ fields: crop }} from="infosheet" />
                      </tr>
                      <tr>
                        {allMonths.map((month, index) => (
                          <td key={index} className="text-center">
                            <Typography variant="body1">{month}</Typography>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default PlantingAndGrowthWindows;
