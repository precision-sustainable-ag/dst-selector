/*
  Handles the popup on hovering over one of the goal rankings in the crop selector
*/

import {
  Box, Grid, Typography, useMediaQuery, useTheme,
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

const CropDetailsModal = ({
  crop,
  setModalOpen,
  modalOpen,
}) => {
  const dispatch = useDispatch();
  // redux vars

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

      const emotionStyles = Array.from(document.styleSheets);
      emotionStyles.forEach((sheet) => {
        try {
          Array.from(sheet.cssRules).forEach((rule) => {
            styles += rule.cssText;
          });
        } catch (e) {
          throw new Error('Error in extracting CSS');
        }
      });

      return styles.replace(/@media \(min-width:\s*1536px\)/g, '@media (min-width:0px)');
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
        overflowX: 'hidden',
        maxWidth: isMobile ? '100%' : '70%',
        margin: isMobile ? '0' : '2% auto',
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
            <Grid
              container
              sx={{
                backgroundColor: '#2D7B7B',
                position: 'fixed',
                zIndex: 1000,
                width: isMobile ? '100%' : '70%',
                height: isMobile ? '70px' : 'auto',
              }}
              className="no-print"
            >
              <Grid
                container
                display="flex"
                alignItems="center"
                item
                xs={11}
                sx={{
                  borderTop: '5px solid #2d7b7b',
                }}
              >
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
                  {
                    printing
                      ? (
                        <PSAButton
                          buttonType="ModalLink"
                          startIcon={<CircularProgress size={20} />}
                        />
                      )
                      : (
                        <PSAButton
                          startIcon={<Print />}
                          buttonType="ModalLink"
                          onClick={print}
                          title="Print"
                          className="infosheetPrint"
                        />
                      )
                  }
                </Grid>
              </Grid>

              <Grid item xs={1}>
                <PSAButton
                  style={{ color: 'white', float: 'right', paddingTop: '13px' }}
                  onClick={handleModalClose}
                  startIcon={<Close />}
                  buttonType=""
                  className="modalClose"
                />
              </Grid>
            </Grid>

            <Grid container justifyContent={isMobile ? 'center' : 'flex-start'}>
              <Box
                sx={{
                  width: isMobile ? '100%' : 'inherit',
                  maxWidth: isMobile ? '390px' : 'unset',
                  marginTop: '80px',
                  marginLeft: isMobile ? '2px' : '2.5%',
                  marginRight: isMobile ? '2px' : '2.5%',
                }}
              >
                <InformationSheetContent crop={crop} modalData={modalData.data} from="modal" />
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    />
  );
};

export default CropDetailsModal;
