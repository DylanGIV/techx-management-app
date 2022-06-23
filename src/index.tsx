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
import ClientHomeStack from './screens/Client/ClientHomeStack';

const AppStack = createStackNavigator();

export default function AppContent() {


    registerTranslation('en', en);
    const account = useSelector((state : AuthState )=> state.auth.account)
    if (account)
    {
        
    }
    // const jwt = account.jwtToken;
    // const role = account.role;
    // console.log(role)
    // console.log("role")

    return (
        <PaperProvider theme={theme as any}>
            <SafeAreaProvider>
                <NavigationContainer>
                {/* Container for our navigation */}
                    <AppStack.Navigator screenOptions={{ headerShown: false }} >
                    {/* Configuring our Stack of screens */}

                        {account.jwtToken ? (

                            (account.role == 'Admin') ?
                            <AppStack.Screen name="HomeStack" component={EmployeeHomeStack} />
                            :
                            (account.role == 'User') ?
                            <AppStack.Screen name="ClientHomeStack" component={ClientHomeStack}/>
                            :
                                null
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
