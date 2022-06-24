import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { AUTH_LOGOUT } from '../../redux/actions/types';

const ClientHomeScreen = (props : any) => {

  const dispatch = useDispatch();

    const { colors } = useTheme();

    const logout = () => {
      dispatch({ type: AUTH_LOGOUT })
    }


    
    return (
    
        <View style={styles.wrapperView}>
            <Text>
                In Client side
            </Text>
            <Button
                  color={colors.primaryDark}
                  onPress={logout}
                  mode='contained'
                >
                  Log out
                </Button> 
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapperView: {
      flex: 1,
    },

  });
    
export default ClientHomeScreen;
