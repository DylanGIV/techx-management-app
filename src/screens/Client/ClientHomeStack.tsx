import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import RNPickerSelect, { Item } from 'react-native-picker-select';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanies } from '../../redux/actions/CompanyActions';
import MainTabScreen from './ClientBottomTabNav/ClientDrawerStack';
import CreateProjectScreen from './CreateProjectScreen';
import { ActivityIndicator, IconButton, Text, useTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CreateCompanyScreen from './CreateCompanyScreen';
import { LoginProps } from '../../models/props/LoginProps';
import { COMPANY_SET_COMPANY } from '../../redux/actions/types';
import { refreshTokenAction } from '../../redux/actions/AuthActions';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createStackNavigator();
let companiesSelect : Item[];

function ClientHomeStack(props : LoginProps) {

    const updateCompanyIdGlobal = (company : any) => {
        dispatch({ type: COMPANY_SET_COMPANY, payload: company });
    }
    const refreshToken = () => {
        dispatch(refreshTokenAction() as any);
    }

    // Call refreshToken to get a new JWT, as the old one expires.
    // useEffect( () => {
    //     refreshToken();
    // }, [])

    const { colors } = useTheme();

    const dispatch = useDispatch();
    const createCompanySuccess = useSelector((state: any) => state.company.createCompanySuccess);
    const isRefreshingToken = useSelector((state : any) => state.auth.isRefreshingToken);

    useEffect( () => {
        dispatch(fetchCompanies() as any);
    }, [createCompanySuccess, isRefreshingToken])

    
    
    const isFetchingCompanies = useSelector((state : any) => state.company.isFetchingCompanies);
    const companies = useSelector((state : any) => state.company.companies);

   
    
    // this will populate companiesSelect with companies following
    // object Item as an array.
    if (companies) {
        let cs : Item[] = new Array(companies.length);
        companies.forEach(function (company : any, index : number) {
            cs[index] = {
                label: company.companyName,
                value: company,
                key: company.companyName + company.id
            }
        });
        companiesSelect = cs;
    }

    return (
        <Stack.Navigator 
            initialRouteName="ClientHome" 
        >
            <Stack.Screen 
                name='ClientHome'
                component={MainTabScreen}
                options={{ 
                    headerShown: true, 

                    headerLeft: () => (
                        (!companies || isFetchingCompanies || !companiesSelect) 
                        ? 
                            <ActivityIndicator size='small' color='black' style={{ left: 10}} /> 
                        :
                            <RNPickerSelect 
                                onValueChange={(value) => updateCompanyIdGlobal(value)}
                                items={companiesSelect}
                                placeholder={{}}
                                style={pickerSelectStyles}
                                Icon={() => {
                                    return <Ionicons name="chevron-down-outline" size={24} color={colors.primary} />;
                                }}
                            />
                    ),
                    headerRight: () => (
                        <IconButton 
                            icon="plus"
                            color={colors.primary}
                            size={28}
                            onPress={() => props.navigation.navigate('CreateCompany' as any)}
                        />
                    ),
                    
                    headerTitle: '', 
                    headerStyle: { elevation: 0, borderBottomWidth: 0 }, 
                    headerLeftContainerStyle: styles.view,
                }}
            />
            
            <Stack.Screen name="CreateProject" component={CreateProjectScreen} options={{ headerShown: true }}/>
            
            <Stack.Screen 
                name="CreateCompany" 
                component={CreateCompanyScreen} 
                options={{ 
                    headerShown: true,
                    headerLeft: () => 
                        <View style={styles.view}>
                            <Text allowFontScaling style={{fontSize: 18}}>
                                Create Company
                            </Text>
                        </View>
                    ,
                    headerRight: () => 
                    (<IconButton onPress={() => props.navigation.goBack()} 
                    icon='chevron-down' color={'#007aff'} size={30} />),
                                                                                
                    gestureDirection: 'vertical',
                                                                                
                    cardStyleInterpolator: ({ current, layouts }) => {
                        return {
                            cardStyle: {
                                transform: [                                              
                                    {
                                        translateY: current.progress.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [layouts.screen.height, 0],
                                    }),
                                    },
                                ],
                                },
                            };
                            },
                    headerTitle: '', 
                    headerStyle: { elevation: 0, borderBottomWidth: 0 }, 
                }}


            />
        </Stack.Navigator>
    );
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 20,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 0.5,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      left: 5,
      paddingRight: 30, // to ensure the text is never behind the icon
      flex: 1,

    },
    inputAndroid: {
      fontSize: 20,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
      flex: 1
    },
  });

const styles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 9
    },
    innerView: {
        flex: 1,
        flexDirection: 'row',
    },
    iconView: {
        flex: 1,
    },
    pickerView: {
        flex: 1,
    }
})

export default ClientHomeStack;
