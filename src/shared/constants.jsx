/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import {
  Grid, Typography, Box,
} from '@mui/material';
import moment from 'moment';
import { Info, MonetizationOn } from '@mui/icons-material';
import { PSAButton, PSATooltip } from 'shared-react-components/src';
import { mapboxToken } from './keys';
import arrayEquals from './functions';
import { historyState, setHistoryState } from '../reduxStore/userSlice';
import pirschAnalytics from './analytics';

export const ReferenceTooltip = ({
  url, source, type, content, hasLink, title,
}) => {
  const sourceURL = url;
  const sourceName = source;
  const sourceType = type || 'link';
  const sourceContent = content || '';
  const link = hasLink;

  return sourceType === 'link' ? (
    <PSATooltip
      enterTouchDelay={0}
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
      tooltipContent={(
        <span
          role="button"
          aria-label={`Source:${sourceName}`}
        >
          <Info sx={{ fontSize: '1rem' }} tabIndex="0" />
        </span>
      )}
    />
  ) : sourceType === 'html' ? (
    <PSATooltip
      arrow
      sourceType={sourceType}
      dangerouslySetInnerHTML={{ content }}
      enterTouchDelay={0}
      tooltipContent={(
        <Info sx={{ fontSize: '1rem' }} tabIndex="0" />
      )}
    />
  ) : link ? (
    <PSATooltip
      title={title}
      placement="right"
      arrow
      enterTouchDelay={0}
      tooltipContent={(
        <span role="button" aria-label={sourceContent}>
          <Info sx={{ fontSize: '1rem' }} tabIndex="0" />
        </span>
      )}
    />
  ) : (
    <PSATooltip
      enterTouchDelay={0}
      title={(
        <div>
          <Typography variant="body1">{sourceContent}</Typography>
        </div>
      )}
      placement="right"
      arrow
      tooltipContent={(
        <span
          role="button"
          aria-label={sourceContent}
        >
          <Info sx={{ fontSize: '1rem' }} tabIndex="0" />
        </span>
      )}
    />
  );
};

export const DataTooltip = ({ data, placement = 'top-start' }) => (
  <PSATooltip
    title={<div style={{ textAlign: 'center' }}>{data}</div>}
    placement={placement}
    arrow
    enterTouchDelay={0}
    tooltipContent={(
      <span
        role="button"
        aria-label={data}
      >
        <Info sx={{ fontSize: '1rem' }} tabIndex="0" />
      </span>
    )}
  />
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
    input = input.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
    );
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
  lightGreen: '#5c8136',
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

export const getRating = (rating, councilShorthand) => {
  const ratingInt = parseInt(rating, 10);

  return (
    <svg
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="#2d7b7b"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="miter"
      aria-label={`Rating: ${ratingInt}`}
    >
      {councilShorthand !== 'MCCC' && <line x1="22" y1="3" x2="22" y2="21" stroke={ratingInt >= 5 ? '#2d7b7b' : '#d3d3d3'} strokeWidth={3} aria-hidden />}
      <line x1="17" y1="7" x2="17" y2="21" stroke={ratingInt >= 4 ? '#2d7b7b' : '#d3d3d3'} strokeWidth={3} aria-hidden />
      <line x1="12" y1="11" x2="12" y2="21" stroke={ratingInt >= 3 ? '#2d7b7b' : '#d3d3d3'} strokeWidth={3} aria-hidden />
      <line x1="7" y1="14" x2="7" y2="21" stroke={ratingInt >= 2 ? '#2d7b7b' : '#d3d3d3'} strokeWidth={3} aria-hidden />
      <line x1="2" y1="17" x2="2" y2="21" stroke={ratingInt >= 1 ? '#2d7b7b' : '#d3d3d3'} strokeWidth={3} aria-hidden />
    </svg>
  );
};

export const allMonths = moment().localeData().monthsShort();

export const trimString = (stringFull, size) => {
  if (!Number.isNaN(size)) {
    return `${stringFull.substring(0, size)}${stringFull.length > size ? '...' : ''}`;
  }
  return stringFull;
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
  onClick = () => { },
}) => {
  const placeholder = '//placehold.it/100x100';
  let imageStyle = {};

  switch (view) {
    case 'calendar':
    case 'table':
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
        width: '75px',
        height: '75px',
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

  const flipedCropName = `${cropNames[1]} ${cropNames[0]}`;

  if (cropNames.length > 1) {
    return `${flipedCropName.substring(0, 20)} ${flipedCropName.length > 20 ? '...' : ''}`;
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
    <PSAButton
      buttonType=""
      onClick={() => {
        action(true);
      }}
      color="secondary"
      title="Yes"
    />
    <PSAButton
      buttonType=""
      onClick={() => {
        action(false);
      }}
      color="secondary"
      title="No"
    />
    <PSAButton
      autoFocus
      buttonType=""
      onClick={() => {
        action(null);
      }}
      color="primary"
      title="Cancel"
    />
  </>
);

const compareValues = (aValue, bValue, sortFlag) => {
  if (aValue > bValue) return sortFlag ? -1 : 1;
  if (aValue < bValue) return sortFlag ? 1 : -1;
  return 0;
};

const getAverageGoals = (crop, selectedItems) => {
  let total = 0;
  selectedItems.slice().reverse().forEach((g) => {
    const goalData = crop.goals.find((data) => data.label === g);
    if (goalData?.values.length > 0) {
      total += +goalData.values[0].value;
    }
  });
  return total / selectedItems.length;
};

export const sortByAverageGoals = (crops, { selectedItems }) => {
  crops.sort((a, b) => compareValues(getAverageGoals(b, selectedItems), getAverageGoals(a, selectedItems), false));
};

export const sortByGoal = (crops, { goal, sortFlag }) => {
  crops.sort((a, b) => {
    const aGoal = a.goals.find((data) => data.label === goal);
    const bGoal = b.goals.find((data) => data.label === goal);

    if (aGoal?.values.length > 0 && bGoal?.values.length > 0) {
      const aGoalValue = aGoal.values[0].value;
      const bGoalValue = bGoal.values[0].value;
      return compareValues(aGoalValue, bGoalValue, sortFlag);
    }

    if (aGoal?.values.length > 0) {
      return sortFlag ? -1 : 1;
    }

    if (bGoal?.values.length > 0) {
      return sortFlag ? 1 : -1;
    }

    return 0;
  });
};

const cropNameSorting = (a, b, sortFlag) => {
  const firstCropName = flipCoverCropName(a.label.toLowerCase()).replace(/\s+/g, '');
  const secondCropName = flipCoverCropName(b.label.toLowerCase()).replace(/\s+/g, '');
  return sortFlag
    ? secondCropName.localeCompare(firstCropName)
    : firstCropName.localeCompare(secondCropName);
};

export const sortByCropName = (crops, { sortFlag }) => {
  crops.sort((a, b) => cropNameSorting(a, b, sortFlag));
};

const getReliableEstablishmentDate = (plantingDates, sortFlag) => {
  const reliableEstablishmentData = plantingDates.filter((date) => date.label === 'Reliable Establishment');
  if (reliableEstablishmentData.length === 0) return null;

  const { values } = reliableEstablishmentData[0];
  if (values.length === 0) return null;

  const dateString = sortFlag
    ? values[values.length - 1].value.split(' - ')[sortFlag ? 0 : 1]
    : values[values.length - 1].value.split(' - ')[1];

  return new Date(dateString)
    .toLocaleDateString('en-GB')
    .split('/')
    .reverse()
    .join('');
};

export const sortByPlantingWindow = (crops, { sortFlag }) => {
  if (crops.length > 0) {
    crops.sort((a, b) => {
      const firstDate = getReliableEstablishmentDate(a.plantingDates, sortFlag);
      const secondDate = getReliableEstablishmentDate(b.plantingDates, sortFlag);

      if (firstDate && secondDate) {
        return sortFlag ? secondDate.localeCompare(firstDate) : firstDate.localeCompare(secondDate);
      }

      if (firstDate) {
        return sortFlag ? -1 : 1;
      }

      return sortFlag ? 1 : -1;
    });
  }
};

export const sortBySelectedCrops = (crops, { selectedItems, sortFlag }) => {
  if (selectedItems.length > 0) {
    crops.sort((a, b) => {
      if (selectedItems.includes(a.id)) return sortFlag ? -1 : 1;
      if (selectedItems.includes(b.id)) return sortFlag ? 1 : -1;
      return 0;
    });
  }
};

export const sortByCropGroup = (crops, { sortFlag }) => {
  crops.sort((a, b) => {
    const firstGroup = a.group.toLowerCase().replace(/\s+/g, '');
    const secondGroup = b.group.toLowerCase().replace(/\s+/g, '');
    const groupComparison = firstGroup.localeCompare(secondGroup);

    if (groupComparison === 0) {
      cropNameSorting(firstGroup, secondGroup, sortFlag);
    }

    return groupComparison;
  });
};

export const sortFunctions = {
  'Average Goals': sortByAverageGoals,
  Goal: sortByGoal,
  'Crop Name': sortByCropName,
  'Planting Window': sortByPlantingWindow,
  'Selected Crops': sortBySelectedCrops,
  'Crop Group': sortByCropGroup,
};

export const sortCrops = (
  type = 'Average Goals',
  crops = [],
  sortFlag = '',
  selectedItems = [],
  goal = '',
) => {
  if (sortFunctions[type]) {
    sortFunctions[type](crops, { sortFlag, selectedItems, goal });
  }
};

export const sudotype = {
  fontWeight: '500',
  lineHeight: '1.75',
  letterSpacing: '0.02857em',
  fontSize: '0.875rem',
  textAlign: 'center',
};

export const sudotypeWithPadding = {
  padding: '6px 8px',
  fontWeight: '500',
  lineHeight: '1.75',
  letterSpacing: '0.02857em',
  textTransform: 'uppercase',
  fontSize: '0.875rem',
  textAlign: 'center',
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

export const getLegendDataBasedOnCouncil = (councilShorthand = '') => {
  const legendData = [
    { className: 'reliable', label: 'Reliable Establishment', color: '#2d7b7b' },
    { className: 'temperatureRisk', label: 'Temperature Risk To Establishment', color: '#f2c94c' },
    { className: 'frostPossible', label: 'Frost Seeding Possible', color: '#2f80ed' },
    { className: 'multiple', label: 'Multiple', color: '#c5c6c7' },
    { className: 'cashCrop', label: 'Cash Crop Growing Window', color: 'rgba(255, 12, 62, 0.2)' },
    { className: 'hessianFlyFree', label: 'Hessian Fly Free Date', color: '#f8a504' },
  ];
  const MCCClegendData = [
    { className: 'reliable', label: 'Reliable Establishment', color: '#2d7b7b' },
    { className: 'temperatureRisk', label: 'Freeze/Moisture Risk to Establishment', color: '#f2c94c' },
    { className: 'multiple', label: 'Multiple', color: '#c5c6c7' },
    { className: 'cashCrop', label: 'Cash Crop Growing Window', color: 'rgba(255, 12, 62, 0.2)' },
    { className: 'hessianFlyFree', label: 'Hessian Fly Free Date', color: '#f8a504' },
  ];
  const SCCClegendData = [
    { className: 'reliable', label: 'Reliable Establishment', color: '#2d7b7b' },
    { className: 'cashCrop', label: 'Cash Crop Growing Window', color: 'rgba(255, 12, 62, 0.2)' },
  ];
  const NECCClegendData = [
    { className: 'reliable', label: 'Reliable Establishment', color: '#2d7b7b' },
    { className: 'temperatureRisk', label: 'Temperature Risk To Establishment', color: '#f2c94c' },
    { className: 'frostPossible', label: 'Frost Seeding Possible', color: '#2f80ed' },
    { className: 'multiple', label: 'Multiple', color: '#c5c6c7' },
    { className: 'cashCrop', label: 'Cash Crop Growing Window', color: 'rgba(255, 12, 62, 0.2)' },
    { className: 'canInterseed', label: 'Can Interseed', color: '#dd4c9f' },
  ];
  const WCCClegendData = [
    { className: 'reliable', label: 'Irrigation Planting Window', color: '#2d7b7b' },
    { className: 'temperatureRisk', label: 'Rainfed Planting Window', color: '#f2c94c' },
    { className: 'multiple', label: 'Multiple', color: '#c5c6c7' },
    { className: 'cashCrop', label: 'Cash Crop Growing Window', color: 'rgba(255, 12, 62, 0.2)' },
  ];
  switch (councilShorthand) {
    case 'MCCC':
      return MCCClegendData;
    case 'SCCC':
      return SCCClegendData;
    case 'NECCC':
      return NECCClegendData;
    case 'WCCC':
      return WCCClegendData;
    default:
      return legendData;
  }
};

export const reverseGEO = async (lat, lng) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxToken}`;
  let data = await fetch(url);
  data = data.json();
  return data;
};

export const callCoverCropApi = async (url) => fetch(url)
  .then((res) => res.json())
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err.message);
  });

export const cropDataFormatter = (cropData = [{}], cashCropStartDate = '', cashCropEndDate = '') => {
  const formatYearArr = (yearArr = []) => {
    const result = [];
    let i = 0;
    let j = 0;
    while (i < yearArr.length) {
      while (j < yearArr.length && arrayEquals(yearArr[i].info, yearArr[j].info)) {
        j += 1;
      }
      result.push({
        startTime: moment().dayOfYear(i + 1).format('MM/DD'),
        endTime: moment().dayOfYear(j).format('MM/DD'),
        info: yearArr[i].info,
        length: j - i,
      });
      i = j;
    }
    return result;
  };

  const formatTimeToYearArr = (startTime, endTime, param, yearArr = []) => {
    const startIndex = moment(startTime, 'MM/DD').dayOfYear() - 1;
    const endIndex = moment(endTime, 'MM/DD').dayOfYear() - 1;
    yearArr = yearArr.map((day, index) => {
      if (index >= startIndex && index <= endIndex) {
        return { info: [...day.info, param] };
      }
      return day;
    });
    return yearArr;
  };

  const monthStringBuilder = (vals) => {
    const val = vals;
    let yearArr = Array.from({ length: 365 }, () => ({
      info: [],
    }));

    val.plantingDates.forEach((date) => {
      date.values.forEach((dateArray) => {
        let valStart;
        let valEnd;
        // hessian fly dates are an exception to this condition because it has only one date and not a range
        if (date.label === 'Hessian Fly Free Date') {
          valStart = moment(dateArray.value, 'YYYY-MM-DD').format('MM/DD');
          valEnd = valStart;
        }
        const datesArr = dateArray.value.split('-');
        if (datesArr.length > 1 && date.label !== 'Hessian Fly Free Date') {
          valStart = moment(datesArr[0], 'MM/DD/YYYY').format('MM/DD');
          valEnd = moment(datesArr[1], 'MM/DD/YYYY').format('MM/DD');
        }
        if (
          moment(valStart, 'MM/DD').isSameOrAfter(moment(valEnd, 'MM/DD'))
          && date.label !== 'Hessian Fly Free Date'
        ) {
          // Average Frost date should be divided into two years
          const tempStart = '01/01';
          const tempEnd = '12/31';
          yearArr = formatTimeToYearArr(valStart, tempEnd, date.label, yearArr);
          yearArr = formatTimeToYearArr(tempStart, valEnd, date.label, yearArr);
        } else {
          yearArr = formatTimeToYearArr(valStart, valEnd, date.label, yearArr);
        }
      });
    });
    // add cash crop dates dates
    if (cashCropStartDate !== '' && cashCropEndDate !== '') {
      yearArr = formatTimeToYearArr(cashCropStartDate, cashCropEndDate, 'Cash Crop Growing', yearArr);
    }

    const yearData = formatYearArr(yearArr);
    vals.cropGrowthWindow = yearData;

    // this is temporary, needs to be replaced with wither a fix to calendar growth window component or exporting of json from airtable
    Object.keys(vals).forEach((item) => {
      if (item.endsWith('Early') || item.endsWith('Mid')) {
        const uniq = [...new Set(vals[item])];
        const removedOldVals = uniq.filter((u) => !u.endsWith('growth'));
        vals[item] = removedOldVals;
      }
    });
    return vals;
  };
  return cropData.map((crop) => monthStringBuilder(crop));
};

// TODO: not used below
export const apiServerUrl = 'https://history.covercrop-data.org/v1';

export const getFields = async (accessToken = null) => {
  const url = `${apiServerUrl}/fields?page=1&perPage=200`;
  const config = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return (
    fetch(url, config)
      .then((res) => res.json())
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err))
  );
};

export const postFields = async (accessToken = null, fieldsData = null) => {
  const url = `${apiServerUrl}/fields`;
  const config = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(fieldsData),
  };
  return (
    fetch(url, config)
      .then((res) => res.json())
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err))
  );
};

export const deleteFields = async (accessToken = null, id = null) => {
  const url = `${apiServerUrl}/fields/${id}`;
  const config = {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return (
    fetch(url, config)
      .then((res) => res.json())
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err))
  );
};
// TODO: not used above

export const buildPoint = (lng, lat, name = null) => ({
  type: 'Feature',
  label: name,
  geometry: {
    coordinates: [lng, lat],
    type: 'Point',
  },
});

export const buildGeometryCollection = (point, polygon, name = null) => {
  const { coordinates: pointCoordinates } = point;
  const { coordinates: polygonCoordinates } = polygon;
  return {
    type: 'Feature',
    label: name,
    geometry: {
      type: 'GeometryCollection',
      geometries: [
        {
          type: 'Point',
          coordinates: pointCoordinates,
        },
        {
          type: 'Polygon',
          coordinates: polygonCoordinates,
        },
      ],
    },
  };
};

export const drawAreaFromGeoCollection = (geoCollection) => [
  { type: 'Feature', geometry: { ...geoCollection.geometry.geometries[1] } },
];

export const addCropToBasket = (
  cropId,
  cropName,
  dispatchRedux,
  snackHandler,
  updateSelectedCropIds,
  selectedCropIdsRedux,
  myCropListLocation,
  historyStateRedux,
  from,
  setSaveHistory,
) => {
  const selectedCrops = cropId;

  const buildDispatch = (action, crops) => {
    dispatchRedux(updateSelectedCropIds(crops));
    dispatchRedux(snackHandler({ snackOpen: true, snackMessage: `${cropName} ${action}` }));
  };

  // update history state
  if (historyStateRedux === historyState.imported) dispatchRedux(setHistoryState(historyState.updated));

  if (selectedCropIdsRedux?.length > 0) {
    // DONE: Remove crop from basket
    let removeIndex = -1;
    selectedCropIdsRedux.forEach((item, i) => {
      if (item === cropId) {
        removeIndex = i;
      }
    });
    if (removeIndex === -1) {
      // element not in array
      buildDispatch('added', [...selectedCropIdsRedux, selectedCrops]);
    } else {
      const selectedCropsCopy = selectedCropIdsRedux;
      selectedCropsCopy.splice(removeIndex, 1);
      buildDispatch('Removed', selectedCropsCopy);
      if (selectedCropsCopy.length === 0) {
        dispatchRedux(myCropListLocation({ from: '' }));
      }
    }
  } else {
    dispatchRedux(myCropListLocation({ from }));
    buildDispatch('Added', [selectedCrops]);
  }
  // save history after added crop
  if (historyStateRedux !== historyState.none) dispatchRedux(setSaveHistory(true));
  // analytics
  pirschAnalytics(from === 'selector' ? 'Get A Recommendation' : 'Browse Cover Crops', { meta: { addedToMyList: true } });
};

// TODO: not used below
export const getHistory = async (accessToken = null) => {
  const url = `${apiServerUrl}/history?schema=1`;
  const config = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return (
    fetch(url, config)
      .then((res) => res.json())
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err))
  );
};

export const buildHistory = (
  stateId,
  stateLabel,
  regionId,
  regionShorthand,
  councilLabel,
  councilShorthand,
  consentStatus,
  consentDate,
  fieldId,
) => {
  const history = () => {
    // temporarily we don't save region in user history
    const historyWithoutRegion = {
      json: {
        state: {
          id: stateId,
          label: stateLabel,
        },
        council: {
          label: councilLabel,
          shorthand: councilShorthand,
        },
        consent: {
          status: consentStatus,
          date: consentDate,
        },
      },
      schemaId: 1,
    };
    return historyWithoutRegion;
  };

  if (fieldId) {
    return { ...history(), fieldId };
  }
  return history();
};

export const postHistory = async (accessToken = null, historyData = null) => {
  const url = `${apiServerUrl}/history`;
  const config = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(historyData),
  };
  return (
    fetch(url, config)
      .then((res) => res.json())
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err))
  );
};
// TODO: not used above

export const extractData = (attribute, from, councilShorthand) => {
  // handles no attribute
  if (!attribute) {
    return <Typography variant="body2">No Data</Typography>;
  }

  // extract data
  let dataType;
  const attributeValues = [];

  if (from === 'infoSheet') {
    if (attribute?.values[0]?.label) {
      return (
        <Typography variant="body2">{attribute?.values[0]?.label}</Typography>
      );
    }
    attribute?.values.forEach((ele) => {
      attributeValues.push(`${ele.value} ${attribute?.units ? attribute?.units : ''}`);
    });
    dataType = attribute?.dataType.label;
  } else {
    // from myCoverCropComparison
    for (let i = 0; i < attribute?.values.length; i++) {
      if (attribute?.values[i].value) {
        attributeValues.push(`${attribute?.values[i].value} ${attribute?.units ? attribute?.units : ''}`);
      } else {
        attributeValues.push(attribute?.values[i]);
      }
    }
    dataType = attribute?.dataType;
  }

  const data = attributeValues;

  // handles no data
  if (!data) {
    return <Typography variant="body2">No Data</Typography>;
  }

  // handles pillbox data
  if (data && dataType === 'pillbox') {
    return getRating(data, councilShorthand);
  }

  // handle currency
  if (data && dataType === 'currency') {
    return <RenderSeedPriceIcons val={data} />;
  }

  if (data && dataType === 'boolean') {
    return <Typography variant="body2">{attribute.values[0].label}</Typography>;
  }

  // handles default
  return (
    <Box>
      {data.map((element, index) => <Typography key={index} variant="body2">{element.toString()}</Typography>)}
    </Box>
  );
};

export const hasGoalRatingTwoOrLess = (selectedGoals, crop = []) => {
  if (selectedGoals.length === 0) return crop.inactive;
  return crop.inactive || selectedGoals.every((rating) => crop[rating] <= 2);
};

export const getExpertsData = (councilId) => {
  switch (councilId) {
    case 1:
      return [
        { lastName: 'Davis', firstName: 'Brian', Affiliation: 'North Carolina State University' },
        { lastName: 'Marcillo', firstName: 'Guillermo', Affiliation: 'North Carolina State University' },
        { lastName: 'Peterson', firstName: 'Cara', Affiliation: 'University of Maryland' },
        { lastName: 'Sweep', firstName: 'Ethan', Affiliation: 'USDA ARS' },
        { lastName: 'Schomberg', firstName: 'Harry', Affiliation: 'USDA ARS' },
        { lastName: 'Purtilo', firstName: 'Jim', Affiliation: 'University of Maryland' },
        { lastName: 'Musial', firstName: 'Christian', Affiliation: 'University of Maryland' },
        { lastName: 'Lorenzi', firstName: 'Eli', Affiliation: 'University of Maryland' },
        { lastName: 'Jachja', firstName: 'Tiffany', Affiliation: 'University of Maryland' },
        { lastName: 'Wallace', firstName: 'Eric', Affiliation: 'University of Maryland' },
        { lastName: 'Aviles', firstName: 'Miguel', Affiliation: 'University of Maryland' },
        { lastName: 'Dalal', firstName: 'Sohum', Affiliation: 'University of Maryland' },
        { lastName: 'Choi', firstName: 'Brian', Affiliation: 'University of Maryland' },
        { lastName: 'Ma', firstName: 'Yanzhuo', Affiliation: 'University of Maryland' },
        { lastName: 'Nolan', firstName: 'Jack', Affiliation: 'University of Maryland' },
        { lastName: 'Pradhan', firstName: 'Neelima', Affiliation: 'University of Maryland' },
        { lastName: 'McCloskey', firstName: 'Mark', Affiliation: 'University of Maryland' },
        { lastName: 'Lee', firstName: 'Alex', Affiliation: 'University of Maryland' },
        { lastName: 'Hyun Lim', firstName: 'Jeong', Affiliation: 'University of Maryland' },
        { lastName: 'McNamee', firstName: 'Patrick', Affiliation: 'University of Maryland' },
        { lastName: 'Obizoba', firstName: 'Chukwuebuka', Affiliation: 'University of Maryland' },
        { lastName: 'Proctor', firstName: 'Alex', Affiliation: 'University of Maryland' },
        { lastName: 'Tamrakar', firstName: 'Sushant', Affiliation: 'University of Maryland' },
        { lastName: 'Feder', firstName: 'Matthew', Affiliation: 'University of Maryland' },
        { lastName: 'Kovvuru', firstName: 'Gautham', Affiliation: 'University of Maryland' },
        { lastName: 'Lee', firstName: 'Isaac', Affiliation: 'University of Maryland' },
        { lastName: 'Patel', firstName: 'Meekit', Affiliation: 'University of Maryland' },
        { lastName: 'Stumbaugh', firstName: 'Ryan', Affiliation: 'University of Maryland' },
        { lastName: 'Wallberg', firstName: 'Micah', Affiliation: 'University of Maryland' },
        { lastName: 'Wilton', firstName: 'Zachary', Affiliation: 'University of Maryland' },
      ];
    case 2:
      return (
        <>
          <Typography style={{ paddingTop: '15px' }} variant="body1" align="left">
            The MCCC verifies cover crop data at the state/provence level with cover crop experts from diverse state geographies and a breadth of experience.
            These experts include University Extension, Government Agencies, seed industry, and farmers.
          </Typography>
          <br />
          <a
            target="_blank"
            style={
              { fontSize: '20px', display: 'flex', justifyContent: 'center' }
            }
            href="https://midwestcovercrops.org/decision-tool-collaborators/"
            rel="noreferrer"
          >
            <b>About The Experts </b>
          </a>
        </>
      );
    case 3:
      return [
        { lastName: 'Bench', firstName: 'Christian', Affiliation: 'New Jersey farmer, USDA NRCS' },
        { lastName: 'Bergstrom', firstName: 'Gary', Affiliation: 'Cornell University' },
        { lastName: 'Björkman', firstName: 'Thomas', Affiliation: 'Cornell University' },
        { lastName: 'Brown', firstName: 'Rebecca', Affiliation: 'Rhode Island State University' },
        { lastName: 'Cavigelli', firstName: 'Michel', Affiliation: 'USDA ARS' },
        { lastName: 'Clark', firstName: 'Shawnna', Affiliation: 'USDA NRCS Plant Materials Center' },
        { lastName: 'Cochrane', firstName: 'Chad', Affiliation: 'USDA NRCS' },
        { lastName: 'Cooper', firstName: 'Aaron', Affiliation: 'Maryland farmer' },
        { lastName: 'Darby', firstName: 'Heather', Affiliation: 'University of Vermont' },
        { lastName: 'Duiker', firstName: 'Sjoerd', Affiliation: 'Penn State University' },
        { lastName: 'Farbotnik', firstName: 'Kaitlin', Affiliation: 'USDA NRCS' },
        { lastName: 'Gallandt', firstName: 'Eric', Affiliation: 'University of Maine' },
        { lastName: 'Gill', firstName: 'Kelly', Affiliation: 'Xerces Society' },
        { lastName: 'Goodson', firstName: 'Mark', Affiliation: 'USDA NRCS' },
        { lastName: 'Hively', firstName: 'W. Dean', Affiliation: 'USGS' },
        { lastName: 'Hooks', firstName: 'Cerruti', Affiliation: 'University of Maryland' },
        { lastName: 'Hyde', firstName: 'Jim', Affiliation: 'USDA NRCS' },
        { lastName: 'Larson', firstName: 'Zach', Affiliation: 'Bayer' },
        { lastName: 'Lilley', firstName: 'Jason', Affiliation: 'University of Maine' },
        { lastName: 'Long', firstName: 'Rebecca', Affiliation: 'University of Maine' },
        { lastName: 'Mallory', firstName: 'Ellen', Affiliation: 'University of Maine' },
        { lastName: 'Mehl', firstName: 'Hillary', Affiliation: 'USDA ARS' },
        { lastName: 'Mirsky', firstName: 'Steven', Affiliation: 'USDA ARS' },
        { lastName: 'O Reilly', firstName: 'Christine', Affiliation: 'Ontario Ministry of Agriculture, Food, and Rural Affairs' },
        { lastName: 'Raubenstein', firstName: 'Scott', Affiliation: 'Perdue AgriBusinesses' },
        { lastName: 'Ruhl', firstName: 'Lindsey', Affiliation: 'University of Vermont' },
        { lastName: 'Salon', firstName: 'Paul', Affiliation: 'USDA NRCS, retired' },
        { lastName: 'Smith', firstName: 'Brandon', Affiliation: 'American Farmland Trust' },
        { lastName: 'VanGessel', firstName: 'Mark', Affiliation: 'University of Delaware' },
        { lastName: 'Verhallen', firstName: 'Anne', Affiliation: 'Ontario Ministry of Agriculture, Food, and Rural Affairs, ret.' },
        { lastName: 'Wallace', firstName: 'John', Affiliation: 'Penn State University' },
        { lastName: 'Wilson', firstName: 'Dave', Affiliation: 'Kings AgriSeeds' },
        { lastName: 'Workman', firstName: 'Kirsten', Affiliation: 'Cornell University' },
      ];
    case 4:
      return [
        { lastName: 'Cappellazzi', firstName: 'Shannon', Affiliation: 'GO Seed' },
        { lastName: 'Berns', firstName: 'Keith ', Affiliation: 'Nebraska farmer, Green Cover Seed' },
        { lastName: 'Chase', firstName: 'Carlene', Affiliation: 'University of Florida' },
        { lastName: 'Treadwell', firstName: 'Danielle', Affiliation: 'University of Florida' },
        { lastName: 'Haramoto', firstName: 'Erin', Affiliation: 'University of Kentucky' },
        { lastName: 'Berns', firstName: 'Jakin', Affiliation: 'Green Cover Seed' },
        { lastName: 'Rupert', firstName: 'Jonathan', Affiliation: 'Smith Seed Services' },
        { lastName: 'Lofton', firstName: 'Josh', Affiliation: 'Oklahoma State University' },
        { lastName: 'Gaskin', firstName: 'Julia', Affiliation: 'University of Georgia, retired' },
        { lastName: 'Balkcom', firstName: 'Kip', Affiliation: 'USDA ARS' },
        { lastName: 'Reiter', firstName: 'Mark', Affiliation: 'Virginia Tech' },
        { lastName: 'Lowder', firstName: 'Nathan', Affiliation: 'USDA NRCS' },
        { lastName: 'Basinger', firstName: 'Nicholas', Affiliation: 'Unversity of Georgia' },
        { lastName: 'Stout Evans', firstName: 'Rachel', Affiliation: 'USDA NRCS' },
        { lastName: 'Waring', firstName: 'Robert', Affiliation: 'Virginia farmer ' },
        { lastName: 'Seehaver', firstName: 'Sarah', Affiliation: 'North Carolina State University' },
        { lastName: 'Dempsey', firstName: 'Mark', Affiliation: 'Carolina Farm Stewardship Association' },
        { lastName: 'Singh Farmaha', firstName: 'Bhupinder', Affiliation: 'Clemson University' },
        { lastName: 'Fultz', firstName: 'Lisa', Affiliation: 'Louisiana State University AgCenter, USDA ARS' },
        { lastName: 'Gamble', firstName: 'Audrey', Affiliation: 'Auburn University' },
        { lastName: 'Hendrix', firstName: 'James', Affiliation: 'Louisiana State University AgCenter' },
        { lastName: 'Kelton', firstName: 'Jessica', Affiliation: 'Auburn University' },
        { lastName: 'McWhirt', firstName: 'Amanda', Affiliation: 'University of Arkansas' },
        { lastName: 'Panicker', firstName: 'Girish', Affiliation: 'Alcorn State University' },
        { lastName: 'Park', firstName: 'Dara', Affiliation: 'Clemson University' },
        { lastName: 'Prevost', firstName: 'Dan', Affiliation: 'Southern Ag, Inc.' },
        { lastName: 'Rajan', firstName: 'Nithya', Affiliation: 'Texas A&M University' },
        { lastName: 'Rudolph', firstName: 'Rachel', Affiliation: 'University of Kentucky' },
        { lastName: 'Thomas', firstName: 'Mark', Affiliation: 'Mountain View Seeds' },
        { lastName: 'Walker', firstName: 'Forbes', Affiliation: 'University of Tennessee' },
        { lastName: 'Ye', firstName: 'Rongzhong', Affiliation: 'Clemson University' },
        { lastName: 'Williams', firstName: 'Mary (Mimi)', Affiliation: 'USDA NRCS Plant Materials Center' },
        { lastName: 'Cole', firstName: 'Tracy', Affiliation: 'USDA NRCS' },
        { lastName: 'Proctor', firstName: 'Stuart', Affiliation: 'USDA NRCS' },
        { lastName: 'Scoggins', firstName: 'Keith', Affiliation: 'USDA NRCS' },
        { lastName: 'Green', firstName: 'Steven', Affiliation: 'Arkansas State University' },
        { lastName: 'Stone', firstName: 'Caleb', Affiliation: 'USDA NRCS' },
        { lastName: 'Vega', firstName: 'Rafael', Affiliation: 'USDA NRCS' },
        { lastName: 'Valencia', firstName: 'Elide', Affiliation: 'University of Puerto Rico' },
        { lastName: 'Leonard', firstName: 'Thomas', Affiliation: 'Gaia Herbs' },
        { lastName: 'Anoruo', firstName: 'Florence', Affiliation: 'South Carolina State University' },
        { lastName: 'Best', firstName: 'Terry', Affiliation: 'USDA NRCS' },
        { lastName: 'Sykes', firstName: 'Virginia', Affiliation: 'University of Tennessee' },
        { lastName: 'Rodriguez', firstName: 'Mario', Affiliation: 'USDA NRCS' },
        { lastName: 'Marrero', firstName: 'Edrick', Affiliation: 'USDA NRCS' },
        { lastName: 'Matos', firstName: 'Manuel', Affiliation: 'USDA NRCS' },
        { lastName: 'Vega', firstName: 'Jacqueline', Affiliation: 'USDA NRCS' },
      ];
    case 5:
      return (
        <>
          <Typography style={{ paddingTop: '15px' }} variant="body1" align="left">
            Data for the Western Cover Crop Council is soon to come!
          </Typography>
          <br />
          <a target="_blank" style={{ fontSize: '20px', display: 'flex', justifyContent: 'center' }} href="https://westerncovercrops.org/" rel="noreferrer">
            <b>Western Cover Crop Council Site </b>
          </a>
        </>
      );
    default:
      return [
        { lastName: 'Mirsky', firstName: 'Steven', Affiliation: 'USDA-ARS' },
        { lastName: 'Reberg-Horton', firstName: 'Chris', Affiliation: 'North Carolina State University' },
        { lastName: 'Bandooni', firstName: 'Rohit', Affiliation: 'North Carolina State University' },
        { lastName: 'Raturi', firstName: 'Ankita', Affiliation: 'Purdue University' },
        { lastName: 'Norton', firstName: 'Juliet', Affiliation: 'Purdue University' },
        { lastName: 'Morrow', firstName: 'Anna', Affiliation: 'Purdue University' },
        { lastName: 'Ackroyd', firstName: 'Victoria', Affiliation: 'University of Maryland' },
        { lastName: 'Darby', firstName: 'Heather', Affiliation: 'University of Vermont' },
        { lastName: 'Davis', firstName: 'Brian', Affiliation: 'North Carolina State University' },
        { lastName: 'Pinegar', firstName: 'Mikah', Affiliation: 'North Carolina State University' },
        { lastName: 'Hitchcock', firstName: 'Rick', Affiliation: 'University of Georga' },
        { lastName: 'Smith', firstName: 'Adam', Affiliation: 'North Carolina State University' },
        { lastName: 'Puckett', firstName: 'Trevor', Affiliation: 'North Carolina State University' },
        { lastName: 'Agamohammadnia', firstName: 'Milad', Affiliation: 'North Carolina State University' },
        { lastName: 'Xu', firstName: 'Jingtong', Affiliation: 'North Carolina State University' },
        { lastName: 'Adusumelli', firstName: 'Vyshnavi', Affiliation: 'North Carolina State University' },
        { lastName: 'Chittilapilly', firstName: 'Boscosylvester John', Affiliation: 'North Carolina State University' },
        { lastName: 'Chavan', firstName: 'Ameya', Affiliation: 'North Carolina State University' },
      ];
  }
};

const useWindowSize = () => { // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state while taking out the width of the horizontal scrollbar
      setWindowSize({
        width: window.innerWidth - (window.innerWidth - document.documentElement.clientWidth),
        height: document.documentElement.clientHeight,
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};
export default useWindowSize;
