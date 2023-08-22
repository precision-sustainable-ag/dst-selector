/* eslint-disable no-underscore-dangle */
/*
  Store is the first component to run, it sets all the global state variables and is used in almost all other components
    it sets the state using the Reducer and the initial state

  monthStringBuilder parses all the data to find entries which end with "start" or "end"
    it then determines if the day is before or after the 15th of that month
    if it is before the 15th it gets a value of early, if after a value of mid
    this is used in the calendar view

  loremText is used to fill crops descriptions with dummy text if they do not have a description
    if lorem text is in a crop then airtable does not have a description for that crop
*/

import moment from 'moment-timezone';
import React, { createContext, useReducer, useMemo } from 'react';
import Reducer from './Reducer';
import arrayEquals from '../shared/functions';

export const cropDataFormatter = (cropData = [{}]) => {
  const excludedCropZoneDecisionKeys = ['Exclude', 'Up and Coming', 'Discuss'];
  // Filter unwanted rows
  const tjson = cropData.filter((crop) => {
    if (
      excludedCropZoneDecisionKeys.includes(crop['Zone Decision'])
      || crop['Cover Crop Name'] === '__Open Discussion Row'
    ) {
      return false;
    } return true;
  });

  const formatHalfMonthData = (halfMonthData = []) => {
    const result = [];
    let index = 0;
    while (index < halfMonthData.length) {
      const timePeriod = {
        startTime: '',
        endTime: '',
        months: [],
        info: [],
      };
      if (timePeriod.months.length === 0) {
        if (halfMonthData[index].start !== '') {
          timePeriod.startTime = halfMonthData[index].start;
          timePeriod.endTime = halfMonthData[index].end;
          timePeriod.info = [...halfMonthData[index].info];
        }
        timePeriod.months.push(halfMonthData[index].month);
        index += 1;
      }
      while (
        index > 0
        && index < halfMonthData.length
        && arrayEquals(halfMonthData[index].info, halfMonthData[index - 1].info)
      ) {
        timePeriod.months.push(halfMonthData[index].month);
        index += 1;
      }
      if (timePeriod.months.length > 0) result.push(timePeriod);
      else index += 1;
    }
    return result;
  };

  const formatTimeToHalfMonthData = (startTime = '', endTime = '', param = '', halfMonthData = []) => {
    const startIndex = moment(startTime).month() * 2 + (moment(startTime).date() >= 15 ? 1 : 0);
    const endIndex = moment(endTime).month() * 2 + (moment(endTime).date() >= 15 ? 1 : 0);
    halfMonthData = halfMonthData.map((data, index) => {
      if (index >= startIndex && index <= endIndex) {
        const info = [...data.info, param];
        let start = '';
        let end = '';
        if (data.start === '') start = startTime;
        else start = moment(data.start).isSameOrBefore(startTime) ? startTime : data.start;
        if (data.end === '') end = endTime;
        else end = moment(data.end).isSameOrBefore(endTime) ? data.end : endTime;
        return {
          ...data, start, end, info,
        };
      }
      return data;
    });
    return halfMonthData;
  };

  const monthStringBuilder = (vals) => {
    const params = [
      'Reliable Establishment',
      'Freeze/Moisture Risk to Establishment',
      'Frost Seeding',
      'Fall/Winter Seeding Rate',
      'Spring Seeding Rate',
      'Summer Seeding Rate',
      'Can Interseed',
      'Average Frost',
    ];
    const val = vals;
    let halfMonthArr = Array.from({ length: 24 }, (_, i) => ({
      month: moment().month(Math.floor(i / 2)).format('M'),
      info: [],
      start: '',
      end: '',
    }));

    params.forEach((param) => {
      if (val.data['Planting and Growth Windows']?.[`${param}`]) {
        val.data['Planting and Growth Windows']?.[`${param}`].values.forEach((dateArray) => {
          const datesArr = dateArray.split('-');
          // const valStart = moment(datesArr[0], 'YYYY-MM-DD');
          const valStart = moment(datesArr[0], 'MM/DD/YYYY').format('MM/DD');
          const valEnd = moment(datesArr[1], 'MM/DD/YYYY').format('MM/DD');

          if (moment(valStart).isSameOrAfter(valEnd)) {
            const tempStart = '01/01';
            const tempEnd = '12/31';
            halfMonthArr = formatTimeToHalfMonthData(valStart, tempEnd, param, halfMonthArr);
            halfMonthArr = formatTimeToHalfMonthData(tempStart, valEnd, param, halfMonthArr);
          } else {
            halfMonthArr = formatTimeToHalfMonthData(valStart, valEnd, param, halfMonthArr);
          }
        });
      }
    });
    const halfMonthData = formatHalfMonthData(halfMonthArr);
    val['Half Month Data'] = halfMonthData;

    // this is temporary, needs to be replaced with wither a fix to calendar growth window component or exporting of json from airtable
    Object.keys(val).forEach((item) => {
      if (item.endsWith('Early') || item.endsWith('Mid')) {
        const uniq = [...new Set(val[item])];
        const removedOldVals = uniq.filter((u) => !u.endsWith('growth'));
        val[item] = removedOldVals;
      }
    });
    return val;
  };

  return tjson.map((crop) => {
    // remove open discussion row and zone decision !== include

    // let val = { fields: crop };
    const val = monthStringBuilder(crop);

    val.inBasket = false;

    // if (!val['Nitrogen Fixation']) {
    //   val['Nitrogen Fixation'] = 0;
    // }

    // if (!val['Early Spring Growth']) {
    //   val['Early Spring Growth'] = 0;
    // }

    // val['Discourages Nematodes'] = val['Disoucrages Nematodes'];
    // // TODO: do we want the __id value to be apart of the object maybe as altId we need the ID from the API to be unaltered
    // // val.id = val.__id;
    // val.Drought = val['Drought Tolerance'];
    // val.Flood = val['Flood Tolerance'];
    // val.Heat = val['Heat Tolerance'];
    // val['Low Fertility'] = val['Low Fertility Tolerance'];
    // val.Salinity = val['Salinity Tolerance'];
    // val.Shade = val['Shade Tolerance'];
    // val['Tillage at Vegetative'] = val['Tillage Termination at Vegetative'];
    // val['Tillage at Flowering'] = val['Tillage Termination at Flowering'];

    // val['Freezing at Flowering'] = val['Freezing Termination at Flowering'];

    // val['Freezing at Vegetative'] = val['Freezing Termination at Vegetative'];
    // val['Chemical at Vegetative'] = val['Chemical Termination at Vegetative'];
    // val['Chemical at Flowering'] = val['Chemical Termination at Flowering'];

    // val['Mow at Flowering'] = val['Mow Termination at Flowering'];
    // val['Roller Crimp at Flowering'] = val['Roller Crimp Termination at Flowering'];

    // if (!val['Frost Seeding']) {
    //   val['Frost Seeding'] = false;
    // } else {
    //   val['Frost Seeding'] = true;
    // }
    // if (!val['Can Aerial Seed']) {
    //   val['Aerial Seeding'] = false;
    // } else {
    //   val['Aerial Seeding'] = true;
    // }

    // // TODO: not using anymore
    // if (!val['Pollinator Habitat']) {
    //   val['Pollinator Habitat'] = 0;
    // }

    // if (!val['Pollinator Food']) {
    //   val['Pollinator Food'] = 0;
    // }

    return val;
  });
};

const apiBaseURL = /(localhost|dev)/i.test(window.location)
  ? 'developapi'
  : 'api';

const initialState = {
  selectedRegion: {},
  consent: false,
  progress: 0,
  address: '',
  addressSearchPreference: 'address',
  markersCopy: [],
  markers: [[40.78489145, -74.80733626930342]],
  showAddressChangeBtn: false,
  selectedCheckboxes: [],
  selectedStars: {},
  allGoals: [],
  cropData: [],
  modalData: [],
  selectedCrops: [],
  selectedGoals: [],
  zoom: 13,
  snackOpen: false,
  snackVertical: 'bottom',
  snackHorizontal: 'right',
  snackMessage: '',
  modalOpen: false,
  modalSize: 'lg', // sm,md,lg,fluid
  modalBody: {},
  addToCartBtnText: 'add to list',
  zoneToggle: true, // Explorer: true if PLANT HARDINESS ZONE is expanded
  soilData: {
    mapUnitName: '',
    drainageClass: [],
    floodingFrequency: [],
    pondingFrequency: '',
  },
  soilDataOriginal: {
    mapUnitName: '',
    drainageClass: [],
    floodingFrequency: [],
    pondingFrequency: '',
  },

  weatherData: {
    averageFrost: {
      firstFrostDate: {
        month: 'October',
        day: 21,
      },
      lastFrostDate: {
        month: 'April',
        day: 20,
      },
    },
    averagePrecipitation: {
      thisMonth: 3.6, // inches
      annual: 43, // inches
    },
    frostFreeDays: 173,
  },
  myCoverCropActivationFlag: false,
  speciesSelectorActivationFlag: true,
  ajaxInProgress: false,
  cropDetailModal: false,
  greenbarExpanded: false,
  isSoilDataLoading: false,
  cashCropData: {
    name: '',
    dateRange: {
      startDate: '',
      endDate: '',
    },
  },
  zone7CropData: [],
  zone6CropData: [],
  zone5CropData: [],
  zone4CropData: [],
  zone7Dictionary: [],
  zone6Dictionary: [],
  zone5Dictionary: [],
  zone4Dictionary: [],
  weatherDataReset: false,

  activeGrowthPeriod: [],
  comparisonKeys: [],
  regions: [],
  activeCropData: [],
  lastZone: '',

  goalsOpen: true,
  cropFiltersOpen: true,

  explorer: {
    // filters for explorer
    cropSearch: '',
    zone: 6, // needs a default so the filters will populate when starting with species-selector
  },

  selector: {
    // filters for selector
    cropSearch: '',
  },
  state: '',
  councilLabel: '',
  councilShorthand: '',
  stateId: '',
  apiBaseURL,
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const Context = createContext(initialState);

export default Store;
