import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import React from 'react';
import RegisterScreen from './RegisterScreen';
import { useTheme } from 'react-native-paper';

const Stack = createStackNavigator();

// TODO: use theme so that headerStyle does not need to be hardcoded
// const { colors } = useTheme();

function AuthStack() {

    return (
        <Stack.Navigator initialRouteName="Login"  screenOptions={{headerStyle: {backgroundColor: '#1A2433'}, headerTintColor: '#FFFFFF', }}>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerMode:'float', }}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            {/* Add additional screens here, just remember to
                import your screen using "component={}" and give it a name.
                 
                For testing purposes, you may set the initialRouteName
                to the name of your screen so that the app starts at your screen.*/}
        </Stack.Navigator>
    );
}

export default AuthStack;
