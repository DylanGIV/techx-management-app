import axios from 'axios';
import configureStore from '../redux/store/index'
const { store } = configureStore()

const herokuURL = 'http://localhost:5000/'

let instance = axios.create({
    baseURL: herokuURL,
});

instance.interceptors.request.use((config) => {
    let token : string = store.getState().auth.jwt
    config.headers.Authorization = 'Bearer ' + token

    return config
})

export default instance;