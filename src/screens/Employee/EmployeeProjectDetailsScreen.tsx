import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Button, Card, Title, Paragraph } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const EmployeeProjectDetailsScreen = (props : any) => {

  const { project } = props.route.params;


    return (
      <View style={styles.container}>


          <Text style={styles.titleText}>
            {project.projectName}
          </Text>
        
          {/* <Text style={styles.assignedText}>
            Assigned to {project.assig}
          </Text> */}

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

  });
    
export default EmployeeProjectDetailsScreen;
