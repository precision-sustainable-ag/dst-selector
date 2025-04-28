/*
  Handles the popup on hovering over one of the goal rankings in the crop selector
*/

import {
  Grid, Typography, useMediaQuery, useTheme,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CircularProgress from '@mui/material/CircularProgress';
import { Print } from '@mui/icons-material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PSAButton, PSAInfoSheet } from 'shared-react-components/src';
import InformationSheetContent from '../../pages/InformationSheetContent/InformationSheetContent';
import pirschAnalytics from '../../shared/analytics';
import { snackHandler, updatePrinting } from '../../reduxStore/sharedSlice';

export const InfoSheetTitle = ({ crop }) => {
  const dispatch = useDispatch();

  const regionShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.regionShorthand);
  const consentRedux = useSelector((stateRedux) => stateRedux.userData.consent);
  const printing = useSelector((stateRedux) => stateRedux.sharedData.printing);

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
      // FIXME: this snackbar will be blocked by modal
      dispatch(snackHandler({ snackOpen: true, snackMessage: `Error generating PDF: ${err}` }));
    } finally {
      dispatch(updatePrinting(false));
    }
  };

  return (
    <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
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
  );
};

const CropDetailsModal = ({
  crop,
  setModalOpen,
  modalOpen,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <PSAInfoSheet
      open={modalOpen}
      setOpen={setModalOpen}
      title={<InfoSheetTitle />}
      content={<InformationSheetContent crop={crop} />}
      fullScreen={isMobile}
    />
  );
};

export default CropDetailsModal;
