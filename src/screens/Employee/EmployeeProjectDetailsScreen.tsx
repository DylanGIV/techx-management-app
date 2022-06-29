import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Text, Button, Card, Title, Paragraph } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Project } from '../../models/response/ProjectResponse';
import { Task } from '../../models/response/TaskResponse';
import { deleteProjectAction, updateProjectStatus } from '../../redux/actions/ProjectActions';
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
  console.log(project.completed)
  const topTabProps = { 
    projectId: project.id
  }

    return (
      <View style={styles.container}>

          <Card >
            <Card.Title 
              title={project.projectName}
              subtitle={project.projectDescription}
              right={() => 
                <View style={{ flex: 1, justifyContent: 'space-between', padding: 5}}>
                  <Button
                    color='red'
                    onPress={() => {
                      Alert.alert("Would you like to delete this project and all of its tasks?", "", [
                        {
                        text: "Yes",
                        onPress: () => { 
                            deleteCurrentProject(project.id);
                        },
                        },
                        {
                        text: "No",
                        }
                      ])
                    }}
                  >
                    <Text style={{ fontSize: 12, color: 'red' }}>
                      Delete
                    </Text>
                  </Button>

                  <Button
                    color='red'
                    onPress={() => {
                      (project.completed) ?
                        Alert.alert("Mark this project as incomplete?", "", [
                          {
                          text: "Yes",
                          onPress: () => { 
                              updateCurrentProjectStatus(project.id, false);
                          },
                          },
                          {
                          text: "No",
                          }
                        ])
                      :
                        Alert.alert("Mark this project as complete?", "", [
                          {
                          text: "Yes",
                          onPress: () => { 
                              updateCurrentProjectStatus(project.id, true);
                          },
                          },
                          {
                          text: "No",
                          }
                        ])
                      }}
                    >

                    <Text style={{ fontSize: 12, color: 'green' }}>
                      {(project.completed) ? "Incomplete" : "Mark as Complete"}
                    </Text>
                  </Button>
                </View>
              }
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
