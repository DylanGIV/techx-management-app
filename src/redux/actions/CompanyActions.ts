import { Alert } from 'react-native';
import { deleteCompany, getAllCompanies, getCompaniesByAccount, postCreateCompany } from '../../api';
import { COMPANY_CREATE_FAIL, COMPANY_CREATE_STARTED, COMPANY_CREATE_SUCCESS, COMPANY_DELETE_COMPANY_FAILED, COMPANY_DELETE_COMPANY_STARTED, COMPANY_DELETE_COMPANY_SUCCESS, COMPANY_FETCH_FAIL, COMPANY_FETCH_STARTED, COMPANY_FETCH_SUCCESS, COMPANY_SET_COMPANY, REFRESH_COMPANY, REFRESH_PROJECT } from './types';

export const companiesFetchSuccess = (companies: any) => {
  return {
    type: COMPANY_FETCH_SUCCESS,
    payload: companies
  };
};

export const updateCompanyIdGlobalAction = (company : any) => {
  return {
    type: COMPANY_SET_COMPANY,
    payload: company
  }
}

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

export const deleteCompanyAction = (companyId : number) => {
  return (dispatch: any) => {
    dispatch({ type: COMPANY_DELETE_COMPANY_STARTED });

    deleteCompany(companyId)
      .then((res: any) => {
        dispatch({ type: REFRESH_COMPANY, payload: true });
        dispatch({ type: REFRESH_PROJECT, payload: true });
        dispatch(updateCompanyIdGlobalAction(null));
        dispatch({ type: COMPANY_DELETE_COMPANY_SUCCESS});
      })
      .catch((err: any) => {
        alert("Company deletion failed");
        dispatch({ type: COMPANY_DELETE_COMPANY_FAILED});
      });
  };
};

