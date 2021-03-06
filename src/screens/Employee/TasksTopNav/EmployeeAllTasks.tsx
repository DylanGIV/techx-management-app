import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import ListTasks from '../../../components/tasks';

const AllTasksScreen = (props : any) => {

    const taskProps = {
      props: {...props},
      projectId: props.route.params.projectId,
      routeName: props.route.params.routeName
    }

    return (
    
        
        <View style={styles.wrapperView}>
            <ListTasks props={taskProps} filter='all'/>
            
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
    
export default AllTasksScreen;
