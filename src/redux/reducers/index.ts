import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import CompanyReducer from './CompanyReducer';
import ProjectReducer from './ProjectReducer';
import ThemeReducer from './ThemeReducer';

export default combineReducers({
  auth: AuthReducer,
  theme: ThemeReducer,
  company: CompanyReducer,
  project: ProjectReducer
});
