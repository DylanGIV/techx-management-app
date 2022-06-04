import { TASK_CREATE_FAIL, TASK_CREATE_STARTED, TASK_CREATE_SUCCESS, TASK_FETCH_FAIL, TASK_FETCH_STARTED, TASK_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  tasks: [],
  isFetchingTasks: false,
  isCreatingTask: false,
  createTaskSuccess: '',
  createTaskErrorMessage: '',
  fetchErrorMessage: ''
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case TASK_FETCH_STARTED:
      return { ...state, isFetchingProjects: true };
    case TASK_FETCH_SUCCESS:
      return { ...state, projects: action.payload, isFetchingProjects: false };
    case TASK_FETCH_FAIL:
      return {
        ...state,
        isFetchingProjects: false,
        fetchErrorMessage: action.payload
      };
    case TASK_CREATE_STARTED:
        return { ...state, isCreatingProject: true };
    case TASK_CREATE_SUCCESS:
      return { ...state, createProjectSuccess: action.payload, isCreatingProject: false };
    case TASK_CREATE_FAIL:
      return { ...state, createProjectErrorMessage: '', isCreatingProject: false };
    default:
      return state;
  }
};
