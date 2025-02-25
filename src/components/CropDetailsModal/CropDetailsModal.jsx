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
import { updatePrinting } from '../../reduxStore/sharedSlice';

const CropDetailsModal = ({ crop, setModalOpen, modalOpen }) => {
  const dispatchRedux = useDispatch();
  // redux vars
  const regionIdRedux = useSelector((stateRedux) => stateRedux.mapData.regionId);
  const regionShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.regionShorthand);
  // const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const stateIdRedux = useSelector((stateRedux) => stateRedux.mapData.stateId);
  const consentRedux = useSelector((stateRedux) => stateRedux.userData.consent);
  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);

  const printing = useSelector((stateRedux) => stateRedux.sharedData.printing);

  // useState vars
  const [dataDone, setDataDone] = useState(false);
  const [modalData, setModalData] = useState([]);
  // const [printEnabled, setPrintEnabled] = useState(false);

  useEffect(() => {
    const regionQuery = `${encodeURIComponent('regions')}=${encodeURIComponent(regionIdRedux)}`;
    const url = `https://${apiBaseUrlRedux}.covercrop-selector.org/v1/states/${stateIdRedux}/crops/${crop?.id}?${regionQuery}`;
    if (crop.id !== undefined) {
      callCoverCropApi(url).then((data) => {
        setModalData(data);
      })
        .then(() => {
          setDataDone(true);
        });
    }

    fetch(`https://selectorimages.blob.core.windows.net/selectorimages/pdf/${crop.label}%20Zone%20${regionShorthandRedux}.pdf`, { method: 'HEAD' })
      .then((res) => {
        if (res.status !== 404) {
          // setPrintEnabled(true);
        } else {
          // setPrintEnabled(false);
        }
      });
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

    const extractCSS = () => {
      let styles = '';

      const emotionStyles = Array.from(document.styleSheets);
      emotionStyles.forEach((sheet) => {
        try {
          Array.from(sheet.cssRules).forEach((rule) => {
            styles += rule.cssText;
          });
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn('Cannot access CSS rules:', e);
        }
      });

      // document.querySelectorAll('style, link[rel="stylesheet"]').forEach((node) => {
      //   if (node.tagName === 'STYLE') {
      //     styles += node.innerHTML;
      //   } else if (node.tagName === 'LINK') {
      //     try {
      //       const request = new XMLHttpRequest();
      //       request.open('GET', node.href, false);
      //       request.send(null);
      //       styles += request.responseText;
      //     } catch (error) {
      //       // eslint-disable-next-line no-console
      //       console.warn('Could not load CSS file:', node.href);
      //     }
      //   }
      // });

      return styles.replace(/@media \(min-width:\s*1536px\)/g, '@media (min-width:0px)');
    };

    dispatchRedux(updatePrinting(true));

    setTimeout(async () => {
      const html = document.querySelector('[id^=cropDetailModal]').outerHTML;
      const fullHtml = `
        <html>
          <head>
            <style>${extractCSS()}</style>
          </head>
          <body>${html}</body>
        </html>
      `;

      // console.log(fullHtml);

      // const response = await fetch(`https://developweather.covercrop-data.org/generate-pdf?${Math.random()}`, {
      // const response = await fetch('http://localhost/generate-pdf', {
      const response = await fetch('https://pdf.covercrop-data.org/api/generate-pdf/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          html: fullHtml,
          filename: `${crop.label}%20Zone%20${regionShorthandRedux}.pdf`,
        }),
      });

      const { fileUrl } = await response.json();
      window.open(fileUrl, '_blank');

      dispatchRedux(updatePrinting(false));
    }, 100);
  }; // print

  // const print = () => {
  //   if (consentRedux === true) {
  //     pirschAnalytics('Information Sheet', {
  //       meta: {
  //         category: 'Information Sheet',
  //         action: 'Print',
  //         label: document.title,
  //       },
  //     });
  //   }
  //   window.open(`https://selectorimages.blob.core.windows.net/selectorimages/pdf/${crop.label}%20Zone%20${regionShorthandRedux}.pdf`, '_blank');
  // }; // print

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
            <Grid container item xs={12} sx={{ backgroundColor: '#2D7B7B' }} className="noprint">
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
                {/* {(printEnabled && councilShorthandRedux === 'NECCC') && (
                  <Grid item>
                    <PSAButton
                      startIcon={<Print />}
                      buttonType="ModalLink"
                      onClick={print}
                      title="Print"
                    />
                  </Grid>
                )} */}
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
