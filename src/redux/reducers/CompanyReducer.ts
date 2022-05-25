import { Action } from '../../models/redux/Action';
import { COMPANY_FETCH_FAIL, COMPANY_FETCH_STARTED, COMPANY_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  companies: null,
  isFetchingCompanies: false,
  fetchErrorMessage: ''
};

export default (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case COMPANY_FETCH_STARTED:
      return { ...state, isFetchingCompanies: true };
    case COMPANY_FETCH_SUCCESS:
      return {
        ...state,
        companies: action.payload,
        isFetchingCompanies: false
      };
    case COMPANY_FETCH_FAIL:
      return {
        ...state,
        isFetchingCompanies: false,
        fetchErrorMessage: action.payload
      };
    default:
      return state;
  }
};
