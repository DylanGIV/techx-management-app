import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ClientHomeScreen from './ClientHomeScreen';

const Stack = createStackNavigator();

function ClientStack() {

    return (
        <Stack.Navigator initialRouteName="Login"  >
            <Stack.Screen name="Home" component={ClientHomeScreen} options={{ headerMode:'float' }}/>
            
        </Stack.Navigator>
    );
}

export default ClientStack;
