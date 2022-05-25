import { combineReducers } from "redux";
import AuthReducer from './AuthReducer';
import ThemeReducer from "./ThemeReducer";

export default combineReducers({
    auth: AuthReducer,
    theme: ThemeReducer,
})