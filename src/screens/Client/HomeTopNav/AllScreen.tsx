import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { AUTH_LOGOUT } from '../../../redux/actions/types';

const AllScreen = () => {

    const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: AUTH_LOGOUT })
  }


    return (
      <SafeAreaView style={styles.container}>
          <View style={styles.wrapperView}>
            <View style={styles.wrapperView}>
              <Text>
                Good morning! All here.
              </Text>
              <View style={styles.wrapperView}>
            <View style={styles.wrapperView}>
              <Text>
                Good morning! Welcome.
              </Text>
            </View>
            

            <View style={styles.logoutContainer}>
              <Button
                onPress={logout}
                mode='contained'
              >
                Log out
              </Button> 
            </View>

          </View>
            </View>
          </View>
      </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapperView: {
      flex: 1,
    },
    logoutContainer: {
        flex: 0.1,
        alignSelf: 'center',
      },

  });

export default AllScreen;
