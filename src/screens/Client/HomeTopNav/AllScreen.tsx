import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import ListProjects from '../../../components/projects';
import { LoginProps } from '../../../models/props/LoginProps';
import { AUTH_LOGOUT } from '../../../redux/actions/types';

const AllScreen = (props : LoginProps) => {
    const dispatch = useDispatch();

    const { colors } = useTheme();

    
    const styles = makeStyles(colors);
    const isFetchingCompanies = useSelector((state : any) => state.company.isFetchingCompanies);
    
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.wrapperView}>

          <View style={styles.wrapperView}>
            
              <View style={styles.wrapperView}>
                <Text>
                  Good morning! All here.
                </Text>

                <Text>
                  Good morning! Welcome.
                </Text>
              </View>

              <View style={styles.projectsListContainer}>
                <ListProjects />
              </View>
            
          </View>

        </View>
      </SafeAreaView>

    );
};

const makeStyles = (colors : ReactNativePaper.ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1
  },
  wrapperView: {
    flex: 1,
    flexGrow: 1,
  },
  createProjectContainer: {
      flex: 0.2,
      flexGrow: 0.2,
      alignSelf: 'center',
    },
  projectsListContainer: {
    flex: 1,
    flexGrow: 1
  }

});


export default AllScreen;
