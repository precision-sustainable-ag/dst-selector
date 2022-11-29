import React from 'react';
import { AccordionDetails, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { getRating } from '../../../shared/constants';
import { Accordion, AccordionSummary, useStyles } from '../informationSheet.styles';
import TooltipMaker from '../../../components/TooltipMaker/TooltipMaker';

const GrowthTraits = ({ crop }) => {
  const classes = useStyles();

  return (
    <div className="col-7 col-lg-6 basicAgWrapper">
      <div className="col-12 otherHeaderRow p-0" style={{ marginTop: '1em', float: 'left' }}>
        <Accordion defaultExpanded style={{ border: '1px solid #2b7b79' }}>
          <AccordionSummary expandIcon={<ExpandMore />} classes={{ expanded: classes.expanded }}>
            <Typography variant="h6" className="px-3 py-2" style={{ border: '0px' }}>
              Growth Traits
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="row col-12 text-left">
              <div className="col-7 mb-2">
                <TooltipMaker variable="Duration" zone={crop.Zone}>
                  <Typography variant="body1">Duration</Typography>
                </TooltipMaker>
              </div>
              <div className="mb-2">
                <div
                  className={`blue-bg ${
                    crop.Duration.includes('Short-lived Perennial') ? 'shrt_perennial' : ''
                  }`}
                >
                  <Typography variant="body1">{crop.Duration.toString()}</Typography>
                </div>
              </div>

              <div className="col-7 mb-2">
                <TooltipMaker variable="Zone Use" zone={crop.Zone}>
                  <Typography variant="body1">Zone Use</Typography>
                </TooltipMaker>
              </div>
              <div className="mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">{crop['Zone Use']}</Typography>
                </div>
              </div>

              <div className="col-7 mb-2">
                <TooltipMaker variable="Shape & Orientation" zone={crop.Zone}>
                  <Typography variant="body1">Shape And Orientation</Typography>
                </TooltipMaker>
              </div>
              <div className="mb-2">
                <div
                  className={`blueBgFlex ${
                    crop['Shape & Orientation'].length > 1 ? 'borderWrapped' : ''
                  }`}
                >
                  {crop['Shape & Orientation'].map((val, index) => (
                    <div className="blue-bg bordered" key={index}>
                      <Typography variant="body1">{val}</Typography>
                    </div>
                  ))}
                </div>
              </div>

              {/* <div className="col-7 mb-2">
                    <Typography variant="body1">C:N</Typography>
                  </div>
                  <div className="col-3 mb-2">
                    {getRating(crop["C to N Ratio"])}
                  </div> */}

              <div className="col-7 mb-2">
                <Typography variant="body1">Dry Matter (Lbs/A/Yr)</Typography>
              </div>
              <div className="mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">
                    {`${crop['Dry Matter Min (lbs/A/y)']} - ${crop['Dry Matter Max (lbs/A/y)']}`}
                  </Typography>
                </div>
              </div>

              <div className="col-7 mb-2">
                <TooltipMaker variable="Soil Textures" zone={crop.Zone}>
                  <Typography variant="body1">Soil Texture</Typography>
                </TooltipMaker>
              </div>
              <div className="mb-2 text-capitalize">
                <div
                  className={`blueBgFlex ${
                    crop['Soil Textures'].length > 1 ? 'borderWrapped' : ''
                  }`}
                >
                  {crop['Soil Textures'].map((val, index) => (
                    <div className="blue-bg bordered" key={index}>
                      <Typography variant="body1">{val}</Typography>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-7 mb-2">
                <Typography variant="body1">Soil pH</Typography>
              </div>
              <div className="mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">
                    {`${crop['Minimum Tolerant Soil pH']} - ${crop['Maximum Tolerant Soil pH']}`}
                  </Typography>
                </div>
              </div>

              <div className="col-7 mb-2">
                <TooltipMaker variable="Soil Moisture Use" zone={crop.Zone}>
                  <Typography variant="body1">Soil Moisture Use</Typography>
                </TooltipMaker>
              </div>
              <div className="mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">{crop['Soil Moisture Use']}</Typography>
                </div>
              </div>

              <div className="col-7 mb-2">
                <TooltipMaker variable="Hessian Fly-Free Date" zone={crop.Zone}>
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
                <>
                  <div className="col-7 mb-2">
                    <Typography variant="body1">Nitrogen Accumulation (Lbs/A/Yr)</Typography>
                  </div>
                  <div className="mb-2">
                    <div className="blue-bg">
                      <Typography variant="body1">
                        {`${crop['Nitrogen Accumulation Min, Legumes (lbs/A/y)']} - ${crop['Nitrogen Accumulation Max, Legumes (lbs/A/y)']}`}
                      </Typography>
                    </div>
                  </div>
                </>
              ) : (
                ''
              )}

              <div className="col-7 mb-2">
                <TooltipMaker variable="Ease of Establishment" zone={crop.Zone}>
                  <Typography variant="body1">Ease Of Establishment</Typography>
                </TooltipMaker>
              </div>
              <div className="mb-2">{getRating(crop['Ease of Establishment'])}</div>

              <div className="col-7 mb-2">
                <TooltipMaker variable="Establishes Quickly" zone={crop.Zone}>
                  <Typography variant="body1">Establishes Quickly</Typography>
                </TooltipMaker>
              </div>
              <div className="mb-2">{getRating(crop['Establishes Quickly'])}</div>

              <div className="col-7 mb-2">
                <TooltipMaker variable="Early Spring Growth" zone={crop.Zone}>
                  <Typography variant="body1">Early Spring Growth</Typography>
                </TooltipMaker>
              </div>
              <div className="mb-2">{getRating(crop['Early Spring Growth'])}</div>

              <div className="col-7 mb-2">
                <TooltipMaker variable="Flowering Trigger" zone={crop.Zone}>
                  <Typography variant="body1">Flowering Trigger</Typography>
                </TooltipMaker>
              </div>
              <div className="mb-2">
                <div
                  className={`blueBgFlex ${
                    crop['Flowering Trigger']?.length > 1 ? 'borderWrapped' : ''
                  }`}
                >
                  {crop['Flowering Trigger']?.map((val, index) => (
                    <div className="blue-bg bordered" key={index}>
                      <Typography variant="body1">{val}</Typography>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-7 mb-2">
                <TooltipMaker variable="Root Depth" zone={crop.Zone}>
                  <Typography variant="body1">Root Depth</Typography>
                </TooltipMaker>
              </div>
              <div className="mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">{crop['Root Depth']}</Typography>
                </div>
              </div>

              {crop['Inoculant Type'][0] !== 'none' ? (
                <>
                  <div className="col-7 mb-2">
                    <TooltipMaker variable="Innoculant Type" zone={crop.Zone}>
                      <Typography variant="body1">Inoculant Type</Typography>
                    </TooltipMaker>
                  </div>
                  <div className="mb-2">
                    <div
                      className={`blueBgFlex ${
                        crop['Inoculant Type'].length > 1 ? 'borderWrapped' : ''
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
                </>
              ) : (
                ''
              )}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default GrowthTraits;
