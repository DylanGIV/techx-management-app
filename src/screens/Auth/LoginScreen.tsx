import React, { MutableRefObject, useRef, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, TextInput, Button, ActivityIndicator, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { AuthState } from '../../models/redux/AuthState';
import { loginWithEmailAndPassword } from '../../redux/actions/AuthActions';
import { StackScreenProps } from '@react-navigation/stack';
import { LoginProps } from '../../models/props/LoginProps';

const LoginScreen = (props : LoginProps) => {

    // State allows us to create variables that will re render
    // the page when they are updated.

    // In the case of "email", use email definition when
    // you want to use the value, and use setEmail to change
    // the value of email.

    // Example:
    // setEmail("Joseph4512@gmail.com")
    // <Text> {email} </Text>

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Creating a reference variable for our TextInput
    const ref_input2 = useRef<any>();

    const dispatch = useDispatch();
    const isLoading = useSelector((state : AuthState) => state.auth.isLoggingIn);
    // const theme = useSelector((state : ThemeState) => state.theme.theme)

    const login = () => {
      Keyboard.dismiss();
      dispatch(loginWithEmailAndPassword(email, password) as any);
    }



    const { colors } = useTheme();
    const styles = makeStyles(colors);

    // This return may only return one element.
    // By using "View" we are returning only that one view,
    // but that view contains all of our other components
    return (
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback 
          style={styles.touchableContainer}
          onPress={() => Keyboard.dismiss()}
        >
          <View style={styles.wrapperView}>

            {/* You may continue to add styling to this page by
                editing the styles of components and adding more
                views to create spacing. */}


            <View style={styles.inputLoginContainer}>
              
              <View style={styles.inputBorder} />
              
              <View style={styles.inputCenter}>

                <Text 
                  style={styles.text} 
                  allowFontScaling
                  adjustsFontSizeToFit
                >
                  Please enter your email and password
                </Text>

                <View style={styles.inputContainer} >

                  <TextInput
                    style={styles.textInput}
                    label="Email"
                    value={email}
                    autoCorrect={false}
                    blurOnSubmit={false}
                    onChangeText={text => setEmail(text)}
                    returnKeyType="next"
                    onSubmitEditing={() => ref_input2.current.focus()}
                    autoCapitalize='none'
                    autoComplete={false}
                  />
                  <TextInput
                    style={styles.textInput}
                    label="Password"
                    value={password}
                    secureTextEntry
                    onChangeText={text => setPassword(text)}
                    onSubmitEditing={login}
                    ref={ref_input2}
                    autoComplete={false}
                  />

                </View>


                <View style={styles.loginContainer}>
                  <Button  mode='contained' onPress={login} style={styles.loginContainerButton}>
                    Log in
                  </Button>
                </View>

                <View>
                  <Button onPress={() => props.navigation.navigate('Forgot Password?' as any)}>
                      Forgot Password?
                  </Button>
                </View>

              </View>

              <View style={styles.inputBorder} />

            </View>

            <View style={styles.signupContainer}>
              <Button onPress={() => props.navigation.navigate('Register' as any)} style={styles.signupContainerButton}>
                <Text style={styles.signupContainerText}>Register</Text>
              </Button>
            </View>

          </View>

        </TouchableWithoutFeedback>

        {isLoading &&
          <View style={styles.loadingIndicator}>
              <ActivityIndicator size='large' />
          </View>
        }

      </SafeAreaView>

    );
};

// A style sheet is used to move styling out of the body of JSX
// and also if we will be using the same styling on many components.

const makeStyles = (colors: any) => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    text: {
      fontSize: 24,
      textAlign: 'center',
      color: colors.primary,
    },
    textInput: {
      marginHorizontal: 8,
      marginBottom: 14,
      borderRadius: 10,
    },
    inputLoginContainer: {
      flex: 0.6,
      justifyContent: 'center',
      flexDirection: 'row',
    },
    inputContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      borderRadius: 25,
    },
    inputCenter: {
      flex: 0.6,
    },
    inputBorder: {
      flex: 0.2
    },
    loginContainer: {
      flex: 0.2,
      justifyContent: 'flex-end',
    },
    loginContainerButton: {
      backgroundColor: colors.primary,
    },
    signupContainer: {
      flex: 0.2, 
      padding: 10, 
      flexDirection: 'row', 
      justifyContent: 'flex-start', 
      alignItems: 'flex-end',
    },
    signupContainerButton: {
      backgroundColor: colors.primary,
    },
    signupContainerText: {
      color: colors.primaryDark,
    },
    touchableContainer: {
      flex: 1,
    },
    wrapperView: {
      flex: 1,
    },
    loadingIndicator: {
      position: 'absolute', 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: colors.primaryDark,
      opacity: 0.5, 
      left: 0, 
      right: 0, 
      top: 0, 
      bottom: 0,
    },

  });  

// We export this screen to be able to import it in other
// files, such as index.tsx, to be able to reference this
export default LoginScreen;
