import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllScreen from './AllScreen';
import RecentsScreen from './RecentsScreen';
import FavoritesScreen from './FavoritesScreen';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: 'powderblue' },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={AllScreen}
        options={{ tabBarLabel: 'All' }}
      />
      <Tab.Screen
        name="Notifications"
        component={RecentsScreen}
        options={{ tabBarLabel: 'Recents' }}
      />
      <Tab.Screen
        name="Profile"
        component={FavoritesScreen}
        options={{ tabBarLabel: 'Favorites' }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;