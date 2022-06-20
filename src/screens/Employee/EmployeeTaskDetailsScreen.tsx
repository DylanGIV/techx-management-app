import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Button, Card, Title, Paragraph, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { Task } from '../../models/response/TaskResponse';

const EmployeeTaskDetailsScreen = (props : any) => {

  const dispatch = useDispatch();

  const params = props.route.params;
  var task : Task = params.task;

  var dueDate = new Date(task.dueDate);

  const markAsComplete = () => {
    // dispatch({ type: })
  }


    return (
      
      <View style={styles.container}>


        {(!task.dueDate) ? (
          <View
            style={styles.loadingIndicator}
          >
            <ActivityIndicator size="large" />
          </View>
        ) : (
      <View style={styles.wrapperView}>
          
          <Text style={styles.titleText}>
            {task.title}
          </Text>
        
          <Text style={styles.assignedText}>
            Assigned to {task.assignedTo.email}
          </Text>

          <Card >
            <Card.Content>
              <Card.Title 
                title='Description'
              />
              <Paragraph>
                {task.description}
              </Paragraph>
            </Card.Content>
          </Card>

          <Card >
            <Card.Content>
              <Card.Title 
                title='Project'
              />
              <Paragraph>
                {task.project.projectName}
              </Paragraph>
            </Card.Content>
          </Card>

          <Card >
            <Card.Content>
              <Card.Title 
                title='Due date'
              />
              <Paragraph>
                {dueDate.toDateString()}
                {"\n"}
                {dueDate.toLocaleTimeString()}
              </Paragraph>
            </Card.Content>
          </Card>
          <Button onPress={markAsComplete} >
            Mark as complete.
          </Button>
        </View>
        
      )}
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
    loadingIndicator: {
      position: 'absolute', 
      justifyContent: 'center', 
      alignItems: 'center', 
      // backgroundColor: colors.primaryDark,
      opacity: 0.1, 
      left: 0, 
      right: 0, 
      top: 0, 
      bottom: 0,
    },

  });
    
export default EmployeeTaskDetailsScreen;
