import { Action } from '../../models/redux/Action';
import { PROJECT_CREATE_FAIL, PROJECT_CREATE_STARTED, PROJECT_CREATE_SUCCESS, PROJECT_DELETE_FAILED, PROJECT_DELETE_STARTED, PROJECT_DELETE_SUCCESS, PROJECT_FETCH_FAIL, PROJECT_FETCH_STARTED, PROJECT_FETCH_SUCCESS, PROJECT_UPDATE_FAILED, PROJECT_UPDATE_STARTED, PROJECT_UPDATE_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  projects: [],
  isFetchingProjects: false,
  isCreatingProject: false,
  isUpdatingProject: false,
  createProjectSuccess: '',
  createProjectErrorMessage: '',
  fetchErrorMessage: '',
  isDeletingProject: false,
};

export default (state = INITIAL_STATE, action: any) => {
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
    case PROJECT_DELETE_STARTED:
        return { ...state, isDeletingProject: true };
    case PROJECT_DELETE_SUCCESS:
      return { ...state, isDeletingProject: false };
    case PROJECT_DELETE_FAILED:
      return { ...state, isDeletingProject: false };
    case PROJECT_UPDATE_STARTED:
        return { ...state, isUpdatingProject: true };
    case PROJECT_UPDATE_SUCCESS:
      return { ...state, isUpdatingProject: false };
    case PROJECT_UPDATE_FAILED:
      return { ...state, isUpdatingProject: false };
    default:
      return state;
  }
};
