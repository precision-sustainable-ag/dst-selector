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

// import moment from 'moment-timezone';
import React, { createContext, useReducer, useMemo } from 'react';
import Reducer from './Reducer';

export const cropDataFormatter = (cropData = [{}]) => {
  const excludedCropZoneDecisionKeys = ['Exclude', 'Up and Coming', 'Discuss'];
  // Filter unwanted rows
  return cropData.filter((crop) => {
    if (
      excludedCropZoneDecisionKeys.includes(crop['Zone Decision'])
      || crop['Cover Crop Name'] === '__Open Discussion Row'
    ) {
      return false;
    } return true;
  });

  // const monthStringBuilder = (vals) => {
  //   const params = [
  //     'Reliable Establishment',
  //     'Freeze/Moisture Risk to Establishment',
  //     'Frost Seeding',
  //     'Fall/Winter Seeding Rate',
  //     'Spring Seeding Rate',
  //     'Summer Seeding Rate',
  //     'Can Interseed',
  //     'Average Frost',
  //   ];
  //   const val = vals;
  //   params.forEach((param) => {
  //     if (val.fields.data['Planting and Growth Windows'][`${param}`]) {
  //       val.fields.data['Planting and Growth Windows'][`${param}`].values.forEach((dateArray) => {
  //         const datesArr = dateArray.split('-');
  //         // const valStart = moment(datesArr[0], 'YYYY-MM-DD');
  //         const valStart = moment(datesArr[0], 'MM/DD/YYYY');
  //         const valEnd = moment(datesArr[1], 'MM/DD/YYYY');
  //         let str = '';
  //         const valuesArray = [];

  //         if (param === 'Average Frost') {
  //           valEnd.add('1', 'years');
  //         }

  //         while (valStart.isSameOrBefore(valEnd)) {
  //           if (valStart.get('D') <= 15) {
  //             str = 'Early';
  //           } else {
  //             str = 'Mid';
  //           }
  //           if (!valuesArray.includes([`${valStart.format('MMMM')}, ${str}`])) {
  //             valuesArray.push([`${valStart.format('MMMM')}, ${str}`]);
  //           }
  //           valStart.add('1', 'days');
  //         }
  //         valuesArray.forEach((key) => {
  //           const prev = val.fields[key] || [];
  //           prev.push(param);
  //           val.fields[key] = prev;
  //         });
  //       });
  //     }
  //   });
  //   // params.forEach((param) => {
  //   //   if (val.fields[`${param} Start`]) {
  //   //     const valStart = moment(val.fields[`${param} Start`], 'YYYY-MM-DD');
  //   //     const valEnd = val.fields[`${param} End`]
  //   //       ? moment(val.fields[`${param} End`], 'YYYY-MM-DD')
  //   //       : moment(val.fields[`${param} Stop`], 'YYYY-MM-DD');
  //   //     let str = '';
  //   //     const valuesArray = [];

  //   //     while (valStart.isSameOrBefore(valEnd)) {
  //   //       if (valStart.get('D') <= 15) {
  //   //         str = 'Early';
  //   //       } else {
  //   //         str = 'Mid';
  //   //       }
  //   //       valuesArray.push([`${valStart.format('MMMM')}, ${str}`]);
  //   //       valStart.add('14', 'days');
  //   //     }
  //   //     valuesArray.forEach((key) => {
  //   //       const prev = val.fields[key] || [];
  //   //       prev.push(param);
  //   //       val.fields[key] = prev;
  //   //     });
  //   //   }
  //   // });

  //   // this is temporary, needs to be replaced with wither a fix to calendar growth window component or exporting of json from airtable
  //   Object.keys(val.fields).forEach((item) => {
  //     if (item.endsWith('Early') || item.endsWith('Mid')) {
  //       const uniq = [...new Set(val.fields[item])];
  //       const removedOldVals = uniq.filter((u) => !u.endsWith('growth'));
  //       val.fields[item] = removedOldVals;
  //     }
  //   });
  //   return val;
  // };

  // return tjson.map((crop) => {
  //   // remove open discussion row and zone decision !== include

  //   let val = { fields: crop };
  //   val = monthStringBuilder(val);

  //   val.fields.inBasket = false;

  //   if (!val.fields['Nitrogen Fixation']) {
  //     val.fields['Nitrogen Fixation'] = 0;
  //   }

  //   if (!val.fields['Early Spring Growth']) {
  //     val.fields['Early Spring Growth'] = 0;
  //   }

  //   val.fields['Discourages Nematodes'] = val.fields['Disoucrages Nematodes'];
  //   // TODO: do we want the __id value to be apart of the object maybe as altId we need the ID from the API to be unaltered
  //   // val.fields.id = val.fields.__id;
  //   val.fields.Drought = val.fields['Drought Tolerance'];
  //   val.fields.Flood = val.fields['Flood Tolerance'];
  //   val.fields.Heat = val.fields['Heat Tolerance'];
  //   val.fields['Low Fertility'] = val.fields['Low Fertility Tolerance'];
  //   val.fields.Salinity = val.fields['Salinity Tolerance'];
  //   val.fields.Shade = val.fields['Shade Tolerance'];
  //   val.fields['Tillage at Vegetative'] = val.fields['Tillage Termination at Vegetative'];
  //   val.fields['Tillage at Flowering'] = val.fields['Tillage Termination at Flowering'];

  //   val.fields['Freezing at Flowering'] = val.fields['Freezing Termination at Flowering'];

  //   val.fields['Freezing at Vegetative'] = val.fields['Freezing Termination at Vegetative'];
  //   val.fields['Chemical at Vegetative'] = val.fields['Chemical Termination at Vegetative'];
  //   val.fields['Chemical at Flowering'] = val.fields['Chemical Termination at Flowering'];

  //   val.fields['Mow at Flowering'] = val.fields['Mow Termination at Flowering'];
  //   val.fields['Roller Crimp at Flowering'] = val.fields['Roller Crimp Termination at Flowering'];

  //   if (!val.fields['Frost Seeding']) {
  //     val.fields['Frost Seeding'] = false;
  //   } else {
  //     val.fields['Frost Seeding'] = true;
  //   }
  //   if (!val.fields['Can Aerial Seed']) {
  //     val.fields['Aerial Seeding'] = false;
  //   } else {
  //     val.fields['Aerial Seeding'] = true;
  //   }

  //   // TODO: not using anymore
  //   if (!val.fields['Pollinator Habitat']) {
  //     val.fields['Pollinator Habitat'] = 0;
  //   }

  //   if (!val.fields['Pollinator Food']) {
  //     val.fields['Pollinator Food'] = 0;
  //   }

  //   return val;
  // });
};

const initialState = {
  selectedRegion: {},
  consent: false,
  progress: 0,
  address: '',
  addressSearchPreference: 'address',
  addressChangedViaMap: false,
  fullAddress: '',
  zipCode: 0,
  lastZipCode: 0,
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
  addressVerified: false,
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
    Map_Unit_Name: '',
    Drainage_Class: [],
    Flooding_Frequency: [],
    Ponding_Frequency: '',
  },
  soilDataOriginal: {
    Map_Unit_Name: '',
    Drainage_Class: [],
    Flooding_Frequency: [],
    Ponding_Frequency: '',
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
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const Context = createContext(initialState);

export default Store;
