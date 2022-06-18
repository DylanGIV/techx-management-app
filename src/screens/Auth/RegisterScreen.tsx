import React, { MutableRefObject, useRef, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, TextInput, Button, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { AuthState } from '../../models/redux/AuthState';
import { registerAccount } from '../../redux/actions/AuthActions';
import { StackScreenProps } from '@react-navigation/stack';
import { LoginProps } from '../../models/props/LoginProps';

const RegisterScreen = (props : LoginProps) => {

    // const [firstName, setFirstName] = useState('')
    const [company, setCompany] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [acceptTerms, setAcceptTerms] = useState(false)
    const dispatch = useDispatch()

    // const theme = useSelector(state => state.theme.theme)
    const isLoading = useSelector((state : AuthState) => state.auth.isRegistering);

    const ref_input2 = useRef<any>();
    const ref_input3 = useRef<any>();
    const ref_input4 = useRef<any>();
    const ref_input5 = useRef<any>();
    const ref_input6 = useRef<any>();
    const regEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const register = async (company : string, firstName : string, lastName : string, email : string, password : string, confirmPassword : string, acceptTerms : Boolean) => {

        if (regEmail.test(email) === false) {
            alert('Not a valid Email Address')
            return
        }
        if (regPassword.test(password) === false) {
            alert('Password must be at least 8 characters and must contain a special character, a number, a lowercase, and an uppercase')
            return
        }
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return
        }
        acceptTerms = true;
        dispatch(registerAccount(company, firstName, lastName, email, password, confirmPassword, acceptTerms) as any);
        
    }

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback 
          style={styles.touchableContainer}
          onPress={() => Keyboard.dismiss()}
        >
          <View style={styles.wrapperView}>

            <View style={styles.inputLoginContainer}>
              
              <View style={styles.inputBorder} />
              
              <View style={styles.wrapperView}>

                <View style={styles.infoTextWrapper}>

                  <Text 
                    style={styles.text} 
                    allowFontScaling
                    adjustsFontSizeToFit
                  >
                    Please enter the following information
                  </Text>

                </View>

                <View style={styles.inputContainer} >
                  <TextInput
                    style={styles.textInput}
                    label="Company"
                    value={company}
                    autoCorrect={false}
                    blurOnSubmit={false}
                    onChangeText={text => setCompany(text)}
                    returnKeyType="next"
                    onSubmitEditing={() => ref_input2.current.focus()}
                    autoCapitalize='sentences'
                    autoComplete={false}
                  />

                </View>

                <View style={styles.nameInputContainer}>

                  <View style={styles.individualNameContainer}>
                    <TextInput
                      style={styles.textInput}
                      label="First Name"
                      value={firstName}
                      autoCorrect={false}
                      blurOnSubmit={false}
                      onChangeText={text => setFirstName(text)}
                      returnKeyType="next"
                      onSubmitEditing={() => ref_input3.current.focus()}
                      ref={ref_input2}
                      autoCapitalize='words'
                      autoComplete={false}
                    />
                  </View>

                  <View style={styles.individualNameContainer}>

                    <TextInput
                      style={styles.textInput}
                      label="Last Name"
                      value={lastName}
                      autoCorrect={false}
                      blurOnSubmit={false}
                      onChangeText={text => setLastName(text)}
                      returnKeyType="next"
                      onSubmitEditing={() => ref_input4.current.focus()}
                      ref={ref_input3}
                      autoCapitalize='words'
                      autoComplete={false}
                    />

                  </View>
                </View>

                <View style={styles.inputContainer} >

                  <TextInput
                    style={styles.textInput}
                    label="Email"
                    value={email}
                    autoCorrect={false}
                    blurOnSubmit={false}
                    onChangeText={text => setEmail(text)}
                    returnKeyType="next"
                    onSubmitEditing={() => ref_input5.current.focus()}
                    ref={ref_input4}
                    autoCapitalize='none'
                    autoComplete={false}
                  />

                </View>

                <View style={styles.inputContainer} >

                  <TextInput
                    style={styles.textInput}
                    label="Password"
                    value={password}
                    secureTextEntry
                    onChangeText={text => setPassword(text)}
                    onSubmitEditing={() => ref_input6.current.focus()}
                    ref={ref_input5}
                    autoComplete={false}
                  />
                </View>

                <View style={styles.inputContainer} >

                  <TextInput
                    style={styles.textInput}
                    label="Confirm Password"
                    value={confirmPassword}
                    secureTextEntry
                    onChangeText={text => setConfirmPassword(text)}
                    onSubmitEditing={() => register( company, firstName, lastName, email, password, confirmPassword, acceptTerms )}
                    ref={ref_input6}
                    autoComplete={false}
                  />
                    
                </View>

                <View style={styles.registerContainer}>
                  <Button  
                    mode='contained' 
                    onPress={() => register( company, firstName, lastName, email, password, confirmPassword, acceptTerms )}
                  >
                    Register
                  </Button>
                </View>

              </View>



              <View style={styles.inputBorder} />

            </View>

          </View>
        </TouchableWithoutFeedback>
        
        {isLoading &&
          <View style={styles.loadingIndicator}>
              <ActivityIndicator size='large' />
          </View>
        }

      </View>

    );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    color: '#7ED957'
  },
  textInput: {
    marginHorizontal: 8,
    marginBottom: 14,
    backgroundColor: '#FFFFFF',
  },
  inputLoginContainer: {
    flex: 0.95,
    justifyContent: 'center',
    flexDirection: 'row',
    color: '#7ED957',
  },
  inputContainer: {
    flex: 0.166,
    color: '#7ED957',
  },
  inputCenter: {
    flex: 0.8,
    color: '#7ED957',
  },
  inputBorder: {
    flex: 0.1
  },
  registerContainer: {
    flex: 0.0833,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#8A95A6',
  },
  touchableContainer: {
    flex: 1,
    backgroundColor: '#8A95A6',
  },
  wrapperView: {
    flex: 1,
    backgroundColor: '#8A95A6',
  },
  nameInputContainer: {
    flex: 0.166,
    flexDirection: 'row',
    flexGrow: 0.166,
    color: 'black',
  },
  individualNameContainer: {
    flex: 1,
    backgroundColor: '#8A95A6',
  },
  loadingIndicator: {
    position: 'absolute', 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'black', 
    opacity: 0.5, 
    left: 0, 
    right: 0, 
    top: 0, 
    bottom: 0,
  },
  infoTextWrapper: {
    flex: 0.166,
  }

});  

export default RegisterScreen;
