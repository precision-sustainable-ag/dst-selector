/*
  Contains the top level information sheet popup
  BasicCrop contains the default crop
  getMonthDayString gets the start and end dates used in the info sheet
  RenderExtendedComments returns the extended notes for a crop if they exist
*/

import React, {
  useContext, useEffect, useState,
} from 'react';
import {
  Accordion, AccordionDetails, AccordionSummary, Typography, Tooltip,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { Context } from '../../store/Store';
import CoverCropInformation from './CoverCropInformation/CoverCropInformation';
import InformationSheetReferences from './InformationSheetReferences/InformationSheetReferences';
import { callCoverCropApi, getRating } from '../../shared/constants';

const InformationSheetContent = ({ crop, modalData }) => {
  const { state } = useContext(Context);
  const section = window.location.href.includes('species-selector') ? 'selector' : 'explorer';
  const { zone } = state[section];

  // redux vars
  const regionIdRedux = useSelector((stateRedux) => stateRedux.mapData.regionId);
  const stateIdRedux = useSelector((stateRedux) => stateRedux.mapData.stateId);
  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);

  // useState vars
  const [currentSources, setCurrentSources] = useState([{}]);
  const [allThumbs, setAllThumbs] = useState([]);
  const [dataDone, setDataDone] = useState(false);

  const query = `${encodeURIComponent('regions')}=${encodeURIComponent(regionIdRedux)}`;

  useEffect(() => {
    document.title = `${crop.label} Zone ${zone}`;
    if (stateIdRedux && regionIdRedux) {
      callCoverCropApi(`https://${apiBaseUrlRedux}.covercrop-selector.org/v1/crops/${crop?.id}/resources?${query}`)
        .then((data) => setCurrentSources(data.data));
      callCoverCropApi(`https://${apiBaseUrlRedux}.covercrop-selector.org/v1/crops/${crop?.id}/images?${query}`)
        .then((data) => {
          setAllThumbs(data.data);
          setDataDone(true);
        });
    }
  }, [crop, zone]);

  return dataDone === true && (
    <>
      <CoverCropInformation
        allThumbs={allThumbs}
        crop={crop}
      />
      {modalData && modalData.data.map((cat) => (
        <div key={cat.id} className="row mt-2 coverCropGoalsWrapper avoidPage">
          <div className="col-12 basicAgWrapper">
            <div className="col-12 p-0">
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  sx={{
                    '&$expanded': {
                      margin: '4px 0',
                    },
                  }}
                >
                  <Typography variant="h6" className="text-uppercase px-3 py-2">
                    {cat.label}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {' '}
                  <div className="row col-12 text-left">
                    {cat.attributes.map((att) => (
                      <div className="col-6 mb-2 ml-1 row">
                        <span className="col">
                          <Tooltip
                            placement="top-end"
                            title={(
                              <div className="filterTooltip">
                                <p>{att.description}</p>
                              </div>
                          )}
                            arrow
                          >
                            <Typography sx={{ fontWeight: 'bold' }} variant="body1">
                              {att.label}
                            </Typography>
                          </Tooltip>
                        </span>
                        { att.values[0]?.dataType !== 'number' ? (
                          <Typography variant="body1">
                            <span>{att.values[0]?.value}</span>
                          </Typography>
                        ) : (
                          <span>{getRating(att.values[0]?.value)}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>
      ))}

      <InformationSheetReferences currentSources={currentSources} />
    </>
  );
};

export default InformationSheetContent;
