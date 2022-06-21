import { TASK_CREATE_FAIL, TASK_CREATE_STARTED, TASK_CREATE_SUCCESS, TASK_FETCH_FAIL, TASK_FETCH_STARTED, TASK_FETCH_SUCCESS, TASK_UPDATE_STATUS_FAIL, TASK_UPDATE_STATUS_STARTED, TASK_UPDATE_STATUS_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  tasks: [],
  isFetchingTasks: false,
  isCreatingTask: false,
  createTaskSuccess: '',
  createTaskErrorMessage: '',
  fetchErrorMessage: '',
  updateTaskSuccess: '',
  updateTaskErrorMessage: '',
  isUpdatingTask: false,
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case TASK_FETCH_STARTED:
      return { ...state, isFetchingTasks: true };
    case TASK_FETCH_SUCCESS:
      return { ...state, tasks: action.payload, isFetchingTasks: false };
    case TASK_FETCH_FAIL:
      return {
        ...state,
        isFetchingTasks: false,
        fetchErrorMessage: action.payload
      };
    case TASK_CREATE_STARTED:
        return { ...state, isCreatingTask: true };
    case TASK_CREATE_SUCCESS:
      return { ...state, createTaskSuccess: action.payload, isCreatingTask: false };
    case TASK_CREATE_FAIL:
      return { ...state, createTaskErrorMessage: '', isCreatingTask: false };
    case TASK_UPDATE_STATUS_STARTED:
        return { ...state, isUpdatingTask: true };
    case TASK_UPDATE_STATUS_SUCCESS:
      return { ...state, updateTaskSuccess: action.payload, isUpdatingTask: false };
    case TASK_UPDATE_STATUS_FAIL:
      return { ...state, updateTaskErrorMessage: '', isUpdatingTask: false };
    default:
      return state;
  }
};
