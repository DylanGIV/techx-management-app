import { AUTH_LOGIN_SUCCESS, AUTH_LOGIN_STARTED, AUTH_LOGIN_FAIL, AUTH_LOGOUT, AUTH_REGISTER_STARTED, AUTH_REGISTER_FAIL, AUTH_RESGISTER_SUCCESS, AUTH_REFRESH_TOKEN_SUCCESS, AUTH_REFRESH_TOKEN_FAIL, AUTH_REFRESH_TOKEN_STARTED } from './types';
import { postLogin, postRefreshToken, postRegister } from '../../api/';
import { AxiosResponse } from 'axios';

export const authLoginSuccess = (token: string) => {
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload: token
  };
};
export const authLogout = () => {
  return {
    type: AUTH_LOGOUT
  };
};

export const loginWithEmailAndPassword = (email: string, password: string) => {
  return (dispatch: any) => {
    dispatch({ type: AUTH_LOGIN_STARTED });

    postLogin(email, password)
      .then((res: any) => {
        dispatch(authLoginSuccess(res.jwtToken));
      })
      .catch((err: any) => {
        dispatch({ type: AUTH_LOGIN_FAIL, payload: err });
        alert('Invalid email and password');
      });
  };
};

export const registerAccount = (company: string, firstName: string, lastName: string, email: string, password: string, confirmPassword: string, acceptTerms: Boolean) => {
  return (dispatch: any) => {
    dispatch({ type: AUTH_REGISTER_STARTED });
    postRegister(company, firstName, lastName, email, password, confirmPassword, acceptTerms)
      .then((res: any) => {
        dispatch({ type: AUTH_RESGISTER_SUCCESS });
        alert('Please check your email for a verification message.');
        // postLogin(email, password)

        // .then((res : any) => {
        //     dispatch(authLoginSuccess(res.jwtToken))
        // })
        // .catch((err : any) => {
        //     dispatch({ type: AUTH_LOGIN_FAIL, payload: err })
        //     alert('Invalid email and password')
        // })
      })
      .catch((err: any) => {
        dispatch({ type: AUTH_REGISTER_FAIL, payload: err });
        alert(err);
      });
  };
};

export const refreshTokenAction = () => {
  return (dispatch: any) => {
    dispatch({ type: AUTH_REFRESH_TOKEN_STARTED });

    postRefreshToken()
      .then((res: any) => {
        dispatch({ type: AUTH_REFRESH_TOKEN_SUCCESS, payload: res.jwtToken });
      })
      .catch((err: any) => {
        dispatch({ type: AUTH_REFRESH_TOKEN_FAIL, payload: err });
        alert('Invalid email and password');
      });
  };
};
