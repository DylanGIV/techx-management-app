import * as React from "react";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Icon from "react-native-vector-icons/Ionicons";

import { StyleSheet, View } from "react-native";
import EmployeeHomeScreen from "./EmployeeHomeScreen";
import EmployeeInboxScreen from "./EmployeeInboxScreen";
import EmployeeSearchScreen from "./EmployeeSearchScreen";
import EmployeeAccountScreen from "./EmployeeAccountScreen";
import { useTheme } from "react-native-paper";
import EmployeeTaskScreen from "./EmployeeTaskScreen";

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
          component={EmployeeHomeScreen}
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
          component={EmployeeTaskScreen}
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
          component={EmployeeInboxScreen}
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
          component={EmployeeSearchScreen}
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
          component={EmployeeAccountScreen}
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
