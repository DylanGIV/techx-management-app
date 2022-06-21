import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme, Text } from 'react-native-paper';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectsByAccount } from '../../../redux/actions/ProjectActions';
import TopTabBar from '../../../components/topTabBar';
import AllTasksScreen from './EmployeeAllTasks';
import IncompleteTasksScreen from './EmployeeIncompleteTasks';
import CompleteTasksScreen from './EmployeeCompletedTasks';

const Tab = createMaterialTopTabNavigator();

function TasksTopTab() {
  const dispatch = useDispatch();
  const { colors } = useTheme();

  useEffect(() => {

  }, [])


  return (
    <Tab.Navigator
      initialRouteName="AllTasks"
      initialLayout={{ width: Dimensions.get('window').width }}
      screenOptions={{
        tabBarActiveTintColor: colors.text,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: colors.surface, height: 30, borderRadius: 8, borderColor: colors.primaryDark, borderWidth: 0.5},
        tabBarItemStyle: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 4.5},
      }}
      // tabBar={(props) => <TopTabBar {...props} />}
    >
      <Tab.Screen
        name="AllTasks"
        component={AllTasksScreen}
        options={{ tabBarLabel: 'All', tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.secondary, tabBarIndicatorStyle: {backgroundColor: colors.primary} }}
      />
      <Tab.Screen
        name="IncompleteTasks"
        component={IncompleteTasksScreen}
        options={{ tabBarLabel: 'Incomplete', tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.secondary, tabBarIndicatorStyle: {backgroundColor: colors.primary} }}
      />
      <Tab.Screen
        name="CompleteTasks"
        component={CompleteTasksScreen}
        options={{ tabBarLabel: 'Completed', tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.secondary, tabBarIndicatorStyle: {backgroundColor: colors.primary} }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
  },
  wrappingView: {
    flex: 1
  },
  outerView: {
    flex: 1,
    flexDirection: 'row'
  }
});

export default TasksTopTab;