import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MainTabScreen from './ClientBottomTabNav/ClientDrawerStack';
import CreateProjectScreen from './CreateProjectScreen';

const Stack = createStackNavigator();

function ClientHomeStack() {

    return (
        <Stack.Navigator initialRouteName="ClientHome"  >
            <Stack.Screen 
                name='ClientHome'
                component={MainTabScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="CreateProject" component={CreateProjectScreen} options={{ headerShown: true }}/>
        </Stack.Navigator>
    );
}

export default ClientHomeStack;
