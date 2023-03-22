/*
  Reducer determines the next state in Store.js
*/

// eslint-disable-next-line consistent-return
const Reducer = (state, action, value = action && action.data && action.data.value) => {
  const section = window.location.href.includes('species-selector') ? 'selector' : 'explorer';
  let sfilters = { ...state[section] };
  switch (action.type) {
    case 'UPDATE_SELECTED_REGION': {
      return {
        ...state,
        selectedRegion: action.data,
      };
    }
    case 'TOGGLE':
      return { ...state, [value]: !state[value] };
    case 'TRUE':
      return { ...state, [value]: true };
      // case 'FALSE':
      //   return { ...state, [value]: false };

    case 'FILTER_TOGGLE': {
      sfilters[value] = !sfilters[value];

      return {
        ...state,
        [section]: sfilters,
        changedFilters: true,
      };
    }

    case 'FILTER_ON': {
      sfilters[value] = true;
      return {
        ...state,
        [section]: sfilters,
        changedFilters: true,
      };
    }

    case 'FILTER_OFF': {
      sfilters[value] = false;
      return {
        ...state,
        [section]: sfilters,
        changedFilters: true,
      };
    }

    case 'CLEAR_FILTERS': {
      sfilters = {
        cropSearch: '',
        zone: sfilters.zone,
      };

      return {
        ...state,
        [section]: sfilters,
        changedFilters: true,
      };
    }

    case 'ZONE_TOGGLE': {
      return { ...state, zoneToggle: action.data.value };
    }

    case 'CROP_SEARCH': {
      sfilters.cropSearch = action.data.value;
      return {
        ...state,
        cropSearch: action.data.value,
        [section]: sfilters,
      };
    }

    case 'UPDATE_ACTIVE_CROP_DATA': {
      return {
        ...state,
        activeCropData: action.data.value,
        changedFilters: false,
      };
    }

    case 'LAST_ZIP_CODE': {
      return { ...state, lastZipCode: action.data.value };
    }

    case 'UPDATE_CONSENT': {
      if (action.data.consent === true) {
        return { ...state, consent: true };
      } if (action.data.consent === false) {
        return { ...state, consent: false };
      }
      break;
    }

    case 'UPDATE_PROGRESS': {
      if (action.data.type === 'INCREMENT') {
        return { ...state, progress: state.progress + 1 };
      } if (action.data.type === 'DECREMENT') {
        return { ...state, progress: state.progress - 1 };
      } if (action.data.type === 'HOME') {
        return { ...state, progress: 0 };
      }
      break;
    }

    case 'GOTO_PROGRESS': {
      return { ...state, progress: action.data.progress };
    }

    case 'UPDATE_LOCATION': {
      return {
        ...state,
        address: action.data.address,
        markers: [[action.data.latitude, action.data.longitude]],
        zipCode: action.data.zipCode,
      };
    }

    case 'UPDATE_STATE': {
      return {
        ...state,
        state: action.data.state,
        councilLabel: action.data.councilLabel,
        councilShorthand: action.data.councilShorthand,
        stateId: action.data.stateId,
      };
    }

    case 'UPDATE_REGIONS': {
      return {
        ...state,
        regions: action.data.regions,
      };
    }

    case 'UPDATE_REGION': {
      return {
        ...state,
        regionId: action.data.regionId,
        regionLabel: action.data.regionLabel,
        regionShorthand: action.data.regionShorthand,
      };
    }

    // case 'JUMP_SPECIES_PROGRESS': {
    //   return { ...state, progress: 5 };
    // }

    // case 'WEATHER_DATA_RESET': {
    //   return { ...state, weatherDataReset: action.data.weatherDataReset };
    // }

    // case 'CHANGE_ADDRESS_BY_TYPING': {
    //   if (action.data.markers) {
    //     return {
    //       ...state,
    //       address: action.data.address,
    //       showAddressChangeBtn: action.data.showAddressChangeBtn,
    //       markers: action.data.markers,
    //     };
    //   } else {
    //     return {
    //       ...state,
    //       address: action.data.address,
    //       showAddressChangeBtn: action.data.showAddressChangeBtn,
    //     };
    //   }
    // }

    case 'UPDATE_ZONE_TEXT': {
      sfilters.zone = action.data.zone;
      return {
        ...state,
        zoneText: action.data.zoneText,
        selectedGoals: [],
        [section]: sfilters,
      };
    }

    case 'UPDATE_ZONE': {
      // sfilters.zone = action.data.zone;
      return {
        ...state,
        zoneText: action.data.zoneText,
        zone: action.data.zone,
        // [section]: sfilters,
      };
    }

    // case 'UPDATE_LAST_ZONE': {
    //   return {
    //     ...state,
    //     lastZone: action.data.value,
    //   };
    // }

    case 'CHANGE_ADDRESS': {
      return {
        ...state,
        address: action.data.address,
        addressVerified: action.data.addressVerified,
      };
    }

    case 'CHANGE_ADDRESS_VIA_MAP': {
      return {
        ...state,
        address: action.data.address,
        fullAddress: action.data.fullAddress,
        zipCode: action.data.zipCode,
        addressVerified: action.data.addressVerified,
        addressChangedViaMap: true,
      };
    }

    case 'RESET': {
      return {
        ...state,
        progress: 0,
        address: '',
        markers: action.data.markers,
        addressVerified: false,
        markersCopy: [],
        zipCode: 0,
        addressSearchPreference: 'address',
        selectedCrops: action.data.selectedCrops,
        selectedGoals: [],
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
        cashCropData: {
          name: '',
          dateRange: {
            startDate: '',
            endDate: '',
          },
        },
      };
    }

    case 'UPDATE_MARKER': {
      return {
        ...state,
        markers: action.data.markers,
      };
    }

    // case 'UPDATE_MARKER_COPY': {
    //   return {
    //     ...state,
    //     markersCopy: action.data.markersCopy,
    //   };
    // }

    // case 'UPDATE_ADDRESS_ON_MAP_CLICK': {
    //   return {
    //     ...state,
    //     address: action.data.address,
    //     addressVerified: action.data.addressVerified,
    //     snackOpen: action.data.snackOpen,
    //     snackMessage: action.data.snackMessage,
    //   };
    // }

    // case 'TOGGLE_ADDRESS_CHANGE_BUTTON': {
    //   return {
    //     ...state,
    //     showAddressChangeBtn: action.data.showAddressChangeBtn,
    //   };
    // }

    case 'ADD_GOALS': {
      return {
        ...state,
        allGoals: action.data,
      };
    }

    case 'SNACK': {
      return {
        ...state,
        snackOpen: action.data.snackOpen,
        snackMessage: action.data.snackMessage,
      };
    }

    case 'UPDATE_SELECTED_GOALS': {
      return {
        ...state,
        selectedGoals: action.data,
      };
    }

    case 'ADD_SELECTED_GOALS': {
      return {
        ...state,
        selectedGoals: [...state.selectedGoals, action.data],
      };
    }

    case 'DRAG_GOALS': {
      return {
        ...state,
        selectedGoals: action.data.selectedGoals,
        snackOpen: action.data.snackOpen,
        snackMessage: action.data.snackMessage,
      };
    }

    case 'PULL_CROP_DATA': {
      return {
        ...state,
        cropData: action.data,
        activeCropData: action.data,
      };
    }

    case 'SELECTED_CROPS_MODIFIER': {
      return {
        ...state,
        selectedCrops: action.data.selectedCrops,
        snackOpen: action.data.snackOpen,
        snackMessage: action.data.snackMessage,
      };
    }

    case 'ACTIVATE_MY_COVER_CROP_LIST_TILE': {
      return {
        ...state,
        myCoverCropActivationFlag: action.data.myCoverCropActivationFlag,
        speciesSelectorActivationFlag: action.data.speciesSelectorActivationFlag,
      };
    }

    case 'ACTIVATE_SPECIES_SELECTOR_TILE': {
      return {
        ...state,
        myCoverCropActivationFlag: action.data.myCoverCropActivationFlag,
        speciesSelectorActivationFlag: action.data.speciesSelectorActivationFlag,
      };
    }

    case 'UPDATE_WEATHER_CONDITIONS': {
      return {
        ...state,
        weatherData: action.data.weatherData,
      };
    }

    case 'UPDATE_FROST_FREE_DAYS': {
      return {
        ...state,
        weatherData: {
          ...state.weatherData,
          frostFreeDays: action.data.frostFreeDays,
        },
      };
    }

    case 'UPDATE_AVERAGE_FROST_DATES': {
      return {
        ...state,
        weatherData: {
          ...state.weatherData,
          averageFrost: action.data.averageFrost,
        },
      };
    }

    case 'UPDATE_AVERAGE_PRECIP_CURRENT_MONTH': {
      return {
        ...state,
        weatherData: {
          ...state.weatherData,
          averagePrecipitation: {
            ...state.weatherData.averagePrecipitation,
            thisMonth: action.data.thisMonth,
          },
        },
      };
    }

    case 'UPDATE_AVERAGE_PRECIP_ANNUAL': {
      return {
        ...state,
        weatherData: {
          ...state.weatherData,
          averagePrecipitation: {
            ...state.weatherData.averagePrecipitation,
            annual: action.data.annual,
          },
        },
      };
    }

    case 'SET_AJAX_IN_PROGRESS': {
      return {
        ...state,
        ajaxInProgress: action.data,
      };
    }

    // case 'TOGGLE_CROP_DETAIL_MODAL': {
    //   return {
    //     ...state,
    //     cropDetailModal: action.data.cropDetailModal,
    //   };
    // }

    case 'TOGGLE_SOIL_LOADER': {
      return {
        ...state,
        isSoilDataLoading: action.data.isSoilDataLoading,
      };
    }

    // case 'UPDATE_SELCTED_CHECKBOXES': {
    //   return {
    //     ...state,
    //     selectedCheckboxes: action.data.selectedCheckboxes,
    //   };
    // }

    // case 'UPDATE_SELECTED_STARS': {
    //   return {
    //     ...state,
    //     selectedStars: action.data.selectedStars,
    //   };
    // }

    case 'UPDATE_SOIL_DATA': {
      return {
        ...state,
        soilData: {
          ...state.soilData,
          Map_Unit_Name: action.data.Map_Unit_Name,
          Drainage_Class: action.data.Drainage_Class,
          Flooding_Frequency: action.data.Flooding_Frequency,
          Ponding_Frequency: action.data.Ponding_Frequency,
          for: action.data.for,
        },
      };
    }

    case 'UPDATE_SOIL_DATA_ORIGINAL': {
      return {
        ...state,
        soilDataOriginal: {
          ...state.soilDataOriginal,
          Map_Unit_Name: action.data.Map_Unit_Name,
          Drainage_Class: action.data.Drainage_Class,
          Flooding_Frequency: action.data.Flooding_Frequency,
          Ponding_Frequency: action.data.Ponding_Frequency,
          for: action.data.for,
        },
      };
    }

    case 'UPDATE_DATE_RANGE': {
      return {
        ...state,
        cashCropData: {
          ...state.cashCropData,
          dateRange: {
            startDate: action.data.startDate,
            endDate: action.data.endDate,
          },
        },
      };
    }

    // case 'UPDATE_ADDRESS_SEARCH_PREFERENCE': {
    //   return {
    //     ...state,
    //     addressSearchPreference: action.data.addressSearchPreference,
    //   };
    // }

    case 'UPDATE_ZIP_CODE': {
      return {
        ...state,
        zipCode: action.data.zipCode,
      };
    }

    // case 'UPDATE_ACTIVE_GROWTH_PERIOD': {
    //   return {
    //     ...state,
    //     activeGrowthPeriod: action.data.activeGrowthPeriod,
    //   };
    // }

    case 'UPDATE_DRAINAGE_CLASS': {
      return {
        ...state,
        soilData: {
          ...state.soilData,
          Drainage_Class: action.data,
        },
      };
    }

    case 'UPDATE_FLOODING_FREQUENCY': {
      return {
        ...state,
        soilData: {
          ...state.soilData,
          Flooding_Frequency: action.data,
        },
      };
    }

    case 'UPDATE_COMPARISON_KEYS': {
      return {
        ...state,
        comparisonKeys: action.data.comparisonKeys,
      };
    }

    default:
      return state;
  }
};

export default Reducer;
