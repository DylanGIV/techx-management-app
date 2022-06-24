import axios, { AxiosInstance, AxiosInterceptorManager, AxiosInterceptorOptions, AxiosRequestConfig } from 'axios';
import configureStore from '../redux/store/index';
const { store } = configureStore();

const herokuURL = 'https://techx-management-api.herokuapp.com/';

let instance = axios.create({
  baseURL: herokuURL
});

instance.interceptors.request.use((config : any) => {
  let token : string = store.getState().auth.account?.jwtToken;
  config.headers.Authorization = 'Bearer ' + token;

  return config;
});

export default instance;
