/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  Button,
  Grid,
  Typography,
  Tooltip,
} from '@mui/material';
import styled from 'styled-components';
import moment from 'moment';
import { Info, MonetizationOn } from '@mui/icons-material';

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

export const LightButton = styled(Button)({
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
});

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

export const allMonths = moment().localeData().monthsShort();

export const greenBarExpansionPanelHeight = {
  large: '600px',
  medium: '600px',
  small: '600px',
};

export const trimString = (stringFull, size) => {
  if (!Number.isNaN(size)) {
    return `${stringFull.substring(0, size)}${stringFull.length > 25 ? '...' : ''}`;
  } return stringFull;
};

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
      return null;
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
  if (crop['Active Growth Period'].values.includes('Winter')) {
    activeMonths.push('Dec');
    activeMonths.push('Jan');
    activeMonths.push('Feb');
  }
  if (crop['Active Growth Period'].values.includes('Summer')) {
    activeMonths.push('Jun');
    activeMonths.push('Jul');
    activeMonths.push('Aug');
  }

  if (crop['Active Growth Period'].values.includes('Fall')) {
    activeMonths.push('Sep');
    activeMonths.push('Oct');
    activeMonths.push('Nov');
  }

  if (crop['Active Growth Period'].values.includes('Spring')) {
    activeMonths.push('Mar');
    activeMonths.push('Apr');
    activeMonths.push('May');
  }
  return activeMonths;
};

export const BinaryButton = ({ action }) => (
  <>
    <Button
      onClick={() => {
        action(true);
      }}
      color="secondary"
    >
      Yes
    </Button>
    <Button
      onClick={() => {
        action(false);
      }}
      color="secondary"
    >
      No
    </Button>
    <Button
      autoFocus
      onClick={() => {
        action(null);
      }}
      color="primary"
    >
      Cancel
    </Button>
  </>
);

export const Sort = (type = 'Average Goals', crops = [], dispatchValue = {}, selectedItems = [], sortFlag = '') => {
  if (type === 'Average Goals') {
    crops.sort((a, b) => {
      let aAvg = 0;
      let bAvg = 0;
      selectedItems
        .slice()
        .reverse()
        .forEach((goal) => {
          aAvg = +a.data.Goals[goal].values[0] + aAvg;
          bAvg = +b.data.Goals[goal].values[0] + bAvg;
        });
      aAvg /= selectedItems.length;
      bAvg /= selectedItems.length;

      if (aAvg > 0 && bAvg > 0) {
        if (aAvg > bAvg) {
          return -1;
        }
        return 1;
      }
      return 0;
    });
    if (!sortFlag) {
      crops.reverse();
    }
  }

  if (type === 'Crop Name') {
    if (sortFlag) {
      if (crops.length > 0) {
        crops.sort((a, b) => {
          const firstCropName = flipCoverCropName(
            a.data.Weeds['Cover Crop Name'].values[0].toLowerCase(),
          ).replace(/\s+/g, '');
          const secondCropName = flipCoverCropName(
            b.data.Weeds['Cover Crop Name'].values[0].toLowerCase(),
          ).replace(/\s+/g, '');
          return firstCropName.localeCompare(secondCropName);
        });

        dispatchValue(crops);
      }
    } else if (crops.length > 0) {
      crops.sort((a, b) => {
        const firstCropName = flipCoverCropName(a.data.Weeds['Cover Crop Name'].values[0].toLowerCase()).replace(
          /\s+/g,
          '',
        );
        const secondCropName = flipCoverCropName(b.data.Weeds['Cover Crop Name'].values[0].toLowerCase()).replace(
          /\s+/g,
          '',
        );
        if (firstCropName < secondCropName) {
          return 1;
        }
        if (firstCropName > secondCropName) {
          return -1;
        }
        return 0;
      });
    }
  }

  if (type === 'Selected Crops') {
    if (selectedItems.length > 0) {
      const selectedCropIds = [];
      selectedItems.forEach((crop) => {
        selectedCropIds.push(crop.id);
      });
      const newActiveShadow = crops.map((crop) => {
        crop.inBasket = selectedCropIds.includes(crop.id);
        return crop;
      });
      if (newActiveShadow.length > 0) {
        newActiveShadow.sort((a) => {
          if (a.inBasket) {
            return -1;
          }
          return 1;
        });

        dispatchValue(newActiveShadow);
      }
    }
  }
};

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

export const getMonthDayString = (type = '', date = '') => {
  const formattedDate = date.split('-');
  switch (type) {
    case 'reliable': {
      const startDate = moment(formattedDate[0], 'MM-DD-YYYY');
      const endDate = moment(formattedDate[1], 'MM-DD-YYYY');

      return `${startDate.format('MM/DD')} - ${endDate.format('MM/DD')}`;
    }
    // case 'reliable-second': {
    //   const startDate = moment(formattedDate[0], 'MM-DD-YYYY');
    //   const endDate = moment(formattedDate[1], 'MM-DD-YYYY');

    //   return `${startDate.format('MM/DD')} - ${endDate.format('MM/DD')}`;
    // }
    // case 'temperature': {
    //   if (
    //     crop['Temperature/Moisture Risk to Establishment Start']
    //     && crop['Temperature/Moisture Risk to Establishment End']
    //   ) {
    //     const startDate = moment(
    //       crop['Temperature/Moisture Risk to Establishment Start'],
    //       'YYYY-MM-DD',
    //     );
    //     const endDate = moment(
    //       crop['Temperature/Moisture Risk to Establishment End'],
    //       'YYYY-MM-DD',
    //     );
    //     return `${startDate.format('MM/DD')} - ${endDate.format('MM/DD')}`;
    //   }
    //   return 'N/A';
    // }
    // case 'temperature-second': {
    //   const startDate = moment(
    //     crop['Second Temperature/Moisture Risk to Establishment Start'],
    //     'YYYY-MM-DD',
    //   );
    //   const endDate = moment(
    //     crop['Second Temperature/Moisture Risk to Establishment End'],
    //     'YYYY-MM-DD',
    //   );
    //   return `${startDate.format('MM/DD')} - ${endDate.format('MM/DD')}`;
    // }
    default:
      return '';
  }
};
