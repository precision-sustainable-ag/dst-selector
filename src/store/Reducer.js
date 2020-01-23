const Reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_PROGRESS": {
      if (action.data.type === "INCREMENT") {
        return { ...state, progress: state.progress + 1 };
      } else if (action.data.type === "DECREMENT") {
        return { ...state, progress: state.progress - 1 };
      } else {
      }
    }
    case "CHANGE_ADDRESS_BY_TYPING": {
      if (action.data.markers) {
        return {
          ...state,
          address: action.data.address,
          showAddressChangeBtn: action.data.showAddressChangeBtn,
          markers: action.data.markers
        };
      } else {
        return {
          ...state,
          address: action.data.address,
          showAddressChangeBtn: action.data.showAddressChangeBtn
        };
      }
    }
    case "UPDATE_ZONE_TEXT": {
      return {
        ...state,
        zoneText: action.data.zoneText,
        zone: action.data.zone
      };
    }
    case "CHANGE_ADDRESS": {
      return {
        ...state,
        address: action.data.address,
        addressVerified: action.data.addressVerified
      };
    }
    case "UPDATE_MARKER": {
      return {
        ...state,
        markers: action.data.markers
      };
    }
    case "UPDATE_ADDRESS_ON_MAP_CLICK": {
      return {
        ...state,
        address: action.data.address,
        addressVerified: action.data.addressVerified,
        snackOpen: action.data.snackOpen,
        snackMessage: action.data.snackMessage
      };
    }
    case "TOGGLE_ADDRESS_CHANGE_BUTTON": {
      return {
        ...state,
        showAddressChangeBtn: action.data.showAddressChangeBtn
      };
    }
    case "ADD_GOALS": {
      return {
        ...state,
        allGoals: action.data
      };
    }

    case "SNACK": {
      return {
        ...state,
        snackOpen: action.data.snackOpen,
        snackMessage: action.data.snackMessage
      };
    }

    case "UPDATE_SELECTED_GOALS": {
      return {
        ...state,
        selectedGoals: action.data
      };
    }
    case "ADD_SELECTED_GOALS": {
      return {
        ...state,
        selectedGoals: [...state.selectedGoals, action.data]
      };
    }

    case "DRAG_GOALS": {
      return {
        ...state,
        selectedGoals: action.data.selectedGoals,
        snackOpen: action.data.snackOpen,
        snackMessage: action.data.snackMessage
      };
    }

    case "PULL_CROP_DATA": {
      return {
        ...state,
        cropData: action.data
      };
    }

    case "SELECTED_CROPS_MODIFIER": {
      return {
        ...state,
        selectedCrops: action.data.selectedCrops,
        snackOpen: action.data.snackOpen,
        snackMessage: action.data.snackMessage
      };
    }

    default:
      return state;
  }
};

export default Reducer;
