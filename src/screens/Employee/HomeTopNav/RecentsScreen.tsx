import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import ListProjects from '../../../components/projects';

const RecentsScreen = (props : any) => {

  const dispatch = useDispatch();

  const { colors } = useTheme();

  
  const styles = makeStyles(colors);
  const isFetchingCompanies = useSelector((state : any) => state.company.isFetchingCompanies);
  
  return (
      <View style={styles.container}>

          <ListProjects props={props} />

      </View>
  );
};

const makeStyles = (colors : ReactNativePaper.ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapperView: {
    flex: 1,
  },

});
    
export default RecentsScreen;
