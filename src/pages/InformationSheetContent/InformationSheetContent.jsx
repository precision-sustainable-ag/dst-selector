/* eslint-disable max-len */
/*
  Contains the top level information sheet popup
  BasicCrop contains the default crop
  getMonthDayString gets the start and end dates used in the info sheet
  RenderExtendedComments returns the extended notes for a crop if they exist
*/

import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { ExpandMore } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import CoverCropInformation from './CoverCropInformation/CoverCropInformation';
import InformationSheetReferences from './InformationSheetReferences/InformationSheetReferences';
import { callCoverCropApi, extractData } from '../../shared/constants';
import pirschAnalytics from '../../shared/analytics';
import PSATooltip from '../../components/PSAComponents/PSATooltip';

const InformationSheetContent = ({ crop, modalData }) => {
  // used to know if the user is in mobile mode
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // redux vars
  const regionIdRedux = useSelector((stateRedux) => stateRedux.mapData.regionId);
  const stateIdRedux = useSelector((stateRedux) => stateRedux.mapData.stateId);
  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);
  const filterStateRedux = useSelector((stateRedux) => stateRedux.filterData);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);

  // useState vars
  const [currentSources, setCurrentSources] = useState([{}]);
  const [allThumbs, setAllThumbs] = useState([]);
  const [dataDone, setDataDone] = useState(false);

  const query = `${encodeURIComponent('regions')}=${encodeURIComponent(regionIdRedux)}`;

  const tooltipContent = (att) => (
    <Typography sx={{ fontWeight: 'bold' }} variant="body1">
      {att.label}
    </Typography>
  );

  const tooltipContentCategorize = (cat, att) => (
    cat.label !== 'Extended Comments' ? (
      <Box xs={12} variant="body1">
        <Typography
          display="flex"
          justifyContent="center"
          sx={{ fontWeight: 'bold' }}
        >
          {att.label}
        </Typography>
        <Typography display="flex" justifyContent="center">
          {att.values[0]?.value}
        </Typography>
      </Box>
    ) : (
      <Box xs={12} variant="body1">
        <Typography
          display="flex"
          justifyContent="left"
          sx={{ fontWeight: 'bold' }}
        >
          {att.label}
        </Typography>
        <Typography display="flex" justifyContent="left">
          {att.values[0]?.value}
        </Typography>
      </Box>
    )
  );

  useEffect(() => {
    if (stateIdRedux && regionIdRedux) {
      callCoverCropApi(
        `https://${apiBaseUrlRedux}.covercrop-selector.org/v1/crops/${crop?.id}/resources?${query}`,
      ).then((data) => setCurrentSources(data.data));
      callCoverCropApi(
        `https://${apiBaseUrlRedux}.covercrop-selector.org/v1/crops/${crop?.id}/images?${query}`,
      ).then((data) => {
        setAllThumbs(data.data);
        setDataDone(true);
      });
    }
  }, [crop, filterStateRedux]);

  useEffect(() => {
    pirschAnalytics('Visited Page', { meta: { visited: 'Information Sheet' } });
  }, []);

  return (
    dataDone === true && (
      <>
        <CoverCropInformation allThumbs={allThumbs} crop={modalData} />
        {modalData
          && modalData.data.map((cat, index) => (
            <Grid item key={index} xs={12}>
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  sx={{
                    '&$expanded': {
                      margin: '4px 0',
                    },
                  }}
                >
                  <Typography variant="h4" style={{ padding: '3px' }}>
                    {cat.label}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {' '}
                  <Grid container>
                    {cat.attributes.map((att, catIndex) => (!att.label.startsWith('Comments')
                      && !att.label.startsWith('Notes:')
                      && cat.label !== 'Extended Comments' ? (
                        <Grid
                          container
                          key={catIndex}
                          item
                          md={6}
                          sm={12}
                          direction={isMobile ? 'row' : 'column'}
                        >
                          <Grid item xs={12}>
                            <PSATooltip
                              placement="top-end"
                              enterTouchDelay={0}
                              title={att.description}
                              arrow
                              tooltipContent={tooltipContent(att)}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              style={{ paddingRight: '2rem' }}
                              display="flex"
                              justifyContent={isMobile ? 'left' : 'right'}
                              textAlign="right"
                            >
                              {extractData(att, 'infoSheet', councilShorthandRedux)}
                            </Typography>
                          </Grid>
                        </Grid>
                      ) : (
                        <Grid item key={catIndex} xs={12}>
                          <PSATooltip
                            placement="top-end"
                            enterTouchDelay={0}
                            title={att.description}
                            arrow
                            tooltipContent={tooltipContentCategorize(cat, att)}
                          />
                        </Grid>
                      )))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}

        <InformationSheetReferences currentSources={currentSources} />
      </>
    )
  );
};

export default InformationSheetContent;
