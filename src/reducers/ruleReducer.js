import {
  SET_RULE_DETAIL,
  SET_TRIGGER_DETAIL,
  SET_USER_DETAIL,
  REMOVE_DETAILS,
} from "../actions/types";

const initialState = {
  user: "",
  creation: {},
  trigger: {},
  action: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_RULE_DETAIL:
      return {
        ...state,
        creation: action.payload,
      };
    case SET_TRIGGER_DETAIL:
      return {
        ...state,
        trigger: action.payload,
      };
    case SET_USER_DETAIL:
      return {
        ...state,
        user: action.payload,
      };
    case REMOVE_DETAILS:
      return {
        ...state,
        user: "",
        creation: {},
        trigger: {},
        action: {},
      };
    default:
      return state;
  }
}
