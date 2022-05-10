import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import AuthStack from './screens/Auth/AuthStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import ClientHomeScreen from './screens/Client/ClientHomeScreen';
import { useSelector } from 'react-redux';
import { AuthState } from './models/redux/AuthState';

const AppStack = createStackNavigator();

export default function AppContent() {


    const jwt = useSelector((state : AuthState )=> state.auth.jwt)
    
    return (
        <PaperProvider>
            <SafeAreaProvider>
                <NavigationContainer>
                {/* Container for our navigation */}
                    <AppStack.Navigator screenOptions={{ headerShown: false }} >
                    {/* Configuring our Stack of screens */}

                        {jwt ? (
                            <AppStack.Screen name="HomeStack" component={ClientHomeScreen} />
                            ) : (
                            <AppStack.Screen name="AuthStack" component={AuthStack} />
                        )}
                        {/* Additional Stacks will go here */}
                    </AppStack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </PaperProvider>
        );
}
