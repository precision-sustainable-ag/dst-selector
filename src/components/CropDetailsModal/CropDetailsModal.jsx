/*
  Handles the popup on hovering over one of the goal rankings in the crop selector
*/

import {
  Box, Grid, Typography,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CircularProgress from '@mui/material/CircularProgress';
import { Close, Print } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PSAButton, PSAModal } from 'shared-react-components/src';
import InformationSheetContent from '../../pages/InformationSheetContent/InformationSheetContent';
import { callCoverCropApi } from '../../shared/constants';
import pirschAnalytics from '../../shared/analytics';
import { snackHandler, updatePrinting } from '../../reduxStore/sharedSlice';

const CropDetailsModal = ({ crop, setModalOpen, modalOpen }) => {
  const dispatch = useDispatch();
  // redux vars
  const regionShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.regionShorthand);
  const stateIdRedux = useSelector((stateRedux) => stateRedux.mapData.stateId);
  const consentRedux = useSelector((stateRedux) => stateRedux.userData.consent);
  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);
  const queryStringRedux = useSelector((stateRedux) => stateRedux.sharedData.queryString);

  const printing = useSelector((stateRedux) => stateRedux.sharedData.printing);

  // useState vars
  const [dataDone, setDataDone] = useState(false);
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    const url = `https://${apiBaseUrlRedux}.covercrop-selector.org/v1/states/${stateIdRedux}/crops/${crop?.id}?${queryStringRedux}`;
    if (crop.id !== undefined) {
      callCoverCropApi(url).then((data) => {
        setModalData(data);
      })
        .then(() => {
          setDataDone(true);
        });
    }
  }, [crop]);

  const handleModalClose = () => {
    setModalOpen(!modalOpen);
  };

  const print = async () => {
    if (consentRedux === true) {
      pirschAnalytics('Information Sheet', {
        meta: {
          category: 'Information Sheet',
          action: 'Print',
          label: document.title,
        },
      });
    }

    const extractCSS = async () => {
      let styles = '';

      // Get styles from <style> and <link>
      document.querySelectorAll('style, link[rel="stylesheet"]').forEach((node) => {
        if (node.tagName === 'STYLE') {
          styles += node.innerHTML;
        } else if (node.tagName === 'LINK') {
          try {
            const request = new XMLHttpRequest();
            request.open('GET', node.href, false);
            request.send(null);
            styles += request.responseText;
          } catch (error) {
            throw new Error(`Could not load CSS file: ${node.href}`);
          }
        }
      });

      return styles.replace(/@media \(min-width:1536px\)/g, '@media (min-width:0px)');
    };

    try {
      dispatch(updatePrinting(true));
      await new Promise((resolve) => { setTimeout(resolve, 2000); });

      const cropDetailModal = document.querySelector('[id^=cropDetailModal]');
      const clonedModal = cropDetailModal.cloneNode(true);
      clonedModal.querySelectorAll('.attribute-value').forEach((el) => {
        if (!el.querySelector('svg')) {
          el.style.paddingRight = '32px';
        }
      });

      const fullHtml = `
        <html>
          <head>
            <style>${await extractCSS()}</style>
          </head>
          <body>${clonedModal.outerHTML}</body>
        </html>
      `;

      const response = await fetch('https://pdf.covercrop-data.org/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          html: fullHtml,
          filename: `${crop.label}%20Zone%20${regionShorthandRedux}.pdf`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const { fileUrl } = await response.json();
      window.open(fileUrl, '_blank');
    } catch (err) {
      dispatch(snackHandler({ snackOpen: true, snackMessage: `Error generating PDF: ${err}` }));
    } finally {
      dispatch(updatePrinting(false));
    }
  };

  return dataDone === true && (
    <PSAModal
      sx={{
        overflow: 'scroll',
        marginTop: '2%',
        marginBottom: '1%',
        maxWidth: '70%',
        marginLeft: '15%',
      }}
      open={modalOpen}
      onClose={handleModalClose}
      closeAfterTransition
      disableEscapeKeyDown={false}
      modalContent={(
        <Box
          sx={{
            backgroundColor: 'white',
          }}
          id={`cropDetailModal-${modalData.id}`}
        >
          <Grid container>
            <Grid container item xs={12} sx={{ backgroundColor: '#2D7B7B' }} className="no-print">
              <Grid container display="flex" alignItems="center" item xs={11}>
                <Grid item>
                  <Typography color="white" sx={{ marginLeft: '2em' }}>
                    Cover Crop Information Sheet
                  </Typography>
                </Grid>
                <Grid item>
                  <PSAButton
                    startIcon={<OpenInNewIcon />}
                    buttonType="ModalLink"
                    onClick={() => {
                      window.open('/data-dictionary', '_blank');
                    }}
                    title="Terminology Definitions"
                  />
                </Grid>
                {
                  printing
                    ? (
                      <Grid item>
                        <PSAButton
                          buttonType="ModalLink"
                          startIcon={<CircularProgress size={20} />}
                        />
                      </Grid>
                    )
                    : (
                      <Grid item>
                        <PSAButton
                          startIcon={<Print />}
                          buttonType="ModalLink"
                          onClick={print}
                          title="Print"
                        />
                      </Grid>
                    )
                }
              </Grid>

              <Grid item xs={1}>
                <PSAButton
                  style={{ color: 'white', float: 'right', paddingTop: '13px' }}
                  onClick={handleModalClose}
                  startIcon={<Close />}
                  buttonType=""
                />
              </Grid>
            </Grid>

            <Grid container item xs={12}>
              <InformationSheetContent crop={crop} modalData={modalData.data} from="modal" />
            </Grid>
          </Grid>
        </Box>
      )}
    />
  );
};

export default CropDetailsModal;
