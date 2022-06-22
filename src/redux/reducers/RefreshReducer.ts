import { REFRESH_COMPANY, REFRESH_PROJECT, REFRESH_TASK } from "../actions/types";

const INITIAL_STATE = {
  refreshCompany: false,
  refreshTask: false,
  refreshProject: false,
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case REFRESH_COMPANY:
      return { ...state, refreshCompany: action.payload };
    case REFRESH_TASK:
      return { ...state, refreshTask: action.payload };
    case REFRESH_PROJECT:
      return { ...state, refreshProject: action.payload };
    default:
      return state;
  }
};
