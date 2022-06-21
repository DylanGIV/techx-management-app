import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Button, FAB, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import ListTasks from '../../../components/tasks';

const EmployeeTaskScreen = (props : any) => {

  const { colors } = useTheme();

  
  const isFetchingCompanies = useSelector((state : any) => state.company.isFetchingCompanies);
  const companies = useSelector((state : any) => state.company.companies);
  const currentCompany = useSelector((state : any) => state.company.currentCompany);
  
  const styles = makeStyles(colors, currentCompany);

  return (
    <View style={styles.wrapperView}>
      <ListTasks props={props} />
      <FAB
        style={styles.fabStyle}
        icon="plus"
        onPress={() => {
            props.navigation.navigate('CreateTask');
        }}
        disabled={isFetchingCompanies || !companies || !currentCompany}
        color={colors.background}
      />
    </View>
  );
};

const makeStyles = (colors : ReactNativePaper.ThemeColors, currentCompany : any) => StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapperView: {
      flex: 1,
    },
    fabStyle: {
      position: "absolute",
      bottom: 0,
      right: 0,
      margin: 16,
      backgroundColor: colors.primary,
      shadowColor: colors.primaryDark,
      shadowOffset: {
        width: 1,
        height: 3
      },
      shadowOpacity: 5,
      shadowRadius: 3,
      opacity: (currentCompany) ? 1 : 0.3
  }

  });  

export default EmployeeTaskScreen;
