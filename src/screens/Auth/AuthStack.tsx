import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import React from 'react';
import { Image } from 'react-native';
import RegisterScreen from './RegisterScreen';
import { useTheme } from 'react-native-paper';


// import HeaderLogo from '../../components/headerLogo';
function LogoTitle() {
    return (
      <Image
        style={{ width: 100, height: 35 }}
        source={require('../../global/images/logo.png')}
      />
    );
};

const Stack = createStackNavigator();

// TODO: use theme so that headerStyle does not need to be hardcoded
// const { colors } = useTheme();

function AuthStack() {

    return (
        <Stack.Navigator initialRouteName="Login"  screenOptions={defaultOptions}>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerMode:'float', headerTitle: (props) => <LogoTitle {...props} />, }}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            {/* Add additional screens here, just remember to
                import your screen using "component={}" and give it a name.
                 
                For testing purposes, you may set the initialRouteName
                to the name of your screen so that the app starts at your screen.*/}
        </Stack.Navigator>
    );
};

// Options
const defaultOptions = {
    headerStyle: {
        backgroundColor: '#1A2433'
    },
    headerTintColor: '#FFFFFF',
};

export default AuthStack;
