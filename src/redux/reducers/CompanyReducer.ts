import { Action } from '../../models/redux/Action';
import { COMPANY_CREATE_FAIL, COMPANY_CREATE_STARTED, COMPANY_CREATE_SUCCESS, COMPANY_DELETE_COMPANY_FAILED, COMPANY_DELETE_COMPANY_STARTED, COMPANY_DELETE_COMPANY_SUCCESS, COMPANY_FETCH_FAIL, COMPANY_FETCH_STARTED, COMPANY_FETCH_SUCCESS, COMPANY_SET_COMPANY } from '../actions/types';

const INITIAL_STATE = {
  companies: null,
  isFetchingCompanies: false,
  isCreatingCompany: false,
  createCompanySuccess: false,
  createErrorMessage: '',
  fetchErrorMessage: '',
  currentCompany: null,
  isDeletingCompany: false,
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case COMPANY_FETCH_STARTED:
      return { ...state, isFetchingCompanies: true };
    case COMPANY_FETCH_SUCCESS:
      return {
        ...state,
        companies: action.payload,
        isFetchingCompanies: false,
        currentCompany: (action.payload.length > 0 ? action.payload[0] : null)
      };
    case COMPANY_FETCH_FAIL:
      return {
        ...state,
        fetchErrorMessage: action.payload,
        isFetchingCompanies: false
      };
    case COMPANY_CREATE_STARTED:
      return {
        ...state,
        isCreatingCompany: true,
      };
    case COMPANY_CREATE_SUCCESS:
      return {
        ...state,
        isCreatingCompany: false,
        createCompanySuccess: action.payload,
      };
    case COMPANY_CREATE_FAIL:
      return {
        ...state,
        isCreatingCompany: false,
        createErrorMessage: action.payload
      };
    case COMPANY_SET_COMPANY:
      return {
        ...state,
        currentCompany: action.payload
      };
    case COMPANY_DELETE_COMPANY_STARTED:
      return {
        ...state,
        isDeletingCompany: true
      };
    case COMPANY_DELETE_COMPANY_SUCCESS:
      return {
        ...state,
        isDeletingCompany: false
      };
    case COMPANY_DELETE_COMPANY_FAILED:
      return {
        ...state,
        isDeletingCompany: false
      };
    default:
      return state;
  }
};
