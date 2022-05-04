import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import React from 'react';
import RegisterScreen from './RegisterScreen';

const Stack = createStackNavigator();

function AuthStack() {

    return (
        <Stack.Navigator initialRouteName="Login"  >
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerMode:'float' }}/>
            <Stack.Screen name="Register" component={RegisterScreen} />
            {/* Add additional screens here, just remember to
                import your screen using "component={}" and give it a name.
                 
                For testing purposes, you may set the initialRouteName
                to the name of your screen so that the app starts at your screen.*/}
        </Stack.Navigator>
    );
}

export default AuthStack;
