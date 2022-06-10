import { LoginProps } from '../../models/props/LoginProps';
import React, { useState } from 'react';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Text, ActivityIndicator, TextInput, Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { AuthState } from '../../models/redux/AuthState';

const PasswordForgetScreen = (props : LoginProps) => {
    const [email, setEmail] = useState('')
    const isLoading = useSelector((state : AuthState) => state.auth.isRegistering);
    const regEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    const { colors } = useTheme();
    const styles = makeStyles(colors);

    const password_forget = async ( email : string) => {}

    return (
        <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback style={styles.touchableContainer} onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapperView}>
            <View>
                <View style={styles.inputCenter}>
                    <View>
                        <Text style={styles.text} allowFontScaling adjustsFontSizeToFit>
                            Enter the email address associated with your account
                        </Text>
                    </View>
                    <View>
                        <TextInput
                            label="Email"
                            value={email}
                            autoCorrect={false}
                            blurOnSubmit={false}
                            onChangeText={text => setEmail(text)}
                            returnKeyType="next"
                            autoCapitalize='none'
                            autoComplete={false}
                        />
                    </View>

                    <View >
                        <Button mode='contained'> Reset Password </Button>
                    </View>
                </View>
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

const makeStyles = (colors: any) => StyleSheet.create({
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

export default PasswordForgetScreen;