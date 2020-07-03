const Reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_PROGRESS": {
      if (action.data.type === "INCREMENT") {
        return { ...state, progress: state.progress + 1 };
      } else if (action.data.type === "DECREMENT") {
        return { ...state, progress: state.progress - 1 };
      } else {
        break;
      }
    }
    case "WEATHER_DATA_RESET": {
      return { ...state, weatherDataReset: action.data.weatherDataReset };
    }
    case "CHANGE_ADDRESS_BY_TYPING": {
      if (action.data.markers) {
        return {
          ...state,
          address: action.data.address,
          showAddressChangeBtn: action.data.showAddressChangeBtn,
          markers: action.data.markers,
        };
      } else {
        return {
          ...state,
          address: action.data.address,
          showAddressChangeBtn: action.data.showAddressChangeBtn,
        };
      }
    }
    case "UPDATE_ZONE_TEXT": {
      return {
        ...state,
        zoneText: action.data.zoneText,
        zone: action.data.zone,
        selectedGoals: [],
      };
    }
    case "CHANGE_ADDRESS": {
      return {
        ...state,
        address: action.data.address,
        addressVerified: action.data.addressVerified,
      };
    }
    case "UPDATE_MARKER": {
      return {
        ...state,
        markers: action.data.markers,
      };
    }
    case "UPDATE_MARKER_COPY": {
      return {
        ...state,
        markersCopy: action.data.markersCopy,
      };
    }
    case "UPDATE_ADDRESS_ON_MAP_CLICK": {
      return {
        ...state,
        address: action.data.address,
        addressVerified: action.data.addressVerified,
        snackOpen: action.data.snackOpen,
        snackMessage: action.data.snackMessage,
      };
    }
    case "TOGGLE_ADDRESS_CHANGE_BUTTON": {
      return {
        ...state,
        showAddressChangeBtn: action.data.showAddressChangeBtn,
      };
    }
    case "ADD_GOALS": {
      return {
        ...state,
        allGoals: action.data,
      };
    }

    case "SNACK": {
      return {
        ...state,
        snackOpen: action.data.snackOpen,
        snackMessage: action.data.snackMessage,
      };
    }

    case "UPDATE_SELECTED_GOALS": {
      return {
        ...state,
        selectedGoals: action.data,
      };
    }
    case "ADD_SELECTED_GOALS": {
      return {
        ...state,
        selectedGoals: [...state.selectedGoals, action.data],
      };
    }

    case "DRAG_GOALS": {
      return {
        ...state,
        selectedGoals: action.data.selectedGoals,
        snackOpen: action.data.snackOpen,
        snackMessage: action.data.snackMessage,
      };
    }

    case "PULL_CROP_DATA": {
      return {
        ...state,
        cropData: action.data,
      };
    }

    case "SELECTED_CROPS_MODIFIER": {
      return {
        ...state,
        selectedCrops: action.data.selectedCrops,
        snackOpen: action.data.snackOpen,
        snackMessage: action.data.snackMessage,
      };
    }

    case "ACTIVATE_MY_COVER_CROP_LIST_TILE": {
      return {
        ...state,
        myCoverCropActivationFlag: action.data.myCoverCropActivationFlag,
        speciesSelectorActivationFlag:
          action.data.speciesSelectorActivationFlag,
      };
    }

    case "ACTIVATE_SPECIES_SELECTOR_TILE": {
      return {
        ...state,
        myCoverCropActivationFlag: action.data.myCoverCropActivationFlag,
        speciesSelectorActivationFlag:
          action.data.speciesSelectorActivationFlag,
      };
    }

    case "UPDATE_WEATHER_CONDITIONS": {
      return {
        ...state,
        weatherData: action.data.weatherData,
      };
    }

    case "UPDATE_FROST_FREE_DAYS": {
      return {
        ...state,
        weatherData: {
          ...state.weatherData,
          frostFreeDays: action.data.frostFreeDays,
        },
      };
    }

    case "UPDATE_AVERAGE_FROST_DATES": {
      return {
        ...state,
        weatherData: {
          ...state.weatherData,
          averageFrost: action.data.averageFrost,
        },
      };
    }

    case "UPDATE_AVERAGE_PRECIP_CURRENT_MONTH": {
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

    case "UPDATE_AVERAGE_PRECIP_ANNUAL": {
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

    case "SET_AJAX_IN_PROGRESS": {
      return {
        ...state,
        ajaxInProgress: action.data,
      };
    }
    case "TOGGLE_CROP_DETAIL_MODAL": {
      return {
        ...state,
        cropDetailModal: action.data.cropDetailModal,
      };
    }

    case "TOGGLE_SOIL_LOADER": {
      return {
        ...state,
        isSoilDataLoading: action.data.isSoilDataLoading,
      };
    }
    case "UPDATE_SELCTED_CHECKBOXES": {
      return {
        ...state,
        selectedCheckboxes: action.data.selectedCheckboxes,
      };
    }

    case "UPDATE_SELECTED_STARS": {
      return {
        ...state,
        selectedStars: action.data.selectedStars,
      };
    }

    case "UPDATE_SOIL_DATA": {
      return {
        ...state,
        soilData: {
          ...state.soilData,
          Map_Unit_Name: action.data.Map_Unit_Name,
          Drainage_Class: action.data.Drainage_Class,
          Flooding_Frequency: action.data.Flooding_Frequency,
          Ponding_Frequency: action.data.Ponding_Frequency,
        },
      };
    }

    case "UPDATE_DATE_RANGE": {
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

    case "UPDATE_ADDRESS_SEARCH_PREFERENCE": {
      return {
        ...state,
        addressSearchPreference: action.data.addressSearchPreference,
      };
    }

    case "UPDATE_ZIP_CODE": {
      return {
        ...state,
        zip: action.data.zip,
      };
    }

    case "UPDATE_FILTER_STRING": {
      return {
        ...state,
        filterString: action.data.filterString,
      };
    }

    default:
      return state;
  }
};

export default Reducer;
