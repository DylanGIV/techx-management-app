import { getAllCompanies } from '../../api';
import { COMPANY_FETCH_FAIL, COMPANY_FETCH_STARTED, COMPANY_FETCH_SUCCESS } from './types';

export const companiesFetchSuccess = (companies: any) => {
  return {
    type: COMPANY_FETCH_SUCCESS,
    payload: companies
  };
};

export const fetchCompanies = () => {
  return (dispatch: any) => {
    dispatch({ type: COMPANY_FETCH_STARTED })
      // getTransactions(accountId, accessToken)
      console.log("here")
      getAllCompanies()
      .then((res: any) => {
        console.log(res)
        dispatch(companiesFetchSuccess(res));
      })
      .catch((err: any) => {
        dispatch({ type: COMPANY_FETCH_FAIL, payload: err });
      });
  };
};
