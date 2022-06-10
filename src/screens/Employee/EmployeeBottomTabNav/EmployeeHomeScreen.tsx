import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Button, FAB, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH_LOGOUT } from '../../../redux/actions/types';
import MyTabs from '../HomeTopNav/EmployeeTopTabNavigator';

const EmployeeHomeScreen = ({ navigation } : any ) => {

  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: AUTH_LOGOUT })
  }
  const { colors } = useTheme();
  const isFetchingCompanies = useSelector((state : any) => state.company.isFetchingCompanies);
  const companies = useSelector((state : any) => state.company.companies);

    return (
      <View style={styles.container}>

        <MyTabs />
        
        <FAB
          style={{
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
              shadowRadius: 3
          }}
          icon="plus"
          onPress={() => {
              // randomize();
              // toggleOverlay();
              navigation.navigate('CreateProject');
          }}
          disabled={isFetchingCompanies && companies}
          color={colors.background}
        />
      </View>
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
export default EmployeeHomeScreen;