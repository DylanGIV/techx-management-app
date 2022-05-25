import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { Theme } from 'react-native-paper/lib/typescript/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH_LOGOUT } from '../../../redux/actions/types';

const AllScreen = () => {
    const dispatch = useDispatch();

    const { colors } = useTheme();

    const logout = () => {
      dispatch({ type: AUTH_LOGOUT })
    }
    
    const styles = makeStyles(colors);
    
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
                color={colors.primary}
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

const makeStyles = (colors : any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
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
