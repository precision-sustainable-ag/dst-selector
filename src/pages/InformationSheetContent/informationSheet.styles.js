import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
// import withStyles from '@mui/styles/withStyles';
// import makeStyles from '@mui/styles/makeStyles';
import styled from 'styled-components';

export const Accordion = styled(MuiAccordion)({
  root: {
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
});

export const AccordionSummary = styled(MuiAccordionSummary)({
  root: {
    borderBottom: '1px solid #2b7b79',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '4px 0',
    },
  },
  expanded: {},
});

// export const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//   },
//   heading: {
//     fontSize: theme.typography.pxToRem(15),
//     fontWeight: theme.typography.fontWeightRegular,
//   },
//   expanded: {
//     '&$expanded': {
//       margin: '4px 0',
//     },
//   },
// }));
