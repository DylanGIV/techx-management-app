

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Animated, TouchableOpacity } from 'react-native';
import { Text, Button, useTheme, Card, Title, ActivityIndicator, Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Task } from '../models/response/TaskResponse';
import { fetchProjectsByAccount } from '../redux/actions/ProjectActions';
import { fetchAccountTasks, fetchProjectAccountTasks } from '../redux/actions/TaskActions';
import { REFRESH_TASK } from '../redux/actions/types';

const ListTasks = (props : any) => {
    const [filteredTasks, setFilteredTasks] = useState('' as any);
    const currentCompany = useSelector((state : any) => state.company.currentCompany);
    const dispatch = useDispatch();

    const getTasks = () => {
      dispatch(fetchAccountTasks() as any);
    }
    const refreshTask = useSelector((state : any) => state.refresh.refreshTask);
    const routeName = props.props.routeName;
    const projectId = props.props.projectId;
    const { colors } = useTheme();
    const filter = props.filter
    const styles = makeStyles(colors);
    const isFetchingTasks = useSelector((state : any) => state.task.isFetchingTasks);

    const getProjectTasks = (projectId : number) => {
      dispatch(fetchProjectAccountTasks(projectId) as any)
    }
  
    useEffect(() => {
      if (projectId == -1) {
        getTasks();
      } else {
        getProjectTasks(projectId);
      }

      if (refreshTask) {
        dispatch({ type: REFRESH_TASK, payload: false})
      }
  
    }, [currentCompany, refreshTask])

    const tasks : Task[] = (projectId == -1) 
      ? useSelector((state : any) => state.task.tasks) 
      : useSelector((state : any) => state.task.projectTasks);

    const filterTasks = () => {
      let tempTasks = new Array();
      if (filter == 'all') {
        tasks.forEach((t : Task) => {
            tempTasks.push(t)
        });
      }
      else if (filter == 'completed') {
        tasks.forEach((t : Task) => {
          if (t.completed == true) {
            tempTasks.push(t)
          }
        });
      }
      else if (filter == 'incomplete') {
        tasks.forEach((t : Task) => {
          if (t.completed == false) {
            tempTasks.push(t)
          }
        });
      }
      setFilteredTasks(tempTasks);
    }

    useEffect(() => {
      if (currentCompany && tasks)
        filterTasks();
    }, [tasks, currentCompany])
    
    return (
      <View style={styles.wrapperView}>
        
        {!currentCompany ?
          <View style={styles.noCompanyView}>
            <Text style={styles.noCompanyText}>
              You must be in a company before creating tasks!
            </Text>
          </View>
        :
        isFetchingTasks || !tasks || !filteredTasks ? (
        <View
          style={styles.loadingIndicator}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : filteredTasks.length === 0 ? (
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20 }}>
            No tasks
          </Text>
        </View>
      ) : (
        <Animated.FlatList
          keyExtractor={(item) => item.id.toString()}
          data={filteredTasks}
          onRefresh={getTasks}
          refreshing={isFetchingTasks}
          renderItem={({ item }) => (
            <View style={styles.itemWrapperView} >
              <TouchableOpacity
                onPress={() =>
                  props.props.props.navigation.navigate("TaskDetails", {task: item})
                }
              >
                <View style={{ flex: 1 }}>
                  
                  <Card style={(styles.card, styles.spacing)}>
                    <Card.Title 
                      title={item.title}
                      subtitle={item.description}
                      subtitleNumberOfLines={1}
                      left={(props) => <Avatar.Icon {...props} icon="calendar-check" />}
                      right={(props) => <Text>{("Due: ") + new Date(item.dueDate).toDateString() }</Text>}
                    />
                  </Card>

                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      </View>
    );
};

const makeStyles = (colors : ReactNativePaper.ThemeColors) => StyleSheet.create({
    wrapperView: {
      flex: 1,
      // backgroundColor: colors.primary
    },
    container: {
      flex: 1,
    },
    spacing: {
      marginTop: 20,
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 0,
    },
    card: {
      flexDirection: "row",
      height: 30,
      width: 10,
      borderRadius: 1,
      alignSelf: "center",
      marginBottom: 3,
      marginTop: 3,
      borderLeftWidth: 5,
      shadowColor: "#000",
      shadowOffset: {
        width: 1,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    appButtonContainer: {
      elevation: 8,
      backgroundColor: "white",
      borderRadius: 30,
      paddingVertical: 0,
      paddingHorizontal: 0,
    },
    buttonContainer: {
      borderRadius: 25,
      paddingTop: 0,
      paddingBottom: 0,
      marginRight: 1.8,
      marginLeft: 1.8,
      flex: 1,
    },
    appButtonText: {
      fontSize: 14,
      color: "#FFFFFF",
      fontWeight: "bold",
      alignSelf: "center",
      padding: 0,
      margin: 0,
    },
    loadingIndicator: {
      position: 'absolute', 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: colors.primaryDark,
      opacity: 0.1, 
      left: 0, 
      right: 0, 
      top: 0, 
      bottom: 0,
    },
    itemWrapperView: {
      flex: 1,
      borderBottomWidth: 1,
      marginLeft: 10
    },
    noCompanyView: {
      flex: 1,
      justifyContent: 'center',
    },
    noCompanyText: {
      textAlign: 'center',
      fontSize: 26
    }
  });
    
export default ListTasks;
