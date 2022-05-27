import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllScreen from './AllScreen';
import RecentsScreen from './RecentsScreen';
import FavoritesScreen from './FavoritesScreen';
import { useTheme } from 'react-native-paper';
import { Dimensions } from 'react-native';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {

  const { colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      initialLayout={{ width: Dimensions.get('window').width }}
      screenOptions={{
        tabBarActiveTintColor: colors.text,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: colors.surface, height: 30, borderRadius: 8, borderColor: colors.primaryDark, borderWidth: 0.5},
        tabBarItemStyle: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 4.5},
      }}
    >
      <Tab.Screen
        name="Feed"
        component={AllScreen}
        options={{ tabBarLabel: 'All', tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.secondary, tabBarIndicatorStyle: {backgroundColor: colors.primary} }}
      />
      <Tab.Screen
        name="Notifications"
        component={RecentsScreen}
        options={{ tabBarLabel: 'Recents', tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.secondary, tabBarIndicatorStyle: {backgroundColor: colors.primary} }}
      />
      <Tab.Screen
        name="Profile"
        component={FavoritesScreen}
        options={{ tabBarLabel: 'Favorites', tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.secondary, tabBarIndicatorStyle: {backgroundColor: colors.primary} }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;