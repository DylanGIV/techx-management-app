import { Alert } from 'react-native';
import { getAllCompanies, getCompaniesByAccount, postCreateCompany } from '../../api';
import { COMPANY_CREATE_FAIL, COMPANY_CREATE_STARTED, COMPANY_CREATE_SUCCESS, COMPANY_FETCH_FAIL, COMPANY_FETCH_STARTED, COMPANY_FETCH_SUCCESS, REFRESH_COMPANY } from './types';

export const companiesFetchSuccess = (companies: any) => {
  return {
    type: COMPANY_FETCH_SUCCESS,
    payload: companies
  };
};

export const fetchCompanies = () => {
  return (dispatch: any) => {
    dispatch({ type: COMPANY_FETCH_STARTED })

      getCompaniesByAccount()
      .then((res: any) => {
        dispatch(companiesFetchSuccess(res));
      })
      .catch((err: any) => {
        dispatch({ type: COMPANY_FETCH_FAIL, payload: err });
      });
  };
};

export const createCompany = (companyName: string, props : any) => {
  return (dispatch: any) => {
    dispatch({ type: COMPANY_CREATE_STARTED });

    postCreateCompany(companyName)
      .then((res: any) => {
        Alert.alert("Company created successfully", "", [
          {
            text: "Okay",
            onPress: () => { 
              dispatch({ type: REFRESH_COMPANY, payload: true})
              props.navigation.goBack(); 
            },
          },
        ])
        dispatch({ type: COMPANY_CREATE_SUCCESS, payload: res});
      })
      .catch((err: any) => {
        dispatch({ type: COMPANY_CREATE_FAIL, payload: err });
      });
  };
};

