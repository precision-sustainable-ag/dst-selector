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
  Accordion, AccordionDetails, AccordionSummary, Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { Context } from '../../store/Store';
import CoverCropInformation from './CoverCropInformation/CoverCropInformation';
import InformationSheetReferences from './InformationSheetReferences/InformationSheetReferences';
import TooltipMaker from '../../components/TooltipMaker/TooltipMaker';
import { getRating } from '../../shared/constants';

const InformationSheetContent = ({ crop, modalData }) => {
  const { state } = useContext(Context);
  const section = window.location.href.includes('species-selector') ? 'selector' : 'explorer';
  const { zone } = state[section];
  const [currentSources, setCurrentSources] = useState([{}]);
  const [allThumbs, setAllThumbs] = useState([]);
  const [dataDone, setDataDone] = useState(false);
  const query = `${encodeURIComponent('regions')}=${encodeURIComponent(state.regionId)}`;

  async function getSourceData() {
    await fetch(`https://developapi.covercrop-selector.org/v1/crops/${crop?.id}/resources?${query}`)
      .then((res) => res.json())
      .then((data) => setCurrentSources(data.data))
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }

  async function getData() {
    await fetch(`https://developapi.covercrop-selector.org/v1/crops/${crop?.id}/images?${query}`)
      .then((res) => res.json())
      .then((data) => {
        setAllThumbs(data.data);
        setDataDone(true);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }

  useEffect(() => {
    document.title = `${crop.label} Zone ${zone}`;
    getSourceData();
    getData();
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
                          <TooltipMaker variable={att.label} crop={crop} attribute={att}>
                            <Typography sx={{ fontWeight: 'bold' }} variant="body1">
                              {att.label}
                            </Typography>
                          </TooltipMaker>
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
