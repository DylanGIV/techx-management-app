import * as React from "react";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Icon from "react-native-vector-icons/Ionicons";

import { StyleSheet, View } from "react-native";
import ClientHomeScreen from "./ClientHomeScreen";
import ClientInboxScreen from "./ClientInboxScreen";
import ClientSearchScreen from "./ClientSearchScreen";
import ClientAccountScreen from "./ClientAccountScreen";
import { useTheme } from "react-native-paper";
import ClientTaskScreen from "./ClientTaskScreen";

const Stack = createStackNavigator();

const DetailsStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
  const { colors } = useTheme();

  return (
      <Tab.Navigator 
        initialRouteName="Home" 
        activeColor={colors.primary}
      >
        <Tab.Screen
          name="Home"
          component={ClientHomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarColor: colors.primaryDark,
            tabBarIcon: ({ color }) => (
              <Icon name="ios-home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Tasks"
          component={ClientTaskScreen}
          options={{
            tabBarLabel: "Tasks",
            tabBarColor: colors.primaryDark,
            tabBarIcon: ({ color }) => (
              <Icon name="ios-albums-sharp" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Inbox"
          component={ClientInboxScreen}
          options={{
            tabBarLabel: "Inbox",
            tabBarColor: colors.primaryDark,
            tabBarIcon: ({ color }) => (
              <Icon name="ios-mail" color={color} size={26} />
            ),
          }}
        />

        <Tab.Screen
          name="Search"
          component={ClientSearchScreen}
          options={{
            tabBarLabel: "Search",
            tabBarColor: colors.primaryDark,
            tabBarIcon: ({ color }) => (
              <Icon name="ios-search" color={color} size={26} />
            ),
          }}
        />

        <Tab.Screen
          name="Account"
          component={ClientAccountScreen}
          options={{
            tabBarLabel: "Account",
            tabBarColor: colors.primaryDark,
            tabBarIcon: ({ color }) => (
              <Icon name="ios-person" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
  );
};

export default MainTabScreen;

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
