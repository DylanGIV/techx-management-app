import React from 'react';
import { Provider as PaperProvider, useTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import AuthStack from './screens/Auth/AuthStack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import EmployeeHomeScreen from './screens/Employee/EmployeeBottomTabNav/EmployeeHomeScreen';
import { useSelector } from 'react-redux';
import { AuthState } from './models/redux/AuthState';
import EmployeeDrawerStack from './screens/Employee/EmployeeBottomTabNav/EmployeeDrawerStack';
import { Theme } from 'react-native-paper/lib/typescript/types';
import { theme } from './global';
import EmployeeHomeStack from './screens/Employee/EmployeeHomeStack';
import {
    en,
    registerTranslation,
  } from 'react-native-paper-dates'

const AppStack = createStackNavigator();

export default function AppContent() {


    registerTranslation('en', en);
    const jwt = useSelector((state : AuthState )=> state.auth.jwt)

    return (
        <PaperProvider theme={theme as any}>
            <SafeAreaProvider>
                <NavigationContainer>
                {/* Container for our navigation */}
                    <AppStack.Navigator screenOptions={{ headerShown: false }} >
                    {/* Configuring our Stack of screens */}

                        {jwt ? (
                            <AppStack.Screen name="HomeStack" component={EmployeeHomeStack} />
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
