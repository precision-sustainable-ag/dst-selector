/*
  Handles the popup on hovering over one of the goal rankings in the crop selector
*/

import {
  Box, Grid, Typography,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Close, Print } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PSAButton, PSAModal } from 'shared-react-components/src';
import InformationSheetContent from '../../pages/InformationSheetContent/InformationSheetContent';
import { callCoverCropApi } from '../../shared/constants';
import pirschAnalytics from '../../shared/analytics';

const CropDetailsModal = ({ crop, setModalOpen, modalOpen }) => {
  // redux vars
  const regionIdRedux = useSelector((stateRedux) => stateRedux.mapData.regionId);
  const regionShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.regionShorthand);
  // const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const stateIdRedux = useSelector((stateRedux) => stateRedux.mapData.stateId);
  const consentRedux = useSelector((stateRedux) => stateRedux.userData.consent);
  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);

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

    document.querySelectorAll('img').forEach((img) => {
      img.src = new URL(img.getAttribute('src'), window.location.origin).href;
    });

    const extractCSS = () => {
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
            // eslint-disable-next-line no-console
            console.warn('Could not load CSS file:', node.href);
          }
        }
      });

      return styles.replace(/@media \(min-width:1536px\)/g, '@media (min-width:0px)');
    };

    const html = document.querySelector('[id^=cropDetailModal]').outerHTML;
    const fullHtml = `
      <html>
        <head>
          <style>${extractCSS()}</style>
        </head>
        <body>${html}</body>
      </html>
    `;

    const response = await fetch('https://developweather.covercrop-data.org/generate-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html: fullHtml }),
    });

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
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
            <Grid container item xs={12} sx={{ backgroundColor: '#2D7B7B' }}>
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
                <Grid item>
                  <PSAButton
                    startIcon={<Print />}
                    buttonType="ModalLink"
                    onClick={print}
                    title="Print"
                  />
                </Grid>
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
