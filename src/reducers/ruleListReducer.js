import {
    REMOVE_DETAILS,
    SAVE_DETAILS,
  } from "../actions/types";
  
  const initialState = {
    ruleDetails: []
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case REMOVE_DETAILS:
        return {
          ...state,
          ruleDetails: []
        };
      case SAVE_DETAILS:
        return {
          ...state,
          ruleDetails: action.ruleDetails,         
        };
      default:
        return state;
    }
  }
  