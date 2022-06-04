import { getAccountTasks, postCreateAccountTask,  } from '../../api';
import {TASK_CREATE_STARTED, TASK_CREATE_SUCCESS, TASK_CREATE_FAIL, TASK_FETCH_FAIL, TASK_FETCH_SUCCESS, TASK_FETCH_STARTED } from './types';

export const tasksFetchSuccess = (tasks: any) => {
  return {
    type: TASK_FETCH_SUCCESS,
    payload: tasks
  };
};

export const fetchAccountTasks = () => {
  return (dispatch: any) => {
    dispatch({ type: TASK_FETCH_STARTED });

    getAccountTasks()
      .then((res: any) => {
        dispatch(tasksFetchSuccess(res));
      })
      .catch((err: any) => {
        dispatch({ type: TASK_FETCH_FAIL, payload: err });
      });
  };
};

export const createTask = (taskTitle : string, taskDescription : string, accountId : number, projectId : number) => {
  return (dispatch: any) => {
    dispatch({ type: TASK_CREATE_STARTED });

    postCreateAccountTask(taskTitle, taskDescription, accountId, projectId)
      .then((res: any) => {
        dispatch({ type: TASK_CREATE_SUCCESS, payload: res});
      })
      .catch((err: any) => {
        dispatch({ type: TASK_CREATE_FAIL, payload: err });
      });
  };
};
