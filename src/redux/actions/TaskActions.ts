import { Alert } from 'react-native';
import { getAccountTasks, getProjectAccountTasks, postCreateAccountTask, putUpdateAccountTaskStatus,  } from '../../api';
import {TASK_CREATE_STARTED, TASK_CREATE_SUCCESS, TASK_CREATE_FAIL, TASK_FETCH_FAIL, TASK_FETCH_SUCCESS, TASK_FETCH_STARTED, TASK_UPDATE_STATUS_STARTED, TASK_UPDATE_STATUS_SUCCESS, TASK_UPDATE_STATUS_FAIL, REFRESH_TASK, TASK_PROJECT_FETCH_SUCCESS } from './types';

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
export const fetchProjectAccountTasks = (projectId : number) => {
  return (dispatch: any) => {
    dispatch({ type: TASK_FETCH_STARTED });

    getProjectAccountTasks(projectId)
      .then((res: any) => {
        dispatch({ type: TASK_PROJECT_FETCH_SUCCESS, payload: res });
      })
      .catch((err: any) => {
        dispatch({ type: TASK_FETCH_FAIL, payload: err });
      });
  };
};

export const createTask = (taskTitle : string, taskDescription : string, accountId : number, projectId : number, date : Date, props : any) => {
  return (dispatch: any) => {
    dispatch({ type: TASK_CREATE_STARTED });
    postCreateAccountTask(taskTitle, taskDescription, accountId, projectId, date)
      .then((res: any) => {
        Alert.alert("Task created successfully", "", [
          {
            text: "Okay",
            onPress: () => { 
              props.navigation.goBack(); 
              dispatch({ type: REFRESH_TASK, payload: true })
            },
          },
        ])
        dispatch({ type: TASK_CREATE_SUCCESS, payload: res});
      })
      .catch((err: any) => {
        alert("Task creation failed. Make sure all inputs are filled.")
        dispatch({ type: TASK_CREATE_FAIL, payload: err });
      });
  };
};

export const updateTaskStatus = (taskId : number, status : boolean, props : any) => {
  return (dispatch: any) => {
    dispatch({ type: TASK_UPDATE_STATUS_STARTED });
    putUpdateAccountTaskStatus(taskId, status)
      .then((res: any) => {
        Alert.alert("Task status updated successfully", "", [
          {
            text: "Okay",
            onPress: () => { 
              props.navigation.goBack(); 
              dispatch({ type: REFRESH_TASK, payload: true })
            },
          },
        ])
        dispatch({ type: TASK_UPDATE_STATUS_SUCCESS, payload: res});
      })
      .catch((err: any) => {
        alert("Task update failed. Please try again.")
        dispatch({ type: TASK_UPDATE_STATUS_FAIL, payload: err });
      });
  };
};
