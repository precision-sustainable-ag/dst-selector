/*
  Contains the top level information sheet popup
  BasicCrop contains the default crop
  MonthDayString gets the start and end dates used in the info sheet
  RenderExtendedComments returns the extended notes for a crop if they exist
  styled using makeStyles and withStyles
*/

import { AccordionDetails, Typography } from '@mui/material';
import { ExpandMore, FiberManualRecord } from '@mui/icons-material';
import moment from 'moment-timezone';
import React, {
  Fragment, useContext, useEffect, useState,
} from 'react';
import {
  allMonths,
  getActiveCropMonths,
  RenderSeedPriceIcons,
} from '../../shared/constants';
import { Context } from '../../store/Store';
import { Accordion, AccordionSummary, useStyles } from './informationSheet.styles';
import MonthDayString from './getMonthDayString';
import CoverCropInformation from './CoverCropInformation/CoverCropInformation';
import sources from '../../shared/json/sources/sources.json';
import TooltipMaker from '../../components/TooltipMaker/TooltipMaker';
import InformationSheetGoals from './InformationSheetGoals/InformationSheetGoals';
import InformationSheetWeeds from './InformationSheetWeeds/InformationSheetWeeds';
import InformationSheetEnvironment from './InformationSheetEnvironment/InformationSheetEnvironment';
import GrowthTraits from './GrowthTraits/GrowthTraits';
import RenderExtendedComments from '../../components/RenderExtendedComments/RenderExtendedComments';
import SoilDrainageInfoContent from './SoilDrainageInfoContent/SoilDrainageInfoContent';
import TerminationInfo from './TerminationInfo/TerminationInfo';
import CropSelectorCalendarView from '../../components/CropSelectorCalendarView/CropSelectorCalendarView';

const InformationSheetContent = (props) => {
  const { state } = useContext(Context);
  const section = window.location.href.includes('selector') ? 'selector' : 'explorer';
  const { zone } = state[section];
  const { crop } = props;
  const classes = useStyles();
  const [currentSources, setCurrentSources] = useState([{}]);

  const [pdf, setPDF] = useState(false);

  useEffect(() => {
    document.title = `${crop['Cover Crop Name']} Zone ${zone}`;
    fetch(`/pdf/${document.title}.pdf`)
      .then((response) => response.text())
      .then((data) => {
        if (data.includes('PDF')) {
          setPDF(true);
        }
      });

    const regex = /(?!\B"[^"]*),(?![^"]*"\B)/g;
    const removeDoubleQuotes = /^"(.+(?="$))"$/;
    const relevantZones = sources.filter((source) => {
      const zones = source.Zone.split(',').map((item) => item.trim());
      const coverCrops = source['Cover Crops']
        .split(regex)
        .map((item) => item.replace(removeDoubleQuotes, '$1'))
        .map((item) => item.trim());

      return zones.includes(`Zone ${zone}`) && coverCrops.includes(crop['Cover Crop Name']);
    });

    setCurrentSources(relevantZones);
    document.body.classList.add('InfoSheet');

    return () => {
      document.title = 'Cover Crop Explorer';
      document.body.classList.remove('InfoSheet');
    };
  }, [crop, zone]);

  return Object.keys(crop).length > 0 ? (
    <>
      {pdf && <iframe id="PDF" title="pdf" src={`/pdf/${document.title}.pdf`} />}

      <CoverCropInformation
        cropImage={crop['Image Data'] || null}
        cropDescription={
          crop['Cover Crop Description'] ? crop['Cover Crop Description'] : crop['Crop Description']
        }
      />

      <InformationSheetGoals
        crop={crop}
        cropZone={crop.Zone}
        cropGrowingWindow={crop['Growing Window']}
      />

      <div className="row otherRows mb-4 avoidPage">
        <InformationSheetWeeds crop={crop} />
        <InformationSheetEnvironment crop={crop} />
      </div>

      <div className="row otherRows mb-4 avoidPage">
        <GrowthTraits crop={crop} />
        <SoilDrainageInfoContent crop={crop} />
      </div>

      <div className="row otherRows mb-4 avoidPage">
        <div className="col-7 col-lg-6 basicAgWrapper">
          <div className="col-12 otherHeaderRow p-0" style={{ marginTop: '1em' }}>
            <Accordion defaultExpanded style={{ border: '1px solid #2b7b79' }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                classes={{ expanded: classes.expanded }}
              >
                <Typography variant="h6" className="px-3 py-2" style={{ border: '0px' }}>
                  Planting
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="row col-12 text-right">
                  <div className="col-9 mb-2">
                    <TooltipMaker variable="Seeds per Pound" zone={crop.Zone}>
                      <Typography variant="body1">Seeds Per Lb</Typography>
                    </TooltipMaker>
                  </div>
                  <div className="mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">{crop['Seeds per Pound']}</Typography>
                    </div>
                  </div>

                  <div className="col-9 mb-2">
                    <TooltipMaker variable="Seed Price per Pound" zone={crop.Zone}>
                      <Typography variant="body1">Seed Price Per Lb</Typography>
                    </TooltipMaker>
                  </div>
                  <div className="mb-2">
                    <div className="blue-bg no-bg">
                      <RenderSeedPriceIcons val={crop['Seed Price per Pound']} />
                    </div>
                  </div>

                  <div className="col-9 mb-2">
                    <Typography variant="body1">Base Seeding Rate (Lbs/A)</Typography>
                  </div>
                  <div className="mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">
                        {`${crop['Base Seeding Rate Min (lbs/A)']} - ${crop['Base Seeding Rate Max (lbs/A)']}`}
                      </Typography>
                    </div>
                  </div>

                  <div className="col-9 mb-2">
                    <Typography variant="body1">Drilled Depth</Typography>
                  </div>
                  <div className="mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">
                        {`${crop['Drilled Depth Min']}" - ${crop['Drilled Depth Max']}"`}
                      </Typography>
                    </div>
                  </div>

                  <div className="col-9 mb-2">
                    <TooltipMaker variable="Can Aerial Seed?" zone={crop.Zone}>
                      <Typography variant="body1">Can Aerial Seed?</Typography>
                    </TooltipMaker>
                  </div>
                  <div className="mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">
                        {crop['Aerial Seeding'] ? 'Yes' : 'No'}
                      </Typography>
                    </div>
                  </div>

                  <div className="col-9 mb-2">
                    <TooltipMaker variable="Frost Seeding" zone={crop.Zone}>
                      <Typography variant="body1">Can Frost Seed?</Typography>
                    </TooltipMaker>
                  </div>
                  <div className="mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">
                        {crop['Frost Seeding'] ? 'Yes' : 'No'}
                      </Typography>
                    </div>
                  </div>

                  <div className="col-9 mb-2">
                    <TooltipMaker variable="Min Germination Temp (F)" zone={crop.Zone}>
                      <Typography variant="body1">Min Germination Temp (&deg;F)</Typography>
                    </TooltipMaker>
                  </div>
                  <div className="mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">{crop['Min Germination Temp (F)']}</Typography>
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <TerminationInfo crop={crop} />
      </div>

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
                            {MonthDayString('reliable', crop)}
                          </Typography>
                        </div>
                        <div className="blue-bg shrt_perennial wd-110">
                          <Typography variant="body1">
                            {MonthDayString('reliable-second', crop)}
                          </Typography>
                        </div>
                      </div>
                      ) : (
                        <div className="blue-bg shrt_perennial wd-110">
                          <Typography variant="body1">
                            {MonthDayString('reliable', crop)}
                          </Typography>
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
                            {MonthDayString('temperature', crop)}
                          </Typography>
                        </div>
                        <div className="blue-bg shrt_perennial wd-110">
                          <Typography variant="body1">
                            {MonthDayString('temperature-second', crop)}
                          </Typography>
                        </div>
                      </div>
                      ) : (
                        <div className="blue-bg shrt_perennial wd-110">
                          <Typography variant="body1">
                            {MonthDayString('temperature', crop)}
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
                            <td
                              key={index}
                              className="text-center"
                            >
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

      <div className="row otherRows mb-4 avoidPage">
        <div className="col-12 basicAgWrapper">
          <div className="col-12 otherHeaderRow p-0" style={{ marginTop: '1em' }}>
            <Accordion defaultExpanded style={{ border: '1px solid #2b7b79' }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                classes={{ expanded: classes.expanded }}
              >
                <Typography variant="h6" className="px-3 py-2" style={{ border: '0px' }}>
                  Extended Comments
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <RenderExtendedComments crop={crop} />
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>

      <div className="row otherRows mb-4 avoidPage">
        <div className="col-12 basicAgWrapper">
          <div className="col-12 otherHeaderRow p-0" style={{ marginTop: '1em' }}>
            <Accordion defaultExpanded style={{ border: '1px solid #2b7b79' }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                classes={{ expanded: classes.expanded }}
              >
                <Typography variant="h6" className="px-3 py-2" style={{ border: '0px' }}>
                  References & Resources
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" className="p-3">
                  {currentSources.length > 0
                    ? currentSources.map((source, index) => (
                      <Fragment key={index}>
                        <a
                          style={{
                            textDecoration: 'underline',
                            color: 'black',
                            fontWeight: 'bolder',
                          }}
                          href={source.URL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {source['Resource Name']}
                        </a>
                        ,
                        {' '}
                        {source['Institution or Author']}
                        <br />
                      </Fragment>
                    ))
                    : ''}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  ) : (
    ''
  );
};

export default InformationSheetContent;
