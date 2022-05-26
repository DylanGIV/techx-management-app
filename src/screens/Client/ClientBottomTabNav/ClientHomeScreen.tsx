import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH_LOGOUT } from '../../../redux/actions/types';
import MyTabs from '.././HomeTopNav/ClientTopTabNavigator';

const ClientHomeScreen = () => {

  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: AUTH_LOGOUT })
  }

    return (
      <SafeAreaView style={styles.container}>
        <MyTabs />
          
      </SafeAreaView>

    );
};

// A style sheet is used to move styling out of the body of JSX
// and also if we will be using the same styling on many components.

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapperView: {
      flex: 1,
    },
    

  });  

// We export this screen to be able to import it in other
// files, such as index.tsx, to be able to reference this
export default ClientHomeScreen;