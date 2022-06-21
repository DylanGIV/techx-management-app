import { Alert } from 'react-native';
import { getProjectsByAccount, postCreateProject } from '../../api';
import { PROJECT_FETCH_SUCCESS, PROJECT_FETCH_STARTED, PROJECT_FETCH_FAIL, PROJECT_CREATE_STARTED, PROJECT_CREATE_SUCCESS, PROJECT_CREATE_FAIL, REFRESH_SWITCH } from './types';

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

    Alert.alert("Project created successfully", "", [
      {
        text: "Okay",
        onPress: () => { 
          dispatch({ type: REFRESH_SWITCH, payload: true})
          props.navigation.goBack(); 
        },
      },
    ])

    postCreateProject(companyId, projectName, projectDescription)
      .then((res: any) => {
        dispatch({ type: PROJECT_CREATE_SUCCESS, payload: res});
      })
      .catch((err: any) => {
        dispatch({ type: PROJECT_CREATE_FAIL, payload: err });
      });
  };
};
