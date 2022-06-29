import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllScreen from './AllScreen';
import RecentsScreen from './RecentsScreen';
import FavoritesScreen from './FavoritesScreen';
import { useTheme, Text } from 'react-native-paper';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectsByAccount } from '../../../redux/actions/ProjectActions';
import TopTabBar from '../../../components/topTabBar';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  const dispatch = useDispatch();
  const { colors } = useTheme();

  useEffect(() => {
    dispatch(fetchProjectsByAccount() as any);
  }, [])

  const projects = useSelector((state : any) => state.project.projects);
  // console.log(projects[0].projectName);

  return (
    <Tab.Navigator
      initialRouteName="CurrentProjects"
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
        name="CurrentProjects"
        component={FavoritesScreen}
        options={{ tabBarLabel: 'Current', tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.secondary, tabBarIndicatorStyle: {backgroundColor: colors.primary} }}
      />
      {/* <Tab.Screen
        name="ArchivedProjects"
        component={RecentsScreen}
        options={{ tabBarLabel: 'Archived', tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.secondary, tabBarIndicatorStyle: {backgroundColor: colors.primary} }}
      /> */}
      <Tab.Screen
        name="AllProjects"
        component={AllScreen}
        options={{ tabBarLabel: 'All', tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.secondary, tabBarIndicatorStyle: {backgroundColor: colors.primary} }}
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

export default MyTabs;