import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Text, Button, Card, Title, Paragraph } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { Project } from '../../models/response/ProjectResponse';
import { deleteProjectAction } from '../../redux/actions/ProjectActions';

const EmployeeProjectDetailsScreen = (props : any) => {
  const dispatch = useDispatch();
  const project : Project = props.route.params.project;
  const deleteCurrentProject = (projectId : number) => {
    dispatch(deleteProjectAction(projectId, props) as any)
  }


    return (
      <View style={styles.container}>

        <View style={styles.titleDeleteProjectView}>

          <View style={styles.titleView}>
            <Text style={styles.titleText}>
              {project.projectName}
            </Text> 
          </View>

          <View style={styles.buttonView}>

            <Button
              color='red'
              onPress={() => {
                Alert.alert("Would you like to delete this project?", "", [
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
              <Text style={{ fontSize: 17, color: 'red' }}>
                Delete
              </Text>
            </Button>
          </View>
        </View>
        
          {/* <Text style={styles.assignedText}>
            Assigned to {project.assig}
          </Text> */}
        <View style={styles.wrapperView}>
          <Card >
            <Card.Content>
              <Card.Title 
                title='Description'
              />
              <Paragraph>
                {project.projectDescription}
              </Paragraph>
            </Card.Content>
          </Card>
        </View>

          {/* <Card >
            <Card.Content>
              <Card.Title 
                title='Project'
              />
              <Paragraph>
                {project.project.projectName}
              </Paragraph>
            </Card.Content>
          </Card> */}

      </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    wrapperView: {
      flex: 1,
    },
    titleText: {
      fontSize: 30
    },
    assignedText: {
      fontSize: 18
    },
    descriptionText: {
      fontSize: 18
    },
    titleDeleteProjectView: {
      flex: 0.1,
      flexDirection: 'row'
    },
    titleView: {
      flex: 1
    },
    buttonView: {
      flex: 1,
      alignItems: 'flex-end',
    }

  });
    
export default EmployeeProjectDetailsScreen;
