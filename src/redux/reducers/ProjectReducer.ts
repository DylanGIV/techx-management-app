import { Action } from '../../models/redux/Action';
import { PROJECT_CREATE_FAIL, PROJECT_CREATE_STARTED, PROJECT_CREATE_SUCCESS, PROJECT_FETCH_FAIL, PROJECT_FETCH_STARTED, PROJECT_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  projects: [],
  isFetchingProjects: false,
  isCreatingProject: false,
  createProjectSuccess: false,
  createProjectErrorMessage: '',
  fetchErrorMessage: ''
};

export default (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case PROJECT_FETCH_STARTED:
      return { ...state, isFetchingProjects: true };
    case PROJECT_FETCH_SUCCESS:
      return { ...state, projects: action.payload, isFetchingProjects: false };
    case PROJECT_FETCH_FAIL:
      return {
        ...state,
        isFetchingProjects: false,
        fetchErrorMessage: action.payload
      };
    case PROJECT_CREATE_STARTED:
        return { ...state, isCreatingProject: true };
    case PROJECT_CREATE_SUCCESS:
      return { ...state, createProjectSuccess: action.payload, isCreatingProject: false };
    case PROJECT_CREATE_FAIL:
      return { ...state, createProjectErrorMessage: '', isCreatingProject: false };
    default:
      return state;
  }
};
