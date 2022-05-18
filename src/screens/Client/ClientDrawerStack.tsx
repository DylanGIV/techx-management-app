import * as React from "react";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";

import { StyleSheet, View } from "react-native";
import ClientHomeScreen from "./ClientHomeScreen";
import ClientInboxScreen from "./ClientInboxScreen";
import ClientSearchScreen from "./ClientSearchScreen";
import ClientAccountScreen from "./ClientAccountScreen";

const HomeStack = createStackNavigator();

const DetailsStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
//   const theme = useSelector((state) => state.theme.theme);

  return (
    <Tab.Navigator initialRouteName="Home" activeColor="#fff">
      <Tab.Screen
        name="Home"
        component={ClientHomeScreen}
        options={{
          tabBarLabel: "Home",
        //   tabBarColor: theme.colors.primary,
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={ClientInboxScreen}
        options={{
          tabBarLabel: "Inbox",
        //   tabBarColor: theme.colors.primary,
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
        //   tabBarColor: theme.colors.primary,
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
        //   tabBarColor: theme.colors.primary,
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabScreen;

// const HomeStackScreen = () => (
//   <HomeStack.Navigator
//     screenOptions={{
//       headerStyle: {
//         backgroundColor: "#009387",
//       },
//       headerTintColor: "#fff",
//       headerTitleStyle: {
//         fontWeight: "bold",
//       },
//     }}
//   >
//     <HomeStack.Screen
//       name="ClientHome"
//       component={ClientHomeScreen}
//       options={{
//         title: "TechX Management",
//         headerTitleAlign: "center",
//         headerShown: false
//       }}
//     />

//     {/* <HomeStack.Screen
//       name="RestaurantDetails"
//       component={RestaurantDetailsScreen}
//       options={{ headerShown: true, headerStyle: { alignItems: "center" } }}
//       options={({ route }) => ({ title: route.params.name })}
//     /> */}
//     {/* <HomeStack.Screen name="EditProfileScreen" component={EditProfileScreen} /> */}

//     {/* <HomeStack.Screen
//       name="Settings"
//       component={SettingsScreen}
//       options={{ headerShown: true, headerStyle: { alignItems: "center" } }}
//       options={({ route }) => ({ title: route.params.name })}
//     /> */}

//     {/* <HomeStack.Screen
//       name="FavoriteRestaurants"
//       component={FavoriteRestaurantsScreen}
//       options={{ headerShown: true }}
//     /> */}
//     {/* why is this not working? not showing the header*/}
//   </HomeStack.Navigator>
// );

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
  },
});
