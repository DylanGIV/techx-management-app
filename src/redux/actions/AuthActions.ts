import { AUTH_LOGIN_SUCCESS, AUTH_LOGIN_STARTED, AUTH_LOGIN_FAIL, AUTH_LOGOUT } from './types';
import { postLogin, postRegister } from '../../api/';
import { AxiosResponse } from 'axios';

export const authLoginSuccess = (token : string) => {
    return {
        type: AUTH_LOGIN_SUCCESS,
        payload: token
    }
}
export const authLogout = () => {
    return {
        type: AUTH_LOGOUT
    }
}

export const loginWithEmailAndPassword = (email : string, password : string) => {
    return (dispatch : any) => {
        dispatch({ type: AUTH_LOGIN_STARTED })

        postLogin(email, password)
        
        .then((res : any) => {
            dispatch(authLoginSuccess(res.jwtToken))
        })
        .catch((err : any) => {
            dispatch({ type: AUTH_LOGIN_FAIL, payload: err })
            alert('Invalid email and password');
        })
    }
}

export const registerAccount = (company : string, firstName: string, lastName : string, email : string, password : string, confirmPassword : string, acceptTerms : Boolean) => {
    return (dispatch : any) => {
        // dispatch({ type: AUTH_LOGIN_STARTED })
        postRegister(company, firstName, lastName, email, password, confirmPassword, acceptTerms)
        
        .then((res : any) => {
            // postLogin(email, password)

            // .then((res : any) => {
            //     dispatch(authLoginSuccess(res.jwtToken))
            // })
            // .catch((err : any) => {
            //     dispatch({ type: AUTH_LOGIN_FAIL, payload: err })
            //     alert('Invalid email and password')
            // })
        })
        .catch((err : any) => {
            // dispatch({ type: AUTH_LOGIN_FAIL, payload: err })
            alert(err)
        })

    }
}