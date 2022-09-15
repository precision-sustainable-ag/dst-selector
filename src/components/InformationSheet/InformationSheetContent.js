/*
  Contains the top level information sheet popup 
  BasicCrop contains the default crop
  getMonthDayString gets the start and end dates used in the info sheet
  RenderExtendedComments returns the extended notes for a crop if they exist
  styled using makeStyles and withStyles
*/

import { AccordionDetails, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import withStyles from '@mui/styles/withStyles';
import { ExpandMore, FiberManualRecord } from '@mui/icons-material';
import moment from 'moment-timezone';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import {
  allMonths,
  getActiveCropMonths,
  getRating,
  RenderSeedPriceIcons,
} from '../../shared/constants';
import { Context } from '../../store/Store';
import CropSelectorCalendarView from '../CropSelector/CropSelectorCalendarView';
import PhotoComponent from './PhotoComponent';
import SoilDrainageTimeline from './SoilDrainageTimeline';
import sources from '../../shared/json/sources/sources.json';
import TooltipMaker from './TooltipMaker';

const Accordion = withStyles({
  root: {
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    borderBottom: '1px solid #2b7b79',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '4px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  expanded: {
    '&$expanded': {
      margin: '4px 0',
    },
  },
}));

const InformationSheetContent = (props) => {
  const InfoGoals = ({ attribute, alternate }) =>
    crop[attribute] ? (
      <div className="col-6 mb-2 row">
        <span className="col">
          <TooltipMaker variable={attribute} zone={crop['Zone']}>
            <Typography variant="body1">{attribute}</Typography>
          </TooltipMaker>
        </span>
        <span>{getRating(crop[attribute] || crop[alternate])}</span>
      </div>
    ) : null; // InfoGoals

  const InfoWeeds = ({ attribute }) => (
    <>
      <div className="col-9 mb-2">
        <TooltipMaker variable={attribute} zone={crop['Zone']}>
          <Typography variant="body1">{attribute}</Typography>
        </TooltipMaker>
      </div>
      <div className="mb-2">{getRating(crop[attribute])}</div>
    </>
  ); // InfoWeeds

  const InfoEnvironmentalTermination = ({
    attribute,
    text = attribute.replace(/\bat\b/, 'At'),
    variable,
  }) => (
    <>
      <div className="col-8 mb-2">
        <TooltipMaker variable={variable} zone={crop['Zone']}>
          <Typography variant="body1">{text}</Typography>
        </TooltipMaker>
      </div>
      <div className="mb-2">{getRating(crop[attribute])}</div>
    </>
  ); // InfoEnvironmentalTermination

  const { state } = useContext(Context);
  const section = window.location.href.includes('selector') ? 'selector' : 'explorer';
  const zone = state[section].zone;
  const crop = props.crop;
  const classes = useStyles();
  const [currentSources, setCurrentSources] = useState([{}]);

  const [pdf, setPDF] = useState(false);

  useEffect(() => {
    document.title = crop['Cover Crop Name'] + ' Zone ' + zone;
    fetch(`/pdf/${document.title}.pdf`)
      .then((response) => response.text())
      .then((data) => {
        if (data.includes('PDF')) {
          setPDF(true);
        }
      });

    const regex = /(?!\B"[^"]*),(?![^"]*"\B)/g;
    const removeDoubleQuotes = /^"(.+(?="$))"$/;
    const relevantZones = sources.filter((source, index) => {
      let zones = source.Zone.split(',').map((item) => item.trim());
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
      {pdf && (
        <>
          <iframe id="PDF" title="pdf" src={`/pdf/${document.title}.pdf`} />
        </>
      )}
      <div className="row coverCropDescriptionWrapper avoidPage">
        <div className="col-12 p-0">
          <Typography variant="h6" className="text-uppercase px-3 py-2">
            Cover Crop Description
          </Typography>

          <Typography variant="body1" className="p-3">
            {crop['Cover Crop Description']
              ? crop['Cover Crop Description']
              : crop['Crop Description']}
          </Typography>
        </div>
      </div>

      <div
        className="d-flex justify-content-center mt-2 mb-2 photosWrapper avoidPage"
        style={{
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          flexWrap: 'nowrap',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <PhotoComponent imageData={crop['Image Data'] ? crop['Image Data'] : null} />
      </div>

      <div className="row mt-2 coverCropGoalsWrapper avoidPage">
        <div className="col-12 p-0">
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore />} classes={{ expanded: classes.expanded }}>
              <Typography variant="h6" className="text-uppercase px-3 py-2">
                Goals
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="row col-12 text-right">
                <div className="col-6 mb-2 row">
                  <span className="col">
                    <TooltipMaker variable="Growing Window" zone={crop['Zone']}>
                      <Typography variant="body1">Growing Window</Typography>
                    </TooltipMaker>
                  </span>
                  {/* <span className="col-3">{crop["Growing Window"]}</span> */}
                  <span>
                    <div className="blue-bg">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '20px',
                        }}
                      >
                        <Typography variant="body1">{crop['Growing Window']}</Typography>
                      </div>
                    </div>
                  </span>
                </div>
                <InfoGoals attribute="Penetrates Plow Pan" />
                <InfoGoals attribute="Nitrogen Scavenging" />
                <InfoGoals attribute="Reduces Surface Compaction" />
                <InfoGoals attribute="Lasting Residue" />
                <InfoGoals attribute="Improve Soil Organic Matter" />
                <InfoGoals attribute="Prevent Fall Soil Erosion" />
                <InfoGoals
                  attribute="Increase Soil Aggregation"
                  alternate="Improve Soil Aggregation"
                />
                <InfoGoals attribute="Prevent Spring Soil Erosion" />
                <InfoGoals attribute="Good Grazing" />
                <InfoGoals attribute="Forage Harvest Value" />
                <InfoGoals attribute="Pollinator Food" />
                <InfoGoals attribute="Nitrogen Fixation" />
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>

      <div className="row otherRows mb-4 avoidPage">
        <div className="col-7 col-lg-6 weedsRowWrapper" style={{ marginTop: '1em' }}>
          <Accordion defaultExpanded style={{ border: '1px solid #2b7b79' }}>
            <AccordionSummary expandIcon={<ExpandMore />} classes={{ expanded: classes.expanded }}>
              <div className="col-12 otherHeaderRow p-0">
                <Typography variant="h6" className="px-3 py-2 text-uppercase">
                  Weeds
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className="row col-12 text-right">
                <InfoWeeds attribute="Residue Suppresses Summer Annual Weeds" />
                <InfoWeeds attribute="Outcompetes Summer Annual Weeds" />
                <InfoWeeds attribute="Suppresses Winter Annual Weeds" />
                <InfoWeeds attribute="Persistence" />
                <InfoWeeds attribute="Volunteer Establishment" />
              </div>
            </AccordionDetails>
          </Accordion>
        </div>

        <div className="col-5 col-lg-6 envTolWrapper" style={{ marginTop: '1em' }}>
          <Accordion defaultExpanded style={{ border: '1px solid #2b7b79' }}>
            <AccordionSummary expandIcon={<ExpandMore />} classes={{ expanded: classes.expanded }}>
              <div className="col-12 otherHeaderRow p-0">
                <Typography variant="h6" className="px-3 py-2 text-uppercase">
                  Environmental&nbsp;Tolerances
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className="row col-12 text-right">
                <InfoEnvironmentalTermination
                  attribute="Low Fertility"
                  variable="Low Fertility Tolerance"
                />
                <InfoEnvironmentalTermination attribute="Drought" variable="Drought Tolerance" />
                <InfoEnvironmentalTermination attribute="Heat" variable="Heat Tolerance" />
                <InfoEnvironmentalTermination attribute="Shade" variable="Shade Tolerance" />
                <InfoEnvironmentalTermination attribute="Flood" variable="Flood Tolerance" />
                <InfoEnvironmentalTermination attribute="Salinity" variable="Salinity Tolerance" />
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>

      <div className="row otherRows mb-4 avoidPage">
        <div className="col-7 col-lg-6 basicAgWrapper">
          <div className="col-12 otherHeaderRow p-0" style={{ marginTop: '1em', float: 'left' }}>
            <Accordion defaultExpanded style={{ border: '1px solid #2b7b79' }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                classes={{ expanded: classes.expanded }}
              >
                <Typography variant="h6" className="px-3 py-2" style={{ border: '0px' }}>
                  Growth Traits
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="row col-12 text-right">
                  <div className="col-9 mb-2">
                    <TooltipMaker variable="Duration" zone={crop['Zone']}>
                      <Typography variant="body1">Duration</Typography>
                    </TooltipMaker>
                  </div>
                  <div className="mb-2">
                    <div
                      className={`blue-bg ${
                        crop['Duration'].includes('Short-lived Perennial') ? `shrt_perennial` : ``
                      }`}
                    >
                      <Typography variant="body1">{crop['Duration'].toString()}</Typography>
                    </div>
                  </div>

                  <div className="col-9 mb-2">
                    <TooltipMaker variable="Zone Use" zone={crop['Zone']}>
                      <Typography variant="body1">Zone Use</Typography>
                    </TooltipMaker>
                  </div>
                  <div className="mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">{crop['Zone Use']}</Typography>
                    </div>
                  </div>

                  <div className="col-9 mb-2">
                    <TooltipMaker variable="Shape & Orientation" zone={crop['Zone']}>
                      <Typography variant="body1">Shape And Orientation</Typography>
                    </TooltipMaker>
                  </div>
                  <div className="mb-2">
                    <div
                      className={`blueBgFlex ${
                        crop['Shape & Orientation'].length > 1 ? `borderWrapped` : ``
                      }`}
                    >
                      {crop['Shape & Orientation'].map((val, index) => (
                        <div className="blue-bg bordered" key={index}>
                          <Typography variant="body1">{val}</Typography>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* <div className="col-9 mb-2">
                    <Typography variant="body1">C:N</Typography>
                  </div>
                  <div className="col-3 mb-2">
                    {getRating(crop["C to N Ratio"])}
                  </div> */}

                  <div className="col-9 mb-2">
                    <Typography variant="body1">Dry Matter (Lbs/A/Yr)</Typography>
                  </div>
                  <div className="mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">
                        {`${crop['Dry Matter Min (lbs/A/y)']} - ${crop['Dry Matter Max (lbs/A/y)']}`}
                      </Typography>
                    </div>
                  </div>

                  <div className="col-9 mb-2">
                    <TooltipMaker variable="Soil Textures" zone={crop['Zone']}>
                      <Typography variant="body1">Soil Texture</Typography>
                    </TooltipMaker>
                  </div>
                  <div className="mb-2 text-capitalize">
                    <div
                      className={`blueBgFlex ${
                        crop['Soil Textures'].length > 1 ? `borderWrapped` : ``
                      }`}
                    >
                      {crop['Soil Textures'].map((val, index) => (
                        <div className="blue-bg bordered" key={index}>
                          <Typography variant="body1">{val}</Typography>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-9 mb-2">
                    <Typography variant="body1">Soil pH</Typography>
                  </div>
                  <div className="mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">
                        {`${crop['Minimum Tolerant Soil pH']} - ${crop['Maximum Tolerant Soil pH']}`}
                      </Typography>
                    </div>
                  </div>

                  <div className="col-9 mb-2">
                    <TooltipMaker variable="Soil Moisture Use" zone={crop['Zone']}>
                      <Typography variant="body1">Soil Moisture Use</Typography>
                    </TooltipMaker>
                  </div>
                  <div className="mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">{crop['Soil Moisture Use']}</Typography>
                    </div>
                  </div>

                  <div className="col-9 mb-2">
                    <TooltipMaker variable="Hessian Fly-Free Date" zone={crop['Zone']}>
                      <Typography variant="body1">Hessian Fly Free Date?</Typography>
                    </TooltipMaker>
                  </div>
                  <div className="mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">
                        {crop['Hessian Fly Free Date'] ? crop['Hessian Fly Free Date'] : 'No'}
                      </Typography>
                    </div>
                  </div>

                  {crop['Nitrogen Accumulation Max, Legumes (lbs/A/y)'] ? (
                    <Fragment>
                      <div className="col-9 mb-2">
                        <Typography variant="body1">Nitrogen Accumulation (Lbs/A/Yr)</Typography>
                      </div>
                      <div className="mb-2">
                        <div className="blue-bg">
                          <Typography variant="body1">
                            {`${crop['Nitrogen Accumulation Min, Legumes (lbs/A/y)']} - ${crop['Nitrogen Accumulation Max, Legumes (lbs/A/y)']}`}
                          </Typography>
                        </div>
                      </div>
                    </Fragment>
                  ) : (
                    ''
                  )}

                  <div className="col-9 mb-2">
                    <TooltipMaker variable="Ease of Establishment" zone={crop['Zone']}>
                      <Typography variant="body1">Ease Of Establishment</Typography>
                    </TooltipMaker>
                  </div>
                  <div className="mb-2">{getRating(crop['Ease of Establishment'])}</div>

                  <div className="col-9 mb-2">
                    <TooltipMaker variable="Establishes Quickly" zone={crop['Zone']}>
                      <Typography variant="body1">Establishes Quickly</Typography>
                    </TooltipMaker>
                  </div>
                  <div className="mb-2">{getRating(crop['Establishes Quickly'])}</div>

                  <div className="col-9 mb-2">
                    <TooltipMaker variable="Early Spring Growth" zone={crop['Zone']}>
                      <Typography variant="body1">Early Spring Growth</Typography>
                    </TooltipMaker>
                  </div>
                  <div className="mb-2">{getRating(crop['Early Spring Growth'])}</div>

                  <div className="col-9 mb-2">
                    <TooltipMaker variable="Flowering Trigger" zone={crop['Zone']}>
                      <Typography variant="body1">Flowering Trigger</Typography>
                    </TooltipMaker>
                  </div>
                  <div className="mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">{crop['Flowering Trigger']}</Typography>
                    </div>
                  </div>

                  {/* <div className="col-9 mb-2">
                    <Typography variant="body1">Root Architecture</Typography>
                  </div>
                  <div className="col-3 mb-2">
                    <div
                      className={`blueBgFlex ${
                        crop["Root Architecture"].length > 1
                          ? `borderWrapped`
                          : ``
                      }`}
                    >
                      {crop["Root Architecture"].map((val, index) => (
                        <div className="blue-bg bordered" key={index}>
                          <Typography
                            variant="body1"
                            className="text-capitalize"
                          >
                            {val}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  </div> */}

                  <div className="col-9 mb-2">
                    <TooltipMaker variable="Root Depth" zone={crop['Zone']}>
                      <Typography variant="body1">Root Depth</Typography>
                    </TooltipMaker>
                  </div>
                  <div className="mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">{crop['Root Depth']}</Typography>
                    </div>
                  </div>

                  {crop['Inoculant Type'][0] !== 'none' ? (
                    <Fragment>
                      <div className="col-9 mb-2">
                        <TooltipMaker variable="Innoculant Type" zone={crop['Zone']}>
                          <Typography variant="body1">Inoculant Type</Typography>
                        </TooltipMaker>
                      </div>
                      <div className="mb-2">
                        <div
                          className={`blueBgFlex ${
                            crop['Inoculant Type'].length > 1 ? `borderWrapped` : ``
                          }`}
                        >
                          {crop['Inoculant Type'].map((val, index) => (
                            <div
                              className="blue-bg bordered"
                              key={index}
                              style={{ height: 'auto', maxHeight: 'auto' }}
                            >
                              <Typography variant="body2" className="text-capitalize">
                                {val}
                              </Typography>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Fragment>
                  ) : (
                    ''
                  )}
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>

        <div className="col-5 col-lg-6 basicAgWrapper">
          <div className="col-12 otherHeaderRow p-0" style={{ marginTop: '1em', float: 'left' }}>
            <Accordion defaultExpanded style={{ border: '1px solid #2b7b79' }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                classes={{ expanded: classes.expanded }}
              >
                <Typography variant="h6" className="px-3 py-2" style={{ border: '0px' }}>
                  Soil Drainage
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="col-12 text-right">
                  <SoilDrainageTimeline drainage={crop['Soil Drainage']} />
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
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
                    <TooltipMaker variable="Seeds per Pound" zone={crop['Zone']}>
                      <Typography variant="body1">Seeds Per Lb</Typography>
                    </TooltipMaker>
                  </div>
                  <div className="mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">{crop['Seeds per Pound']}</Typography>
                    </div>
                  </div>

                  <div className="col-9 mb-2">
                    <TooltipMaker variable="Seed Price per Pound" zone={crop['Zone']}>
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
                    <TooltipMaker variable="Can Aerial Seed?" zone={crop['Zone']}>
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
                    <TooltipMaker variable="Frost Seeding" zone={crop['Zone']}>
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
                    <TooltipMaker variable="Min Germination Temp (F)" zone={crop['Zone']}>
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
        <div className="col-5 col-lg-6 basicAgWrapper">
          <div className="col-12 otherHeaderRow p-0" style={{ marginTop: '1em' }}>
            <Accordion defaultExpanded style={{ border: '1px solid #2b7b79' }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                classes={{ expanded: classes.expanded }}
              >
                <Typography variant="h6" className="px-3 py-2" style={{ border: '0px' }}>
                  Termination
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="row col-12 text-right">
                  <InfoEnvironmentalTermination
                    attribute="Tillage at Vegetative"
                    variable="Tillage Termination at Vegetative"
                  />
                  <InfoEnvironmentalTermination
                    attribute="Tillage at Flowering"
                    variable="Tillage Termination at Flowering"
                  />
                  <InfoEnvironmentalTermination
                    attribute="Freezing at Vegetative"
                    variable="Freezing Termination at Vegetative"
                  />
                  <InfoEnvironmentalTermination
                    attribute="Freezing at Flowering"
                    variable="Freezing Termination at Flowering"
                  />
                  <InfoEnvironmentalTermination
                    attribute="Chemical at Vegetative"
                    variable="Chemical Termination at Vegetative"
                  />
                  <InfoEnvironmentalTermination
                    attribute="Chemical at Flowering"
                    variable="Chemical Termination at Flowering"
                  />
                  <InfoEnvironmentalTermination
                    attribute="Mow at Flowering"
                    variable="Mow Termination at Flowering"
                  />
                  <InfoEnvironmentalTermination
                    attribute="Roller Crimp Termination at Flowering"
                    text="Roller-Crimp At Flowering"
                    variable="Roller Crimp Termination at Flowering"
                  />
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
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
                    {crop['Second Reliable Establishment/Growth Start'] &&
                    crop['Second Reliable Establishment/Growth End'] ? (
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
                        <Typography variant="body1">
                          {getMonthDayString('reliable', crop)}
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
                    {crop['Second Temperature/Moisture Risk to Establishment Start'] &&
                    crop['Second Temperature/Moisture Risk to Establishment End'] ? (
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
                        crop['Active Growth Period'].length > 1 ? `borderWrapped` : ``
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
                                  ? `#598445`
                                  : `#f0f7eb`,
                                // width: "100%",
                                height: '20px',
                                borderRight: `${month !== 'Dec' ? `2px solid white` : ``}`,
                              }}
                              key={`growth-${index}`}
                            ></td>
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
                          <CropSelectorCalendarView data={{ fields: crop }} from={'infosheet'} />
                        </tr>
                        <tr>
                          {allMonths.map((month, index) => {
                            return (
                              <td
                                key={index}
                                className={`${
                                  month === 'Jan' || month === 'Dec'
                                    ? month === 'Jan'
                                      ? `text-center`
                                      : `text-center`
                                    : `text-center`
                                }`}
                              >
                                <Typography variant="body1">{month}</Typography>
                              </td>
                            );
                          })}
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
                            href={source['URL']}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {source['Resource Name']}
                          </a>
                          , {source['Institution or Author']}
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

const getMonthDayString = (type = '', crop = {}) => {
  switch (type) {
    case 'reliable': {
      const startDate = moment(crop['Reliable Establishment/Growth Start'], 'YYYY-MM-DD');
      const endDate = moment(crop['Reliable Establishment/Growth End'], 'YYYY-MM-DD');

      return `${startDate.format('MM/DD')} - ${endDate.format('MM/DD')}`;
    }
    case 'reliable-second': {
      const startDate = moment(crop['Second Reliable Establishment/Growth Start'], 'YYYY-MM-DD');
      const endDate = moment(crop['Second Reliable Establishment/Growth End'], 'YYYY-MM-DD');

      return `${startDate.format('MM/DD')} - ${endDate.format('MM/DD')}`;
    }
    case 'temperature': {
      if (
        crop['Temperature/Moisture Risk to Establishment Start'] &&
        crop['Temperature/Moisture Risk to Establishment End']
      ) {
        const startDate = moment(
          crop['Temperature/Moisture Risk to Establishment Start'],
          'YYYY-MM-DD',
        );
        const endDate = moment(
          crop['Temperature/Moisture Risk to Establishment End'],
          'YYYY-MM-DD',
        );
        return `${startDate.format('MM/DD')} - ${endDate.format('MM/DD')}`;
      } else {
        return 'N/A';
      }
    }
    case 'temperature-second': {
      const startDate = moment(
        crop['Second Temperature/Moisture Risk to Establishment Start'],
        'YYYY-MM-DD',
      );
      const endDate = moment(
        crop['Second Temperature/Moisture Risk to Establishment End'],
        'YYYY-MM-DD',
      );
      return `${startDate.format('MM/DD')} - ${endDate.format('MM/DD')}`;
    }
    default:
      return '';
  }
};

const RenderExtendedComments = ({ crop = {} }) => {
  const allKeysWithNotes = Object.keys(crop)
    .filter((key) => key.includes('Notes:'))
    .map((str) => {
      return { key: str, name: str.split(':')[1].trimStart() };
    });

  return allKeysWithNotes.length > 0 ? (
    <div className="row">
      {allKeysWithNotes.map((obj, index) => (
        <div key={'notesKey-' + index} className="col-12">
          <Typography variant="body1" className="p-3">
            <b>{obj.name}:</b> {crop[obj.key]}
          </Typography>
        </div>
      ))}
    </div>
  ) : (
    <div className="row">
      <div className="col-12">
        <Typography variant="body1" className="p-3">
          No Data
        </Typography>
      </div>
    </div>
  );
};
