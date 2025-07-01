/* eslint-disable max-len */
/*
  Contains the top level information sheet popup
  BasicCrop contains the default crop
  getMonthDayString gets the start and end dates used in the info sheet
  RenderExtendedComments returns the extended notes for a crop if they exist
*/

import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Grid,
} from '@mui/material';
import { useSelector } from 'react-redux';
import {
  PSAAccordion, PSATooltip, PSAInfoSheetAttributeBox, PSALoadingSpinner,
} from 'shared-react-components/src';
import CoverCropInformation from '../CoverCropInformation/CoverCropInformation';
import InformationSheetReferences from '../InformationSheetReferences/InformationSheetReferences';
import { callCoverCropApi, extractData } from '../../../shared/constants';
import pirschAnalytics from '../../../shared/analytics';

const InformationSheetContent = ({ crop }) => {
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const selectedSeason = useSelector((stateRedux) => stateRedux.terminationData.selectedSeason);
  const selectedDuration = useSelector((stateRedux) => stateRedux.terminationData.selectedDuration);
  const selectedIrrigation = useSelector((stateRedux) => stateRedux.terminationData.selectedIrrigation);
  const tagsRedux = useSelector((stateRedux) => stateRedux.terminationData.tags);
  const stateIdRedux = useSelector((stateRedux) => stateRedux.mapData.stateId);
  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);
  const queryStringRedux = useSelector((stateRedux) => stateRedux.sharedData.queryString);

  const [expandedAccordions, setExpandedAccordions] = useState([]);
  const [dataDone, setDataDone] = useState(false);
  const [modalData, setModalData] = useState(null);

  // Termination checks
  const seasons = ['Spring Planted', 'Summer Planted', 'Fall Planted', 'Winter Planted'];
  const durationTypes = ['Annual', 'Perennial'];
  const irrigationType = ['Rainfed', 'Irrigated'];

  const checkTermination = (label) => {
    const labelSet = new Set(label.split(',').map((item) => item.trim()));

    if (selectedSeason && seasons.some((season) => labelSet.has(season))) {
      const seasonLabel = `${selectedSeason} Planted`;
      if (!labelSet.has(seasonLabel)) {
        return false;
      }
    }

    if (selectedDuration) {
      if (!labelSet.has(selectedDuration) && durationTypes.some((duration) => labelSet.has(duration))) {
        return false;
      }
    }

    if (selectedIrrigation) {
      if (!labelSet.has(selectedIrrigation) && irrigationType.some((irrigation) => labelSet.has(irrigation))) {
        return false;
      }
    }

    return true;
  };

  const getAttributeData = (attribute, category) => {
    // handles no attribute
    if (!attribute) {
      return <Typography variant="body2">No Data</Typography>;
    }
    // if attribute.values.label exist, return label
    if (attribute?.values[0]?.label) {
      return (
        <Typography variant="body2">{attribute?.values[0]?.label}</Typography>
      );
    }
    const attributeValues = [];
    attribute?.values.forEach((value) => {
      if (councilShorthandRedux === 'WCCC' && category === 'Termination Window' && tagsRedux.length > 0) {
        // filter attr by tags
        const { tags } = value;
        if (tags.some((tag) => tagsRedux.includes(tag))) attributeValues.push(value.value);
      } else {
        attributeValues.push(`${value.value}${attribute?.units ? ` ${attribute?.units}` : ''}`);
      }
    });
    const dataType = attribute?.dataType.label;
    return extractData(attributeValues, dataType, attribute, councilShorthandRedux);
  };

  const handleAccordion = (cat) => {
    if (expandedAccordions.includes(cat)) {
      setExpandedAccordions(expandedAccordions.filter((item) => item !== cat));
    } else setExpandedAccordions([...expandedAccordions, cat]);
  };

  useEffect(() => {
    pirschAnalytics('Visited Page', { meta: { visited: 'Information Sheet' } });
  }, []);

  useEffect(() => {
    const url = `https://${apiBaseUrlRedux}.covercrop-selector.org/v1/states/${stateIdRedux}/crops/${crop?.id}?${queryStringRedux}`;
    if (crop.id !== undefined) {
      callCoverCropApi(url).then((data) => {
        setModalData(data.data);
        setExpandedAccordions(data.data.data.map((cat) => cat.label));
      }).then(() => {
        setDataDone(true);
      });
    }
  }, [crop]);

  return (
    dataDone ? (
      <>
        <CoverCropInformation crop={modalData} />
        {modalData
          && modalData.data.map((cat, index) => {
            const isTermination = councilShorthandRedux === 'WCCC' && (cat.label === 'Termination' || cat.label === 'Termination Window');
            return (
              <Grid
                item
                key={index}
                xs={12}
                className={`avoid-break infosheetAccordion${index}`}
                sx={{ marginBottom: '16px' }}
              >
                <PSAAccordion
                  sx={{
                    border: '1px solid #e3e1e1',
                    '& .MuiAccordionDetails-root': {
                      backgroundColor: { xs: '#F5F5F5', md: 'white' },
                      borderRadius: '0 0 30px 30px',
                      padding: { xs: '0', md: '8px' },
                    },
                  }}
                  expanded={expandedAccordions.includes(cat.label)}
                  onChange={() => handleAccordion(cat.label)}
                  summaryContent={(
                    <Typography className={`infosheetAccordionButton${index}`} variant="h4" style={{ color: 'grey' }}>
                      {cat.label}
                    </Typography>
                  )}
                  detailsContent={(
                    <Grid container>
                      {cat.attributes.map((att, catIndex) => {
                        if (councilShorthandRedux === 'WCCC' && att.order === 3 && !checkTermination(att.label)) {
                          return null; // Return null to render nothing for this attribute
                        }
                        if (att.label.startsWith('Comments') || att.label.startsWith('Notes:') || cat.label === 'Extended Comments') {
                          return (
                            <Grid item key={catIndex} xs={12} sx={{ padding: '6px 18px' }}>
                              <PSATooltip
                                placement="top-end"
                                enterTouchDelay={0}
                                title={att.description}
                                arrow
                                tooltipContent={(
                                  <Box xs={12} tabIndex="0">
                                    <Typography
                                      display="flex"
                                      justifyContent={cat.label !== 'Extended Comments' ? 'center' : 'left'}
                                      sx={{ fontWeight: 'bold' }}
                                    >
                                      {att.label}
                                    </Typography>
                                    <Typography
                                      display="flex"
                                      justifyContent={cat.label !== 'Extended Comments' ? 'center' : 'left'}
                                    >
                                      {att.values[0]?.value}
                                    </Typography>
                                  </Box>
                              )}
                              />
                            </Grid>
                          );
                        }
                        return (
                          <PSAInfoSheetAttributeBox
                            variant={isTermination ? 'texts' : ''}
                            key={catIndex}
                            description={att.description}
                            label={att.label}
                            value={getAttributeData(att, cat.label)}
                          />
                        );
                      })}
                    </Grid>
                  )}
                />
              </Grid>
            );
          })}

        <InformationSheetReferences cropId={crop.id} />
      </>
    )
      : (
        <Box sx={{
          width: '1200px', height: '1000px', display: 'flex', justifyContent: 'center',
        }}
        >
          <PSALoadingSpinner />
        </Box>
      )
  );
};

export default InformationSheetContent;
