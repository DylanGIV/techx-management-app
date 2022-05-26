import { Action } from '../../models/redux/Action';
import { AUTH_LOGIN_FAIL, AUTH_LOGIN_STARTED, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, AUTH_REFRESH_TOKEN_FAIL, AUTH_REFRESH_TOKEN_STARTED, AUTH_REFRESH_TOKEN_SUCCESS, AUTH_REGISTER_FAIL, AUTH_REGISTER_STARTED, AUTH_RESGISTER_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  jwt: null,
  isRegistering: false,
  isLoggingIn: false,
  loginErrorMessage: '',
  registerErrorMessasge: '',
  isRefreshingToken: false,
  refreshTokenErrorMessage: '',
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case AUTH_LOGIN_STARTED:
      return { ...state, isLoggingIn: true };
    case AUTH_LOGIN_SUCCESS:
      return { ...state, jwt: action.payload, isLoggingIn: false };
    case AUTH_LOGIN_FAIL:
      return {
        ...state,
        isLoggingIn: false,
        loginErrorMessage: action.payload
      };
    case AUTH_LOGOUT:
      return { ...state, jwt: null };
    case AUTH_REGISTER_STARTED:
      return { ...state, isRegistering: true };
    case AUTH_REGISTER_FAIL:
      return {
        ...state,
        isRegistering: false,
        registerErrorMessage: action.payload
      };
    case AUTH_RESGISTER_SUCCESS:
      return { ...state, isRegistering: false };
      case AUTH_REFRESH_TOKEN_STARTED:
        return { ...state, isRefreshingToken: true }
      case AUTH_REFRESH_TOKEN_SUCCESS:
        return { ...state, isRefreshingToken: true, jwt: action.payload } 
      case AUTH_REFRESH_TOKEN_FAIL:
        return { ...state, isRefreshingToken: false, refreshTokenErrorMessage: action.payload }
      default:
        return state;
  }
};
