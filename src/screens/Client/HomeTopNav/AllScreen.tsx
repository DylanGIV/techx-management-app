import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { Theme } from 'react-native-paper/lib/typescript/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { LoginProps } from '../../../models/props/LoginProps';
import { AUTH_LOGOUT } from '../../../redux/actions/types';

const AllScreen = (props : LoginProps) => {
    const dispatch = useDispatch();

    const { colors } = useTheme();

    const logout = () => {
      dispatch({ type: AUTH_LOGOUT })
    }
    const createProject = () => {
      dispatch
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
            <View style={styles.createProjectContainer} >
              <Button 
                onPress={() => props.navigation.navigate('CreateProject' as any)}
                mode='contained'
                color={colors.primaryDark}
              >
                Create a new Project
              </Button>
            </View>
            

            <View style={styles.logoutContainer}>
              <Button
                color={colors.primaryDark}
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
    flexGrow: 1
  },
  wrapperView: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: colors.primary
  },
  logoutContainer: {
      flex: 0.2,
      flexGrow: 0.2,
      alignSelf: 'center',
    },
  createProjectContainer: {
      flex: 0.2,
      flexGrow: 0.2,
      alignSelf: 'center',
    },

});


export default AllScreen;
