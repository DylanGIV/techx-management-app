import { REFRESH_SWITCH } from "../actions/types";

const INITIAL_STATE = {
  refresh: false
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case REFRESH_SWITCH:
      return { ...state, refresh: action.payload };
    default:
      return state;
  }
};
