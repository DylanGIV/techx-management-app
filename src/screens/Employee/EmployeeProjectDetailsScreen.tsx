import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Text, Button, Card, Title, Paragraph } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Project } from '../../models/response/ProjectResponse';
import { Task } from '../../models/response/TaskResponse';
import { deleteProjectAction, updateProjectGlobalAction, updateProjectStatus } from '../../redux/actions/ProjectActions';
import { fetchProjectAccountTasks } from '../../redux/actions/TaskActions';
import TasksTopTab from './TasksTopNav/EmployeeTasksTopTabNavigator';

const EmployeeProjectDetailsScreen = (props : any) => {
  const dispatch = useDispatch();
  const project : Project = props.route.params.project;

  const deleteCurrentProject = (projectId : number) => {
    dispatch(deleteProjectAction(projectId, props) as any);
  }
  const updateCurrentProjectStatus = (projectId : number, projectStatus : boolean) => {
    dispatch(updateProjectStatus(projectId, projectStatus, props) as any);
  }
  const updateCurrentProject = (currentProject : Project) => {
    dispatch(updateProjectGlobalAction(currentProject) as any);
  }

  useEffect(() => {
    updateCurrentProject(project);
  }, [project])

  const topTabProps = { 
    projectId: project.id
  }

    return (
      <View style={styles.container}>

          <Card >
            <Card.Title 
              title={project.projectName}
              subtitle={project.projectDescription}
            />
          </Card>

        <View style={styles.wrapperView}>
          <TasksTopTab {...topTabProps}/>
        </View>

      </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapperView: {
      flex: 1,
    },

  });
    
export default EmployeeProjectDetailsScreen;
