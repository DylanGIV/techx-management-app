import { LoginProps } from '../../models/props/LoginProps';
import React, { MutableRefObject, useRef, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, TextInput, Button, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthState } from '../../models/redux/AuthState';
import { passwordReset, registerAccount } from '../../redux/actions/AuthActions';


// remake screen, got reset switched with forgetting first...
const PasswordResetScreen = (props : LoginProps) => {
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()
    const regEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    const password_reset = async (email: string) => {
        dispatch(passwordReset(email) as any);
    }
};

const styles = StyleSheet.create({

});

export default PasswordResetScreen;