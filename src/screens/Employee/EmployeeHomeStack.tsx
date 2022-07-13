import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import RNPickerSelect, { Item } from 'react-native-picker-select';
import { Alert, Animated, Easing, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCompanyAction, fetchCompanies, updateCompanyIdGlobalAction } from '../../redux/actions/CompanyActions';
import MainTabScreen from './EmployeeBottomTabNav/EmployeeDrawerStack';
import CreateProjectScreen from './CreateProjectScreen';
import { ActivityIndicator, IconButton, Text, useTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CreateCompanyScreen from './EmployeeCompanyScreen';
import { LoginProps } from '../../models/props/LoginProps';
import { COMPANY_SET_COMPANY, REFRESH_COMPANY, REFRESH_PROJECT } from '../../redux/actions/types';
import { refreshTokenAction } from '../../redux/actions/AuthActions';
import CreateTaskScreen from './CreateTaskScreen';
import EmployeeTaskDetailsScreen from './EmployeeTaskDetailsScreen';
import EmployeeProjectDetailsScreen from './EmployeeProjectDetailsScreen';
import { deleteCompany } from '../../api';
import { FadeInView } from '../../components/FadeInView';
import BouncingIcon from '../../components/BouncingIcon';
import { Project } from '../../models/response/ProjectResponse';
import { deleteProjectAction, updateProjectStatus } from '../../redux/actions/ProjectActions';
import { Task } from '../../models/response/TaskResponse';
import { deleteTaskAction, updateTaskStatus } from '../../redux/actions/TaskActions';

const Stack = createStackNavigator();
let companiesSelect : Item[];

function EmployeeHomeStack(props : LoginProps) {

    const updateCompanyIdGlobal = (company : any) => {
        dispatch(updateCompanyIdGlobalAction(company) as any);
    }
    const deleteCurrentCompany = () => {
        dispatch(deleteCompanyAction(currentCompany.id) as any);
    }
    const deleteCurrentProject = (projectId : number) => {
        dispatch(deleteProjectAction(projectId, props) as any);
    }
    const deleteCurrentTask = (taskId : number) => {
        dispatch(deleteTaskAction(taskId, props) as any);
    }
    const updateCurrentProjectStatus = (projectId : number, projectStatus : boolean) => {
        dispatch(updateProjectStatus(projectId, projectStatus, props) as any);
    }
    const updateCurrentTaskStatus = (task : Task, updateStatus : boolean) => {
        dispatch(updateTaskStatus(task.id, updateStatus, props) as any);
    }

    const { colors } = useTheme();

    const dispatch = useDispatch();
    const createCompanySuccess = useSelector((state: any) => state.company.createCompanySuccess);
    const refreshCompany = useSelector((state : any) => state.refresh.refreshCompany);
    const currentCompany = useSelector((state: any) => state.company.currentCompany);
    const currentProject : Project = useSelector((state: any) => state.project.currentProject);
    const currentTask : Task = useSelector((state: any) => state.task.currentTask);

    useEffect( () => {
        dispatch(fetchCompanies() as any);
        if (refreshCompany) {
            dispatch({ type: REFRESH_COMPANY, payload: false})
          }
    }, [createCompanySuccess, refreshCompany, currentProject])
    
    const isFetchingCompanies = useSelector((state : any) => state.company.isFetchingCompanies);
    const isDeletingCompany = useSelector((state : any) => state.company.isDeletingCompany);
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
            initialRouteName="EmployeeHome" 
        >
            <Stack.Screen 
                name='EmployeeHome'
                component={MainTabScreen}
                // options={{headerShown: false}}
                options={{ 
                    headerShown: true, 

                    headerLeft: () => (
                        (!companies || isFetchingCompanies || !companiesSelect || isDeletingCompany) 
                        ? 
                            // <ActivityIndicator size='small' color='black' style={{ left: 10}} /> 
                            null
                        : 
                        (companies.length == 0) 
                        ?
                            <FadeInView>
                                <Text style={{ fontSize: 18}}>
                                    Add a company!
                                </Text>
                            </FadeInView>
                        :
                            <RNPickerSelect 
                                onValueChange={(value) => updateCompanyIdGlobal(value)}
                                items={companiesSelect}
                                placeholder={{}}
                                style={pickerSelectStyles}
                                Icon={() => {
                                    return <Ionicons name="chevron-down-outline" size={24} color={colors.text} />;
                                }}
                            />
                    ),
                    headerRight: () => (
                        <View style={{flex: 1, flexDirection: 'row', bottom: 3}}>
                            {(!isFetchingCompanies && !isDeletingCompany && companies && companies.length > 0) 
                            ?
                            <FadeInView>
                                <IconButton 
                                    icon="delete-outline"
                                    color={colors.text}
                                    size={28}
                                    onPress={() => {
                                        Alert.alert("Would you like to delete this company?", "", [
                                            {
                                            text: "Yes",
                                            onPress: () => { 
                                                deleteCurrentCompany();
                                            },
                                            },
                                            {
                                            text: "No",
                                            }
                                        ])
                                    }}
                                />
                            </FadeInView>

                            : (!isFetchingCompanies && !isDeletingCompany && companies && companies.length == 0) ?
                                <FadeInView>
                                    <BouncingIcon icon='arrow-right' size={27.5} color={colors.text} />
                                </FadeInView>
                            :
                                null
                            }
                            {(!isFetchingCompanies && companies && !isDeletingCompany) ?
                            <FadeInView>
                                <IconButton 
                                    icon="domain-plus"
                                    color={colors.text}
                                    size={28}
                                    onPress={() => props.navigation.navigate('CreateCompany' as any)}
                                />
                            </FadeInView>
                            // : (!isFetchingCompanies && companies && companies.length == 0) ?
                            
                            // <FadeInView>
                            //     <IconButton 
                            //         icon="plus"
                            //         color={colors.text}
                            //         size={28}
                            //         onPress={() => props.navigation.navigate('CreateCompany' as any)}
                            //     />
                            // </FadeInView>
                            :
                                null
                            }

                        </View>
                    ),
                    
                    headerTitle: '', 
                    headerStyle: { elevation: 0, borderBottomWidth: 0 }, 
                    headerLeftContainerStyle: styles.view,
                }}
            />
            
            <Stack.Screen name="CreateProject" component={CreateProjectScreen} options={{ headerShown: true }}/>
            <Stack.Screen name="CreateTask" component={CreateTaskScreen} options={{ headerShown: true }}/>

            <Stack.Screen 
                name="TaskDetails" 
                component={EmployeeTaskDetailsScreen} 
                options={{ 
                    headerShown: true, 
                    headerTitle: '',
                    headerRight: () => (
                        <View style={{ flexDirection: 'row' }}>
                            <IconButton
                                icon={currentTask?.completed ? ('refresh') : ('check') }
                                color={colors.text}
                                size={28}
                                onPress={() => {
                                Alert.alert((!currentTask.completed ? ("Mark task as complete?") : ("Mark task as incomplete")), "", [
                                    {
                                    text: "Yes",
                                    onPress: () => { 
                                        updateCurrentTaskStatus(currentTask, !currentTask.completed)
                                    },
                                    },
                                    {
                                    text: "No",
                                    }
                                ])
                                }}
                            />
                            <IconButton
                                icon='delete-outline'
                                color={colors.text}
                                size={28}
                                onPress={() => {
                                Alert.alert("Would you like to delete this task?", "", [
                                    {
                                    text: "Yes",
                                    onPress: () => { 
                                        deleteCurrentTask(currentTask.id);
                                    },
                                    },
                                    {
                                    text: "No",
                                    }
                                ])
                                }}
                            />
                        </View>
                    )
                }}
            />
            <Stack.Screen 
                name="ProjectDetails" 
                component={EmployeeProjectDetailsScreen} 
                options={{ 
                    headerTitle: '',
                    headerShown: true,
                    headerRight: () => (
                        <View style={{ flexDirection: 'row' }}>
                            <IconButton
                                icon={currentProject?.completed ? ('refresh') : ('check') }
                                color={colors.text}
                                size={28}
                                onPress={() => {
                                    (currentProject.completed) ?
                                    Alert.alert("Mark this project as incomplete?", "", [
                                        {
                                            text: "Yes",
                                            onPress: () => { 
                                                updateCurrentProjectStatus(currentProject.id, false);
                                            },
                                        },
                                        {
                                            text: "No",
                                        }
                                    ])
                                    :
                                    Alert.alert("Mark this project as complete?", "", [
                                        {
                                            text: "Yes",
                                            onPress: () => { 
                                                updateCurrentProjectStatus(currentProject.id, true);
                                            },
                                        },
                                        {
                                            text: "No",
                                        }
                                    ])
                                }}
                            />
                            <IconButton
                                icon='delete-outline'
                                color={colors.text}
                                size={28}
                                onPress={() => {
                                Alert.alert("Would you like to delete this project and all of its tasks?", "", [
                                    {
                                    text: "Yes",
                                    onPress: () => { 
                                        deleteCurrentProject(currentProject.id);
                                    },
                                    },
                                    {
                                    text: "No",
                                    }
                                ])
                                }}
                            />
                        </View>
                    )
                }}


            />
            
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
                    icon='chevron-down' color={colors.text} size={30} />),
                                                                                
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
      borderBottomWidth: 1,
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
        padding: 9,
        top: 2
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
    },
})

export default EmployeeHomeStack;
