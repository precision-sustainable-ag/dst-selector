import {
  Box, Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PSAAccordion, PSATooltip } from 'shared-react-components/src';

const Attribution = () => {
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const [expandedAccordions, setExpandedAccordions] = useState([]);
  const [attributions, setAttributions] = useState({});
  const councils = ['General', 'MCCC', 'NECCC', 'SCCC', 'WCCC'];

  useEffect(() => {
    const url = `https://${
      /(localhost|dev)/i.test(window.location) ? 'developapi' : 'api'
    }.covercrop-selector.org/v2/regions?locality=state&context=seed_calc`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setAttributions({
          General: data.attributions.generalStatement,
          MCCC: data.attributions.MCCC?.withoutModifications,
          NECCC: data.attributions.NECCC?.withoutModifications,
          SCCC: data.attributions.SCCC?.withoutModifications,
          WCCC: data.attributions.WCCC?.withoutModifications,
        });
      });
  }, []);

  useEffect(() => {
    if (councilShorthandRedux && councils.includes(councilShorthandRedux)) {
      setExpandedAccordions([councilShorthandRedux]);
    } else {
      setExpandedAccordions(['General']);
    }
  }, [councilShorthandRedux]);

  const handleAccordion = (council) => {
    if (expandedAccordions.includes(council)) {
      setExpandedAccordions(expandedAccordions.filter((item) => item !== council));
    } else {
      setExpandedAccordions([...expandedAccordions, council]);
    }
  };

  return (
    <Box sx={{ border: 0.5, borderColor: 'grey.300' }} ml={2} mr={2} mt={5} padding={2}>
      {councils.map((council) => (
        <PSAAccordion
          key={council}
          sx={{
            mb: 2,
            border: '1px solid #e3e1e1',
            '&::before': {
              display: 'none',
            },
            '& .MuiAccordionDetails-root': {
              backgroundColor: { xs: '#F5F5F5', md: 'white' },
              borderRadius: '0 0 30px 30px',
              padding: { xs: '0', md: '8px' },
            },
          }}
          expanded={expandedAccordions.includes(council)}
          onChange={() => handleAccordion(council)}
          summaryContent={(
            <PSATooltip
              placement="bottom"
              arrow
              enterTouchDelay={0}
              PopperProps={{
                style: {
                  zIndex: 10000000,
                },
              }}
              title={council}
              tooltipContent={(
                <Box tabIndex="0">
                  <Typography className={`infosheetAccordionButton${1}`} variant="h4" style={{ color: 'grey' }}>
                    {council}
                  </Typography>
                </Box>
              )}
            />
          )}
          detailsContent={(
            <Typography variant="body1" align="left">
              {attributions[council] || 'No attribution available'}
            </Typography>
          )}
        />
      ))}
    </Box>
  );
};

export default Attribution;
