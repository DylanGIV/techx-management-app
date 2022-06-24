import { AUTH_LOGIN_SUCCESS, AUTH_LOGIN_STARTED, AUTH_LOGIN_FAIL, AUTH_LOGOUT, AUTH_REGISTER_STARTED, AUTH_REGISTER_FAIL, AUTH_RESGISTER_SUCCESS, AUTH_REFRESH_TOKEN_SUCCESS, AUTH_REFRESH_TOKEN_FAIL, AUTH_REFRESH_TOKEN_STARTED, AUTH_PASSWORD_RESET, AUTH_PASSWORD_RESET_SUCCESS, AUTH_PASSWORD_RESET_FAIL } from './types';
import { postLogin, postPasswordReset, postRefreshToken, postRegister } from '../../api/';
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
        dispatch(authLoginSuccess(res));
      })
      .catch((err: any) => {
        dispatch({ type: AUTH_LOGIN_FAIL, payload: err });
        alert('Invalid email and password');
      });
  };
};

export const registerAccount = (firstName: string, lastName: string, email: string, password: string, confirmPassword: string, acceptTerms: Boolean, role : number, props : any) => {
  return (dispatch: any) => {
    dispatch({ type: AUTH_REGISTER_STARTED });
    postRegister(firstName, lastName, email, password, confirmPassword, acceptTerms, role)
      .then((res: any) => {
        dispatch({ type: AUTH_RESGISTER_SUCCESS });
        alert('Please check your email for a verification message.');
        props.navigation.goBack();
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

// double check if this is correct
export const passwordReset = (token: string, password: string, confirmPassword: string) => {
  return (dispatch: any) => {
    dispatch({ type: AUTH_PASSWORD_RESET});
    postPasswordReset(token, password, confirmPassword).then((res: any) => {
      dispatch({ type: AUTH_PASSWORD_RESET_SUCCESS});
      alert('Please check your email for a password reset link');
    })
    .catch((err: any) => {
      dispatch({ type: AUTH_PASSWORD_RESET_FAIL, payload: err});
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
        alert('Could not refresh token');
      });
  };
};
