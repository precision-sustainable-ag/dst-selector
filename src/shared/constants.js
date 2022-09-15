/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React, { Fragment } from 'react';
import {
  Button,
  Switch,
  Grid,
  Typography,
  Tooltip,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import moment from 'moment';
import { Info, MonetizationOn } from '@mui/icons-material';

const JSZip = require('jszip');
const JSZipUtils = require('jszip-utils');
const saveAs = require('save-as');

export const ReferenceTooltip = ({
  url, source, type, content, hasLink, title,
}) => {
  const sourceURL = url;
  const sourceName = source;
  const sourceType = type || 'link';
  const sourceContent = content || '';
  const link = hasLink;
  return sourceType === 'link' ? (
    <Tooltip
      title={(
        <div>
          Source
          {': '}
          <a href={sourceURL} target="_blank" rel="noopener noreferrer">
            {sourceName}
          </a>
        </div>
      )}
      arrow
    >
      <Info fontSize="small" />
    </Tooltip>
  ) : sourceType === 'html' ? (
    <Tooltip arrow dangerouslySetInnerHTML={content}>
      {' '}
      <Info fontSize="small" />
    </Tooltip>
  ) : link ? (
    <Tooltip title={title} placement="right" arrow>
      <Info fontSize="small" />
    </Tooltip>
  ) : (
    <Tooltip
      title={(
        <div>
          <Typography variant="body1">{sourceContent}</Typography>
        </div>
      )}
      placement="right"
      arrow
    >
      <Info fontSize="small" />
    </Tooltip>
  );
};

export const DataTooltip = ({ data, placement = 'top-start' }) => (
  <Tooltip title={<div className="text-center">{data}</div>} placement={placement} arrow>
    <Info fontSize="small" />
  </Tooltip>
);

export const locationIcon = (w, h) => (
  <svg width={w} height={h} viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7 0C3.13 0 0 3.13 0 7C0 12.25 7 20 7 20C7 20 14 12.25 14 7C14 3.13 10.87 0 7 0ZM7 9.5C5.62 9.5 4.5 8.38 4.5 7C4.5 5.62 5.62 4.5 7 4.5C8.38 4.5 9.5 5.62 9.5 7C9.5 8.38 8.38 9.5 7 9.5Z"
      fill="white"
    />
  </svg>
);
export const zoneIcon = (w, h) => (
  <svg height={h} width={w} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM6 15.5C4.62 15.5 3.5 14.38 3.5 13C3.5 11.62 4.62 10.5 6 10.5C7.38 10.5 8.5 11.62 8.5 13C8.5 14.38 7.38 15.5 6 15.5ZM7.5 6C7.5 4.62 8.62 3.5 10 3.5C11.38 3.5 12.5 4.62 12.5 6C12.5 7.38 11.38 8.5 10 8.5C8.62 8.5 7.5 7.38 7.5 6ZM14 15.5C12.62 15.5 11.5 14.38 11.5 13C11.5 11.62 12.62 10.5 14 10.5C15.38 10.5 16.5 11.62 16.5 13C16.5 14.38 15.38 15.5 14 15.5Z"
      fill="white"
    />
  </svg>
);

export const cloudIcon = (w, h) => (
  <svg width={w} height={h} viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19.35 6.04C18.67 2.59 15.64 0 12 0C9.11 0 6.6 1.64 5.35 4.04C2.34 4.36 0 6.91 0 10C0 13.31 2.69 16 6 16H19C21.76 16 24 13.76 24 11C24 8.36 21.95 6.22 19.35 6.04Z"
      fill="black"
    />
  </svg>
);

export const GreenSwitch = withStyles({
  thumb: {
    backgroundColor: 'rgb(138, 188, 98, 1)',
  },
  track: {
    backgroundColor: 'rgb(138, 188, 98, 0.5)',
  },
  input: {
    '&:checked': {
      color: 'rgb(240, 247, 235)',
    },
  },
  // "&:checked": {
  //   color: "rgb(240, 247, 235)",
  // },
})(Switch);

export const GetMonthString = (month) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  return months[month].toUpperCase();
};

export const UnderConstructionText = () => (
  <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: '100vh' }}
  >
    <Grid item xs={3}>
      <Typography variant="h3">Under Construction</Typography>
    </Grid>
  </Grid>
);

// eslint-disable-next-line consistent-return
export const abbrRegion = (input, to) => {
  const states = [
    ['Alabama', 'AL'],
    ['Alaska', 'AK'],
    ['American Samoa', 'AS'],
    ['Arizona', 'AZ'],
    ['Arkansas', 'AR'],
    ['Armed Forces Americas', 'AA'],
    ['Armed Forces Europe', 'AE'],
    ['Armed Forces Pacific', 'AP'],
    ['California', 'CA'],
    ['Colorado', 'CO'],
    ['Connecticut', 'CT'],
    ['Delaware', 'DE'],
    ['District Of Columbia', 'DC'],
    ['Florida', 'FL'],
    ['Georgia', 'GA'],
    ['Guam', 'GU'],
    ['Hawaii', 'HI'],
    ['Idaho', 'ID'],
    ['Illinois', 'IL'],
    ['Indiana', 'IN'],
    ['Iowa', 'IA'],
    ['Kansas', 'KS'],
    ['Kentucky', 'KY'],
    ['Louisiana', 'LA'],
    ['Maine', 'ME'],
    ['Marshall Islands', 'MH'],
    ['Maryland', 'MD'],
    ['Massachusetts', 'MA'],
    ['Michigan', 'MI'],
    ['Minnesota', 'MN'],
    ['Mississippi', 'MS'],
    ['Missouri', 'MO'],
    ['Montana', 'MT'],
    ['Nebraska', 'NE'],
    ['Nevada', 'NV'],
    ['New Hampshire', 'NH'],
    ['New Jersey', 'NJ'],
    ['New Mexico', 'NM'],
    ['New York', 'NY'],
    ['North Carolina', 'NC'],
    ['North Dakota', 'ND'],
    ['Northern Mariana Islands', 'NP'],
    ['Ohio', 'OH'],
    ['Oklahoma', 'OK'],
    ['Oregon', 'OR'],
    ['Pennsylvania', 'PA'],
    ['Puerto Rico', 'PR'],
    ['Rhode Island', 'RI'],
    ['South Carolina', 'SC'],
    ['South Dakota', 'SD'],
    ['Tennessee', 'TN'],
    ['Texas', 'TX'],
    ['US Virgin Islands', 'VI'],
    ['Utah', 'UT'],
    ['Vermont', 'VT'],
    ['Virginia', 'VA'],
    ['Washington', 'WA'],
    ['West Virginia', 'WV'],
    ['Wisconsin', 'WI'],
    ['Wyoming', 'WY'],
  ];

  // So happy that Canada and the US have distinct abbreviations
  const provinces = [
    ['Alberta', 'AB'],
    ['British Columbia', 'BC'],
    ['Manitoba', 'MB'],
    ['New Brunswick', 'NB'],
    ['Newfoundland', 'NF'],
    ['Northwest Territory', 'NT'],
    ['Nova Scotia', 'NS'],
    ['Nunavut', 'NU'],
    ['Ontario', 'ON'],
    ['Prince Edward Island', 'PE'],
    ['Quebec', 'QC'],
    ['Saskatchewan', 'SK'],
    ['Yukon', 'YT'],
  ];

  const regions = states.concat(provinces);

  let i; // Reusable loop variable
  if (to === 'abbr') {
    input = input.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    for (i = 0; i < regions.length; i++) {
      if (regions[i][0] === input) {
        return regions[i][1];
      }
    }
  } else if (to === 'name') {
    input = input.toUpperCase();
    for (i = 0; i < regions.length; i++) {
      if (regions[i][1] === input) {
        return regions[i][0];
      }
    }
  }
};

export const CustomStyles = () => ({
  progressColor: '#2b7b79',
  darkGreen: '#598444',
  defaultFontSize: '1em',
  lighterGreen: '#598445',
  lightGreen: '#add08f',
  greenishWhite: '#f0f7eb',
  primaryProgressBtnColor: '#49a8ab',
  primaryProgressBtnBorderColor: '#62b8bc',
  secondaryProgressBtnColor: '#e3f2f4',
  secondaryProgressBtnBorderColor: '#e3f2f4',
  fullyRoundedRadius: '200px',
  semiRoundedRadius: '10px',
  _10pxRoundedRadius: '10px',
  _5pxRoundedRadius: '5px',
  mildlyRoundedRadius: '5px',
  nonRoundedRadius: '0px',
  defaultButtonPadding: '10px 20px 10px 20px',
});

export const LightButton = withStyles({
  root: {
    backgroundColor: CustomStyles().secondaryProgressBtnBorderColor,
    borderRadius: CustomStyles().fullyRoundedRadius,
    color: '#000',
    padding: CustomStyles().defaultButtonPadding,
    borderColor: CustomStyles().secondaryProgressBtnBorderColor,
    '&:hover': {
      borderColor: CustomStyles().primaryProgressBtnBorderColor,
      backgroundColor: CustomStyles().primaryProgressBtnColor,
      color: '#fff',
    },
  },
})(Button);

export const getRating = (ratng) => {
  const rating = parseInt(ratng, 10);

  switch (rating) {
    case 0:
      return (
        <div className="rating-0">
          <span />
        </div>
      );
    case 1:
      return (
        <div className="rating-1">
          <span />
        </div>
      );
    case 2:
      return (
        <div className="rating-2">
          <span />
        </div>
      );
    case 3:
      return (
        <div className="rating-3">
          <span />
        </div>
      );
    case 4:
      return (
        <div className="rating-4">
          <span />
        </div>
      );
    case 5:
      return (
        <div className="rating">
          <span />
        </div>
      );
    default:
      return (
        <div className="rating-0">
          <span />
        </div>
      );
  }
};
export const weatherApiURL = 'https://weather.aesl.ces.uga.edu';
export const allMonths = moment().localeData().monthsShort();
export const cropDataURL = "https://api.airtable.com/v0/appC47111lCOTaMYe/Cover%20Crops%20Data?maxRecords=300&timeZone=America_NewYork&filterByFormula=NOT(SWITCH({Cover Crop Name},'__Open Discussion Row','Ok hopefully he answers me soon.'))";

// const cropDataURL =
// "https://api.airtable.com/v0/appC47111lCOTaMYe/Cover%20Crops%20Data?maxRecords=300&timeZone=America_NewYork&filterByFormula=NOT(SWITCH({Zone Decision},'Exclude',''))";

export const allGoalsURL = 'https://api.airtable.com/v0/appC47111lCOTaMYe/Cover%20Crop%20Goals?maxRecords=300';

export const greenBarExpansionPanelHeight = {
  large: '600px',
  medium: '600px',
  small: '600px',
};

export const trimString = (stringFull, size) => {
  if (!isNaN(size)) {
    return `${stringFull.substring(0, size)}${stringFull.length > 25 ? '...' : ''}`;
  } return stringFull;
};

export const sidebarFilters = [
  {
    category: 'Taxonomy',
    data: [
      {
        Variable: 'Cover Crop Group',
        Description: 'Common name for categories of cover crops',
        'Data Source': ['ZTL Team'],
        Values: '[Legume, Grass, Brassica, Broadleaf]',
        Category: 'Taxonomy',
        'Cover Crop Goals': ['rech7T61et0rrvgOc', 'recxUYrkzT3lNknLR'],
        'Filter Field': true,
        Type: 'string',
        'Units/Details': 'select one',
        'Information Sheet': true,
      },
      {
        Variable: 'Family Common Name',
        Description: 'Family common name',
        'Data Source': ['ZTL Team'],
        'USDA.PLANTS Term': 'Family.Common.Name',
        Values:
          '[Grass family, Nonlegumes, Legumes, Mustard family, Aster family, Pea family, Buckwheat family, Flax family, Borage family]',
        Category: 'Taxonomy',
        'Filter Field': true,
        Type: 'string',
        'Units/Details': 'select one',
        'Information Sheet': true,
      },
    ],
  },
  {
    category: 'Environmental Tolerances',
    data: [
      {
        Variable: 'Shade Tolerance',
        Description: 'Ability to tolerate shade relative to other species',
        'Data Source': ['MCCC Species Tool'],
        'USDA.PLANTS Term': 'Shade.Tolerance',
        'Team Notes': 'Each team must define the "low medium high" VALUES',
        Values:
          '1 star = none/intolerant, 2 = low, 3 = low-med (cutoff), 4 stars = high-med, 5 = high/tolerant',
        Category: 'Environmental Tolerances',
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rating 1-5',
        'Information Sheet': true,
      },
      {
        Variable: 'Flood Tolerance',
        Description: 'Ability to tolerate flood relative to other species',
        'Data Source': ['MCCC Species Tool'],
        'Team Notes': 'Each team must define the "low medium high" VALUES',
        Values:
          '1 star = none/intolerant, 2 = low, 3 = low-med (cutoff), 4 stars = high-med, 5 = high/tolerant',
        Category: 'Environmental Tolerances',
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rating 1-5',
        'Information Sheet': true,
      },
      {
        Variable: 'Heat Tolerance',
        Description: 'Ability to tolerate heat relative to other species',
        'Data Source': ['MCCC Species Tool'],
        'Team Notes': 'Each team must define the "low medium high" VALUES',
        Values:
          '1 star = none/intolerant, 2 = low, 3 = low-med (cutoff), 4 stars = high-med, 5 = high/tolerant',
        Category: 'Environmental Tolerances',
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rating 1-5',
        'Information Sheet': true,
      },
      {
        Variable: 'Winter Survival',
        Description: 'Likelihood of cover crop survival over the winter.',
        'Data Source': ['MCCC Species Tool'],
        'Team Notes': 'Can we indicate winter kill temp for diff maturity? or comments?',
        Values: '[Never, Seldom, Expected]',
        Category: 'Environmental Tolerances',
        'Cover Crop Goals': ['reccbLXAvA9tM3TT1', 'recNAKTF4fwK3CONR'],
        'Filter Field': true,
        Type: 'string',
        'Units/Details': 'select many',
        'Information Sheet': true,
      },
      {
        Variable: 'Salinity Tolerance',
        Description: 'Ability to tolerate high salinity relative to other species. Scale 1-5',
        'Data Source': ['USDA PLANTS'],
        'USDA.PLANTS Term': 'Salinity.Tolerance',
        'Team Notes':
          '[Low = tolerant to 2.1-4.0 dS/m; Medium = tolerant to 4.1-8.0 dS/m; High = tolerant to greater than 8.0 dS/m.]',
        Values:
          '1 star = none/intolerant, 2 = low, 3 = low-med (cutoff), 4 stars = high-med, 5 = high/tolerant',
        Category: 'Environmental Tolerances',
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rating 1-5',
        'Information Sheet': true,
      },
      {
        Variable: 'Low Fertility Tolerance',
        Description:
          'Ability to tolerate poor fertility in general (an amalgamation of low pH soils and/or below-optimum soil tests for N, P, and/or K, sandy soil)',
        'Data Source': ['MCCC Species Tool'],
        'USDA.PLANTS Term': 'Fertiility Requirement',
        'Team Notes': 'Each team must define the "low medium high" VALUES',
        Values:
          '1 star = none/intolerant, 2 = low, 3 = low-med (cutoff), 4 stars = high-med, 5 = high/tolerant',
        Category: 'Environmental Tolerances',
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rating 1-5',
        'Information Sheet': true,
      },
      {
        Variable: 'Drought Tolerance',
        Description: 'Ability to tolerate drought relative to other species',
        'Data Source': ['MCCC Species Tool'],
        'USDA.PLANTS Term': 'Droght Tolerance',
        'Team Notes': 'Each team must define the "low medium high" VALUES',
        Values:
          '1 star = none/intolerant, 2 = low, 3 = low-med (cutoff), 4 stars = high-med, 5 = high/tolerant',
        Category: 'Environmental Tolerances',
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rating 1-5',
        'Information Sheet': true,
      },
    ],
  },
  {
    category: 'Basic Agronomics',
    data: [
      {
        Variable: 'Shape & Orientation',
        Description: 'Growth form or predominant shape of an individual plant.',
        'Data Source': ['MCCC Species Tool'],
        Values: '[Erect, Semi-Erect, Climbing, Prostrate, Columnar, Decumbent]',
        Category: 'Basic Agronomics',
        'Cover Crop Goals': [
          'recRlVowCsSXpRXN2',
          'reccbLXAvA9tM3TT1',
          'recNAKTF4fwK3CONR',
          'recJcA1wm7sdCHzQl',
        ],
        'Filter Field': true,
        Type: 'string',
        'Units/Details': 'select many',
        'Information Sheet': true,
      },
      {
        Variable: 'Hessian Fly-Free Date',
        Description:
          'Hessian Fly-Free Date, after which wheat and other plants can be planted to avoid cereal rust.',
        'Data Source': ['MCCC Species Tool'],
        Values: 'Yes, No',
        Category: 'Basic Agronomics',
        'Filter Field': true,
        Type: 'boolean',
        'Units/Details': 'check box',
        'Information Sheet': true,
      },
      {
        Variable: 'Dry Matter Min (lbs/A/y)',
        Description:
          'Amount of dry biomass the cover crop produces in a year, lbs/A.\n\nImpacts the following cover cropping goals: improve soil organic matter, lasting residue, prevent soil eriosion, promote water quality, nitrogen fixation, nitrogen scavanging, and weed suppression.',
        'Data Source': ['MCCC Species Tool'],
        'Team Notes':
          'Each team must define the "low medium high" VALUES. Proposed Baseline: [0<Low<1000, 1000<Med<3000, High>3000]',
        Category: 'Basic Agronomics',
        'Cover Crop Goals': [
          'recVx4qMQys9OMoZX',
          'recW6SQB6uiWF7hsX',
          'recRlVowCsSXpRXN2',
          'reccbLXAvA9tM3TT1',
          'recNAKTF4fwK3CONR',
          'rech7T61et0rrvgOc',
          'recxUYrkzT3lNknLR',
          'recJcA1wm7sdCHzQl',
          'recIBqnwWp5SEwyuI',
        ],
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'lbs/Acre/year',
        'Information Sheet': true,
      },
      {
        Variable: 'Duration',
        Description:
          'Some plants have different Durations depending on environment or location, so a plant can have more than one value. Multiple values are reported in order of increasing longevity in nature.',
        'Data Source': ['MCCC Species Tool'],
        'USDA.PLANTS Term': 'Duration',
        Values: '[Annual, Perennial, Short-lived Perennial, Biennial]',
        Category: 'Basic Agronomics',
        'Filter Field': true,
        Type: 'string',
        'Units/Details': 'select many',
        'Information Sheet': true,
      },
      {
        Variable: 'Active Growth Period',
        Description: 'Season in which plants have active growth.',
        'Data Source': ['MCCC Species Tool'],
        'USDA.PLANTS Term': 'Active Growth Period',
        Values: '[Spring, Summer, Winter, Fall]',
        Category: 'Basic Agronomics',
        'Filter Field': true,
        Type: 'string',
        'Units/Details': 'select many',
        'Information Sheet': true,
      },
      {
        Variable: 'Nitrogen Accumulation Min, Legumes (lbs/A/y)',
        Description:
          'Amount of N a legume species contains, lbs/A. This is combined nitrogen fixed plus nitrogen taken up from the soil.\n\nImpacts the following cover cropping goals: nitrogen source',
        'Data Source': ['MCCC Species Tool'],
        'Team Notes':
          'Each team must define the "low medium high" VALUES. Proposed Baseline: [0<Low<50; 50<Med<100; High>100]',
        Category: 'Basic Agronomics',
        'Cover Crop Goals': ['rech7T61et0rrvgOc'],
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'lbs/Acre/year',
        'Information Sheet': true,
      },
      {
        Variable: 'C to N Ratio',
        Description:
          'C:N ratio is the percentage of organic carbon divided by the percentage of total nitrogen in organic material. Note that the C:N ratio of grasses (warm season annuals) is lower at the vegetative state then at the flowering state.\n\n1 to 5 rating. General guide for cover crops at flowering, but there are exceptions:\n1 - Legumes\n2 - Succulent broadleafs\n3 - Woodier broadleafs (sunflowers, annual rye grass)\n4 - Cereal grains\n5 - Warm season annuals\n\n\nImpacts following goals: Improve soil organic matter, lasting residue, prevent soil erosion, weed suppression',
        'Data Source': ['USDA PLANTS'],
        'USDA.PLANTS Term': 'CN Ratio',
        'Team Notes':
          'Team must define the values, range, and options. Proposed Baseline: [0<Low<12; 12<Medium<20; High>20]',
        Values:
          '1 - Legumes, 2 - Succulent broadleafs, 3 - Woodier broadleafs (sunflowers, annual rye grass), 4 - Cereal grains, 5 - Warm season annuals',
        Category: 'Basic Agronomics',
        'Cover Crop Goals': [
          'recVx4qMQys9OMoZX',
          'recW6SQB6uiWF7hsX',
          'reccbLXAvA9tM3TT1',
          'recNAKTF4fwK3CONR',
          'recJcA1wm7sdCHzQl',
          'recIBqnwWp5SEwyuI',
        ],
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rating 1-5',
        'Information Sheet': true,
      },
      {
        Variable: 'Zone Use',
        Description: 'Is it commonly used in the zone or only beginning to gain adoption?',
        'Data Source': ['MCCC Species Tool'],
        'USDA.PLANTS Term': '????',
        Values: '[Common, Emerging]',
        Category: 'Basic Agronomics',
        'Filter Field': true,
        Type: 'string',
        'Units/Details': 'select one',
        'Information Sheet': true,
      },
      {
        Variable: 'Dry Matter Max (lbs/A/y)',
        Description:
          'Amount of dry biomass the cover crop produces in a year, lbs/A.\n\nImpacts the following cover cropping goals: improve soil organic matter, lasting residue, prevent soil eriosion, promote water quality, nitrogen fixation, nitrogen scavanging, and weed suppression.',
        'Data Source': ['MCCC Species Tool'],
        'Team Notes':
          'Each team must define the "low medium high" VALUES. Proposed Baseline: [0<Low<1000, 1000<Med<3000, High>3000]',
        Category: 'Basic Agronomics',
        'Cover Crop Goals': [
          'recVx4qMQys9OMoZX',
          'recW6SQB6uiWF7hsX',
          'recRlVowCsSXpRXN2',
          'reccbLXAvA9tM3TT1',
          'recNAKTF4fwK3CONR',
          'rech7T61et0rrvgOc',
          'recxUYrkzT3lNknLR',
          'recJcA1wm7sdCHzQl',
          'recIBqnwWp5SEwyuI',
        ],
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'lbs/Acre/year',
        'Information Sheet': true,
      },
      {
        Variable: 'Nitrogen Accumulation Max, Legumes (lbs/A/y)',
        Description:
          'Amount of N a legume species contains, lbs/A. This is combined nitrogen fixed plus nitrogen taken up from the soil.\n\nImpacts the following cover cropping goals: nitrogen source',
        'Data Source': ['MCCC Species Tool'],
        'Team Notes':
          'Each team must define the "low medium high" VALUES. Proposed Baseline: [0<Low<50; 50<Med<100; High>100]',
        Category: 'Basic Agronomics',
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'lbs/Acre/year',
        'Information Sheet': true,
      },
    ],
  },
  {
    category: 'Soil Conditions',
    data: [
      {
        Variable: 'Soil Drainage',
        Description:
          'Level of soil drainage needed for acceptable cover crop growth given regular rainfall.',
        'Data Source': ['MCCC Species Tool'],
        Values:
          '[Very poorly drained, Poorly drained, Somewhat poorly drained, Moderately well drained, Well drained, Excessively drained, Saturated muck, Well drained muck]',
        Category: 'Soil Conditions',
        'Filter Field': true,
        Type: 'string',
        'Units/Details': 'select many',
        'Information Sheet': true,
      },
      {
        Variable: 'Soil Textures',
        Description:
          'Ability to establish and grow in soil with coarse, medium, and fine textured soils given regular rainfall.',
        'Data Source': ['USDA PLANTS'],
        'USDA.PLANTS Term': 'Adapted to X Soils',
        Values: '[Coarse, Medium, Fine]',
        Category: 'Soil Conditions',
        'Filter Field': true,
        Type: 'string',
        'Units/Details': 'select many',
        'Information Sheet': true,
      },
      {
        Variable: 'Minimum Tolerant Soil pH',
        Description:
          'The minimum soil pH, of the top 12 inches of soil, within the plant’s known geographical range.',
        'Data Source': ['USDA PLANTS'],
        'USDA.PLANTS Term': 'pH Min',
        Category: 'Soil Conditions',
        'Filter Field': true,
        Type: 'float',
        'Units/Details': 'decimal (1.0)',
        'Information Sheet': true,
      },
      {
        Variable: 'Maximum Tolerant Soil pH',
        Description:
          'The maximum soil pH, of the top 12 inches of soil, within the plant’s known geographical range.',
        'Data Source': ['USDA PLANTS'],
        'USDA.PLANTS Term': 'pH Max',
        Category: 'Soil Conditions',
        'Filter Field': true,
        Type: 'float',
        'Units/Details': 'decimal (1.0)',
        'Information Sheet': true,
      },
      {
        Variable: 'Soil Moisture Use',
        Description:
          'Ability to use (i.e., remove) available soil moisture relative to other species.',
        'Data Source': ['USDA PLANTS'],
        'USDA.PLANTS Term': 'Moisture Use',
        Values: '[Low, Medium, High]',
        Category: 'Soil Conditions',
        'Filter Field': true,
        Type: 'string',
        'Units/Details': 'select one',
        'Information Sheet': true,
      },
      {
        Variable: 'Flooding/Ponding Tolerance',
        Description: 'Cover crop survival under flooding/ponding conditions',
        'Data Source': ['MCCC Species Tool'],
        Values: '[Poor, Moderate, Good]',
        Category: 'Soil Conditions',
        'Filter Field': true,
        Type: 'string',
        'Units/Details': 'select one',
        'Information Sheet': true,
      },
      {
        Variable: 'Loosens Topsoil',
        Description:
          'Relative ability of cover crop to loosen topsoil (0 to 6 inches).\n\nImpacts the following cover cropping goals: reduces topsoil compaction',
        'Data Source': ['MCCC Species Tool'],
        Category: 'Soil Conditions',
        'Cover Crop Goals': ['recPxyjmEenzGEvZj'],
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rating 1-5',
        'Information Sheet': true,
      },
      {
        Variable: 'Supports Mycorrhizae',
        Description:
          'Relative activity of mycorrhizal fungi in the rhizosphere.\n\nImpacts the following goals: Increase soil aggregation, promote water quality',
        'Data Source': ['Zone Team'],
        Category: 'Soil Conditions',
        'Cover Crop Goals': ['recu78NjkZLLgegx0', 'recNAKTF4fwK3CONR'],
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rating 1-5',
        'Information Sheet': true,
      },
      {
        Variable: 'Loosens Subsurface Soil',
        Description:
          'Relative ability of cover crop to break up subsurface soil compaction (6 to 12 inches). Including management induced compaction.\n\nImpacts the following cover cropping goals: reduces subsurface soil compaction',
        'Data Source': ['MCCC Species Tool'],
        Category: 'Soil Conditions',
        'Cover Crop Goals': ['recFKZEppkGOSk8qE'],
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rating 1-5',
        'Information Sheet': true,
      },
    ],
  },
  {
    category: 'Growth',
    data: [
      {
        Variable: 'Innoculant Type (Legumes Only)',
        Description: 'Type of inoculant that needs to applied to legume seed to promote N fixation',
        'Data Source': ['MCCC Species Tool'],
        Values:
          '[none, alfalfa, berseem clover, cowpea, crimson clover, lespedeza, lima bean, pea/vetch, pea/vetch/lentil, peanut, red clover, soybean, sweetclover, white clover]',
        Category: 'Growth',
        'Filter Field': true,
        Type: 'string',
        'Units/Details': 'select many',
        'Information Sheet': true,
      },
      {
        Variable: 'Flowering Trigger',
        Description: 'Details about when flowering occurs, triggers for flowering',
        Values:
          '[Requires vernalization (spring), Intermediate day (11-13 hrs), Long day (>14 hrs), Based on plant size]',
        Category: 'Growth',
        'Filter Field': true,
        Type: 'string',
        'Units/Details': 'select many',
        'Information Sheet': true,
      },
      {
        Variable: 'Early Spring Growth',
        Description:
          'Speed in the spring at which the cover crop breaks dormancy and grows. No star means that early spring growth is not applicable.',
        Category: 'Growth',
        'Cover Crop Goals': [
          'reccbLXAvA9tM3TT1',
          'recNAKTF4fwK3CONR',
          'rech7T61et0rrvgOc',
          'recxUYrkzT3lNknLR',
        ],
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rating 1-5',
        'Information Sheet': true,
      },
      {
        Variable: 'Root Depth',
        Description:
          'How deeply rooted is this cover crop? Consider the relative ability of the roots to go deeper the previous crop was (where residual nitrogen lies).\n\nImpacts the following goals: Promote water quality, reduces topsoil compaction, nitrogen scavenging',
        Values: '[Shallow, Medium, Deep]',
        Category: 'Growth',
        'Cover Crop Goals': [
          'recNAKTF4fwK3CONR',
          'recFKZEppkGOSk8qE',
          'recPxyjmEenzGEvZj',
          'recxUYrkzT3lNknLR',
        ],
        'Filter Field': true,
        Type: 'string',
        'Units/Details': 'select one',
        'Information Sheet': true,
      },
      {
        Variable: 'Establishes Quickly',
        Description:
          'Speed at which the cover crop establishes once planted.\n1 - slow to establish\n5 - quick to establish',
        Category: 'Growth',
        'Cover Crop Goals': [
          'recRlVowCsSXpRXN2',
          'recNAKTF4fwK3CONR',
          'recxUYrkzT3lNknLR',
          'recDewfUdf5fLOAVC',
          'recJcA1wm7sdCHzQl',
        ],
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rating 1-5',
        'Information Sheet': true,
      },
      {
        Variable: 'Root Architecture',
        Description:
          'What is the primary root structure: tap or fibrous?\n\nImpacts the following goals:  Increase soil aggregation, prevent soil erosion, proote water quality, reduces subsurface soil compaction, reduces topsoil compaction',
        Values: '[Tap, Fibrous]',
        Category: 'Growth',
        'Cover Crop Goals': [
          'recu78NjkZLLgegx0',
          'recRlVowCsSXpRXN2',
          'reccbLXAvA9tM3TT1',
          'recNAKTF4fwK3CONR',
          'recFKZEppkGOSk8qE',
          'recPxyjmEenzGEvZj',
        ],
        'Filter Field': true,
        Type: 'string',
        'Units/Details': 'select many',
        'Information Sheet': true,
      },
      {
        Variable: 'Growing Window',
        Description:
          'Relative length of time that is suitable for growing and terminating a cover crop. For example, cover crops with a very short growing window may be suitable for growing and terminating during a very short period (e.g., 6-8 weeks) between cash crops.',
        'Data Source': ['MCCC Species Tool'],
        Values: '[Very Short, Short, Medium, Long, Very Long]',
        Category: 'Growth',
        'Cover Crop Goals': ['recNAKTF4fwK3CONR'],
        'Filter Field': true,
        Type: 'string',
        'Units/Details': 'select one',
        'Information Sheet': true,
      },
      {
        Variable: 'Ease of Establishment',
        Description:
          'Degree of difficulty in getting cover crop established.\n1 - difficult to establish\n5 - very easy to establish',
        Category: 'Growth',
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rating 1-5',
        'Information Sheet': true,
      },
    ],
  },
  {
    category: 'Planting',
    data: [
      {
        Variable: 'Min Germination Temp (F)',
        Description: 'Minimum temperature required for cover crop seed to germinate within 5 days.',
        'Data Source': ['MCCC Species Tool'],
        Category: 'Planting',
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'F',
        'Information Sheet': true,
      },
      {
        Variable: 'Seeds per Pound',
        Description: 'Average number of cover crop seeds in a pound of seed',
        'Data Source': ['USDA PLANTS'],
        'USDA.PLANTS Term': 'Seeds.per.Pound',
        Category: 'Planting',
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rounded to the nearest tens',
        'Information Sheet': true,
      },
      {
        Variable: 'Drilled Depth Min',
        Description: 'Depth to plant seed in fractions of an inch',
        'Data Source': ['MCCC Species Tool'],
        Category: 'Planting',
        'Filter Field': true,
        Type: 'float',
        'Units/Details': 'inches, down to quarter, half, and eigths',
        'Information Sheet': true,
      },
      {
        Variable: 'Broadcast Frost Seeding',
        Description: 'Cover crop can be seeded when ground is frozen.',
        'Data Source': ['MCCC Species Tool'],
        Values: 'Yes, No',
        Category: 'Planting',
        'Filter Field': true,
        Type: 'boolean',
        'Units/Details': 'checkbox',
        'Information Sheet': true,
      },
      {
        Variable: 'Seed Price per Pound',
        Description:
          'Relative cost of seed per pound. One star is least expensive, 3 stars is most expensive. Rating is relative.',
        'Data Source': ['Green Cover Crop Seed'],
        'Team Notes':
          'Each team should recommend a data source for pricing, e.g. green cover crop seed',
        Category: 'Planting',
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rating 1-3',
        'Information Sheet': true,
      },
      {
        Variable: 'Can Aerial Seed?',
        Description: 'Can aerial seeding methods be used for this crop?',
        'Data Source': ['Paul Salon'],
        Values: 'Yes, No',
        Category: 'Planting',
        'Filter Field': true,
        Type: 'boolean',
        'Units/Details': 'checkbox',
        'Information Sheet': true,
      },
      {
        Variable: 'Base Seeding Rate Min (lbs/A)',
        Description:
          'The base seeding rate (PLS) represents optimal planting time, optimal termination time, optimal planting method (drilled/cultivate and cultipack), conventional tillage method, no planting green, and no interseeding in a monoculture context. Lower limit (min) is approx 30% ground coverage.',
        'Data Source': ['Zone Team'],
        Category: 'Planting',
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'lbs/Acre/year',
        'Information Sheet': true,
      },
      {
        Variable: 'Base Seeding Rate Max (lbs/A)',
        Description:
          'The base seeding rate (PLS)  represents optimal planting time, optimal termination time, optimal planting method (drilled/cultivate and cultipack), conventional tillage method, no planting green, and no interseeding in a monoculture context. Upper limit (Max) is for intensive activity such as weed suppression or forage.',
        'Data Source': ['Zone Team'],
        Category: 'Planting',
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'lbs/Acre/year',
        'Information Sheet': true,
      },
      {
        Variable: 'Drilled Depth Max',
        Description: 'Depth to plant seed in fractions of an inch',
        'Data Source': ['MCCC Species Tool'],
        Category: 'Planting',
        'Filter Field': true,
        Type: 'float',
        'Units/Details': 'inches, down to quarter, half, and eigths',
        'Information Sheet': true,
      },
    ],
  },
  {
    category: 'Termination',
    data: [
      {
        Variable: 'Tillage Termination at Vegetative',
        Description:
          'Likelihood that tillage (i.e. destructive mechanical operations that disturb the soil, as with disking or rotovating) will successfully terminate the cover crop while it is in the vegetative stage. The expert group premises that all cover crops can be terminated with tillage, but that 1 represents hard to terminate with tillage and requires an aggressive technique, where as 5 is easy to terminate with tillage and requires the least aggressive technique. The techniques are categoriezed as follows.\n\n5-light disk\n4-heavy disk\n3-chisel plow\n2-rototill\n1-moldboard',
        'Data Source': ['MCCC Species Tool'],
        Values: '5-light disk 4-heavy disk 3-chisel plow 2-rototill 1-moldboard',
        Category: 'Termination',
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rating 1-5',
        'Information Sheet': true,
      },
      {
        Variable: 'Planting Green',
        Description:
          'Planting cash crop then immediately terminating cover crop (prior to cash crop emergence). Note: any crop can be planted green with the correct equipment; this column represents general considerations.',
        'Data Source': ['Paul Salon'],
        Values: 'Yes, No',
        Category: 'Termination',
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rating 1-5',
        'Information Sheet': true,
      },
      {
        Variable: 'Freezing Termination at Flowering',
        Description:
          'Likelihood that conditions below 32 degrees F will successfully terminate the cover crop while it is in the flowering stage.',
        Values:
          '5. Likely to terminate in mild freeze 1. Requires a very significant freeze to terminate',
        Category: 'Termination',
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rating 1-5',
        'Information Sheet': true,
      },
      {
        Variable: 'Chemical Termination at Vegetative',
        Description:
          'Likelihood that herbicide application will successfully terminate the cover crop while it is in the vegetative stage.',
        Category: 'Termination',
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rating 1-5',
        'Information Sheet': true,
      },
      {
        Variable: 'Tillage Termination at Flowering',
        Description:
          'Likelihood that tillage (i.e. destructive mechanical operations that disturb the soil, as with disking or rotovating) will successfully terminate the cover crop while it is in the flowering stage. The expert group premises that all cover crops can be terminated with tillage, but that 1 represents hard to terminate with tillage and requires an aggressive technique, where as 5 is easy to terminate with tillage and requires the least aggressive technique. The techniques are categoriezed as follows.\n\n5-light disk\n4-heavy disk\n3-chisel plow\n2-rototill\n1-moldboard',
        'Data Source': ['MCCC Species Tool'],
        Values: '5-light disk 4-heavy disk 3-chisel plow 2-rototill 1-moldboard',
        Category: 'Termination',
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rating 1-5',
        'Information Sheet': true,
      },
      {
        Variable: 'Freezing Termination at Vegetative',
        Description:
          'Likelihood that conditions below 32 degrees F will successfully terminate the cover crop while it is in the vegetative stage.',
        Values:
          '5 likely to terminate in mild freeze  1 requires a very significant freeze to terminate',
        Category: 'Termination',
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rating 1-5',
        'Information Sheet': true,
      },
      {
        Variable: 'Chemical Termination at Flowering',
        Description:
          'Likelihood that herbicide application will successfully terminate the cover crop while it is in the flowering stage.',
        Category: 'Termination',
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rating 1-5',
        'Information Sheet': true,
      },
      {
        Variable: 'Mow Termination at Flowering',
        Description:
          'Likelihood that mowing (i.e. destructive mechanical operations that do not disturb the soil) will successfully terminate the cover crop while it is in the flowering stage.',
        Category: 'Termination',
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rating 1-5',
        'Information Sheet': true,
      },
      {
        Variable: 'Roller Crimp Termination at Flowering',
        Description:
          'Likelihood that roller-crimping will successfully terminate the cover crop while it is in the flowering stage. Termination is most successful at higher crop densities (3+ tons of drymatter per acre).\n\nRoller crimping is usually used in tandem with chemical termination outside of organic systems.',
        Category: 'Termination',
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rating 1-5',
        'Information Sheet': true,
      },
    ],
  },
  {
    category: 'Grazers & Pollinators',
    data: [
      {
        Variable: 'Pollinator Habitat',
        Description: 'Extent to which the cover crop can serve as habitat for pollinators.',
        'Data Source': ['MCCC Species Tool'],
        Category: 'Grazers & Pollinators',
        'Cover Crop Goals': ['recdbvSJ6Q8iT2haq'],
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rating 1-5',
        'Information Sheet': true,
      },
      {
        Variable: 'Pollinator Food',
        Description:
          'Extent to which the cover crop provides food (i.e. leaves, nectar, pollen) for pollinators.',
        'Data Source': ['MCCC Species Tool'],
        Category: 'Grazers & Pollinators',
        'Cover Crop Goals': ['recdbvSJ6Q8iT2haq'],
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rating 1-5',
        'Information Sheet': true,
      },
    ],
  },
  {
    category: 'Weeds',
    data: [
      {
        Variable: 'Volunteer Establishment',
        Description:
          'Risk of previous cover crop volunteering in current cash crop due to management (i.e. the previous cover crop setting seed that became part of the soil weed seedbank). 1=rarely volunteers, 5=frequently volunteers\nShorter-term issue, relies more on management. May be positive if you want it to re-seed. Impact depends on crop rotation.',
        Category: 'Weeds',
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rating 1-5',
        'Information Sheet': true,
      },
      {
        Variable: 'Persistence',
        Description:
          'Indicator of likelihood that the cover crop seed, once planted, will sit in the soil for an extended time then germinate at an inopportune moment (e.g., during cash crop growth). 1= rarely has hard seed, 5=hard seed is a frequent concern. \n"Hardseedness" in MW tool "Risk is in the CC seedbag", long-term issue.',
        Category: 'Weeds',
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rating 1-5',
        'Information Sheet': true,
      },
    ],
  },
  {
    category: 'Disease & Non-Weed Pests',
    data: [
      {
        Variable: 'Discourages Nematodes',
        Description:
          'Ability of a cover crop to decrease nematode populations (e.g., trap crop). 1=poor choice for discouraging nematodes, 5=excellent choice',
        'Data Source': ['MCCC Species Tool'],
        Category: 'Disease & Non-Weed Pests',
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rating 1-5',
        'Information Sheet': true,
      },
      {
        Variable: 'Promotes Nematodes',
        Description:
          'Ability of a cover crop to increase nematode populations. \n1=does not support nematode populations, 5=excellent for increasing nematode populations',
        'Data Source': ['MCCC Species Tool'],
        Category: 'Disease & Non-Weed Pests',
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rating 1-5',
        'Information Sheet': true,
      },
      {
        Variable: 'Discourages Pest Insects',
        Description:
          'Ability of a cover crop to decrease insect pest populations. 1=poor choice for discouraging insect pests, 5=excellent choice',
        'Data Source': ['MCCC Species Tool'],
        Category: 'Disease & Non-Weed Pests',
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rating 1-5',
        'Information Sheet': true,
      },
      {
        Variable: 'Promotes Pest Insects',
        Description:
          'Ability of a cover crop to increase insect pest populations. 1=does not promote insect populations, 5=frequently promotes pest insects',
        'Data Source': ['MCCC Species Tool'],
        Category: 'Disease & Non-Weed Pests',
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rating 1-5',
        'Information Sheet': true,
      },
      {
        Variable: 'Suppresses Cash Crop Disease',
        Description:
          "Relative ranking of cover crop's impact in suppressing disease in the following cash crop. \n1 - does not suppress disease in following cash crop.\n5 - very likely to suppress disease in following cash crop.",
        'Data Source': ['MCCC Species Tool'],
        Category: 'Disease & Non-Weed Pests',
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rating 1-5',
        'Information Sheet': true,
      },
      {
        Variable: 'Promotes Cash Crop Disease',
        Description:
          "Relative ranking of cover crop's impact on promoting disease in the following cash crop. \n1 - does not promote disease in following cash crop.\n5 - very likely to promote disease in following cash crop.",
        'Data Source': ['MCCC Species Tool'],
        Category: 'Disease & Non-Weed Pests',
        'Filter Field': true,
        Type: 'integer',
        'Units/Details': 'rating 1-5',
        'Information Sheet': true,
      },
    ],
  },
];

export const downloadAllPDF = (selectedCropNames) => {
  const zip = new JSZip();
  let count = 0;
  const zipFilename = 'Information-Sheets.zip';
  selectedCropNames.forEach((val) => {
    const filename = `${val.name}.pdf`;
    JSZipUtils.getBinaryContent(val.pdf, (err, data) => {
      if (err) {
        throw err; // or handle the error
      }
      zip.file(filename, data, { binary: true });
      // eslint-disable-next-line no-plusplus
      count++;
      if (count === selectedCropNames.length) {
        zip.generateAsync({ type: 'blob' }).then((sourceContent) => {
          saveAs.saveAs(sourceContent, zipFilename);
        });
      }
    });
  });
};
// export const downloadAllCSV = (selectedCropNames) => {
//   let zip = new JSZip();
//   let count = 0;
//   var zipFilename = 'Information-Sheets-CSV.zip';
//   selectedCropNames.forEach((val) => {
//     let filename = val.name + '.csv';
//     JSZipUtils.getBinaryContent(val.csv, (err, data) => {
//       if (err) {
//         throw err; // or handle the error
//       }
//       zip.file(filename, data, { binary: true });
//       count++;
//       if (count === selectedCropNames.length) {
//         zip.generateAsync({ type: 'blob' }).then(function (content) {
//           saveAs.saveAs(content, zipFilename);
//         });
//       }
//     });
//   });
// };

export const RenderSeedPriceIcons = ({ val }) => {
  switch (parseInt(val, 10)) {
    case 1:
      return (
        <>
          <span style={{ color: '#35999b' }}>
            <MonetizationOn />
          </span>
          <span style={{ color: '#35999b', opacity: 0.2 }}>
            <MonetizationOn />
          </span>
          <span style={{ color: '#35999b', opacity: 0.2 }}>
            <MonetizationOn />
          </span>
        </>
      );
    case 2:
      return (
        <>
          <span style={{ color: '#35999b' }}>
            <MonetizationOn />
          </span>
          <span style={{ color: '#35999b' }}>
            <MonetizationOn />
          </span>
          <span style={{ color: '#35999b', opacity: 0.2 }}>
            <MonetizationOn />
          </span>
        </>
      );
    case 3:
      return (
        <>
          <span style={{ color: '#35999b' }}>
            <MonetizationOn />
          </span>
          <span style={{ color: '#35999b' }}>
            <MonetizationOn />
          </span>
          <span style={{ color: '#35999b' }}>
            <MonetizationOn />
          </span>
        </>
      );
    default:
      break;
  }
};

export const CropImage = ({
  present = true,
  src = '',
  alt = '',
  view = '',
  className = '',
  onClick = () => {},
}) => {
  const placeholder = '//placehold.it/100x100';
  let imageStyle = {};

  switch (view) {
    case 'calendar':
      imageStyle = {
        width: '50px',
        height: '50px',
        maxWidth: '50px',
        maxHeight: '50px',
      };
      break;
    case 'information-sheet':
      imageStyle = {
        // width: "255px",
        height: '250px',
      };
      break;
    case 'photo-grid':
      imageStyle = {
        width: '200px',
        height: '200px',
      };
      break;
    default:
      imageStyle = {
        width: '100px',
        height: '100px',
        maxWidth: '200px',
        // maxHeight: "100px",
      };
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <img
      className={className || `image-for-${alt}`}
      onClick={onClick}
      src={present ? src : placeholder}
      alt={present ? alt : 'Placeholder'}
      style={imageStyle}
    />
  );
};
export const ucFirst = (text = '') => text
  .toLowerCase()
  .split(' ')
  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
  .join(' ');

export const flipCoverCropName = (cropName = '') => {
  if (cropName.toLowerCase() === 'Sorghum-sudangrass'.toLowerCase()) {
    return 'Sudex';
  }
  const cropNames = cropName.split(',');

  if (cropNames.length > 1) {
    return `${cropNames[1]} ${cropNames[0]}`;
  }
  return cropName;
};

export const getActiveCropMonths = (crop = {}) => {
  const activeMonths = [];
  if (crop['Active Growth Period'].includes('Winter')) {
    activeMonths.push('Dec');
    activeMonths.push('Jan');
    activeMonths.push('Feb');
  }
  if (crop['Active Growth Period'].includes('Summer')) {
    activeMonths.push('Jun');
    activeMonths.push('Jul');
    activeMonths.push('Aug');
  }

  if (crop['Active Growth Period'].includes('Fall')) {
    activeMonths.push('Sep');
    activeMonths.push('Oct');
    activeMonths.push('Nov');
  }

  if (crop['Active Growth Period'].includes('Spring')) {
    activeMonths.push('Mar');
    activeMonths.push('Apr');
    activeMonths.push('May');
  }
  return activeMonths;
};

export const RestartPrompt = ({
  open = false,
  selectedCrops = [],
  setOpen = () => {},
  onAccept = () => {},
}) => (
  <Dialog disableEscapeKeyDown open={open}>
    <DialogContent dividers>
      <Typography variant="body1">
        {selectedCrops.length > 0
          ? `Restarting will remove all cover crops added to your list. Are you
        sure you want to restart?`
          : 'Are you sure you want to restart?'}
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button
        autoFocus
        onClick={() => {
          setOpen(false);
          onAccept(false);
        }}
        color="secondary"
      >
        No
      </Button>
      <Button
        onClick={() => {
          onAccept(true);
        }}
        color="secondary"
      >
        Yes
      </Button>
    </DialogActions>
  </Dialog>
);

export const sudoButtonStyle = {
  fontWeight: '500',
  lineHeight: '1.75',
  letterSpacing: '0.02857em',
  textTransform: 'uppercase',
  fontSize: '0.875rem',
};

export const sudoButtonStyleWithPadding = {
  padding: '6px 8px',
  fontWeight: '500',
  lineHeight: '1.75',
  letterSpacing: '0.02857em',
  textTransform: 'uppercase',
  fontSize: '0.875rem',
};
