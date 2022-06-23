import { Alert } from 'react-native';
import { deleteProject, getProjectsByAccount, postCreateProject } from '../../api';
import { PROJECT_FETCH_SUCCESS, PROJECT_FETCH_STARTED, PROJECT_FETCH_FAIL, PROJECT_CREATE_STARTED, PROJECT_CREATE_SUCCESS, PROJECT_CREATE_FAIL, REFRESH_PROJECT, PROJECT_DELETE_FAILED, PROJECT_DELETE_SUCCESS, PROJECT_DELETE_STARTED } from './types';

export const projectsFetchSuccess = (projects: any) => {
  return {
    type: PROJECT_FETCH_SUCCESS,
    payload: projects
  };
};

export const fetchProjectsByAccount = () => {
  return (dispatch: any) => {
    dispatch({ type: PROJECT_FETCH_STARTED });

    getProjectsByAccount()
      .then((res: any) => {
        dispatch(projectsFetchSuccess(res));
      })
      .catch((err: any) => {
        dispatch({ type: PROJECT_FETCH_FAIL, payload: err });
      });
  };
};

export const createProject = (companyId: number, projectName : string, projectDescription : string, props : any) => {
  return (dispatch: any) => {
    dispatch({ type: PROJECT_CREATE_STARTED });

    postCreateProject(companyId, projectName, projectDescription)
      .then((res: any) => {
        Alert.alert("Project created successfully", "", [
          {
            text: "Okay",
            onPress: () => { 
              dispatch({ type: REFRESH_PROJECT, payload: true})
              props.navigation.goBack(); 
            },
          },
        ])
        dispatch({ type: PROJECT_CREATE_SUCCESS, payload: res});
      })
      .catch((err: any) => {
        dispatch({ type: PROJECT_CREATE_FAIL, payload: err });
      });
  };
};

export const deleteProjectAction = (projectId: number, props : any) => {
  return (dispatch: any) => {
    dispatch({ type: PROJECT_DELETE_STARTED });

    deleteProject(projectId)
      .then((res: any) => {
        Alert.alert("Project deleted successfully", "", [
          {
            text: "Okay",
            onPress: () => { 
              dispatch({ type: REFRESH_PROJECT, payload: true})
              props.navigation.goBack(); 
            },
          },
        ])
        dispatch({ type: PROJECT_DELETE_SUCCESS });
      })
      .catch((err: any) => {
        dispatch({ type: PROJECT_DELETE_FAILED });
      });
  };
};
