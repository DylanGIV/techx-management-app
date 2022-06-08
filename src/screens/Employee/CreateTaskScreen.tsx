import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Button, TextInput, ActivityIndicator, Menu, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { createProject } from '../../redux/actions/ProjectActions';
import RNPickerSelect, { Item } from 'react-native-picker-select';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createTask } from '../../redux/actions/TaskActions';

let projectsSelect : Item[];
let accountsSelect : Item[];

const CreateTaskScreen = () => {
  const currentCompany = useSelector((state : any) => state.company.currentCompany);

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [account, setAccount] = useState((currentCompany.length > 0 ? currentCompany.owner[0] : '' as any));
    const [project, setProject] = useState((currentCompany.length > 0 && currentCompany.projects.length > 0 ? currentCompany.projects[0] : '' as any));
    const dispatch = useDispatch();

    useEffect(() => {
    }, [])

    const { colors } = useTheme();
    const styles = makeStyles(colors);

    const ref_input2 = useRef<any>();

    const create = () => {
      Keyboard.dismiss();
      dispatch(createTask(taskTitle, taskDescription, account.id, project.id) as any);
    }

    if (currentCompany) {
      let ps : Item[] = new Array(currentCompany.projects.length);
      currentCompany.projects.forEach(function (project : any, index : number) {
          ps[index] = {
              label: project.projectName,
              value: project,
              key: project.projectName + project.id
          }
      });
      projectsSelect = ps;
  }

    if (currentCompany) {
      let as : Item[] = new Array(currentCompany.employees.length + 1);
      as[0] = {
        label: currentCompany.owner.email,
        value: currentCompany.owner,
        key: currentCompany.owner.email + currentCompany.owner.id
      }
      currentCompany.employees.forEach(function (account : any, index : number) {
          as[index] = {
              label: account.email,
              value: account,
              key: account.email + account.id
          }
      });
      accountsSelect = as;
  }

    return (
      <SafeAreaView style={styles.container}>
          <TouchableWithoutFeedback 
              style={styles.touchableContainer}
              onPress={() => Keyboard.dismiss()}
          >
              <View style={styles.inputCreateContainer}>

                <View style={styles.inputBorder} />

                <View style={styles.wrapperView}>

                    <Text style={styles.text}>
                        This Task will be under {currentCompany.companyName}
                    </Text>

                  <View style={styles.inputContainer} >

                    {(!currentCompany || !projectsSelect) 
                      ? 
                        <ActivityIndicator size='small' color='black' style={{ left: 10}} /> 
                      :
                        <View>
                          <RNPickerSelect 
                              onValueChange={(value) => setAccount(value)}
                              items={accountsSelect}
                              placeholder={{}}
                              style={pickerSelectStyles}
                              Icon={() => {
                                  return <Ionicons name="chevron-down-outline" size={24} color={colors.primary} />;
                              }}
                          />
                          <RNPickerSelect 
                              onValueChange={(value) => setProject(value)}
                              items={projectsSelect}
                              placeholder={{}}
                              style={pickerSelectStyles}
                              Icon={() => {
                                  return <Ionicons name="chevron-down-outline" size={24} color={colors.primary} />;
                              }}
                          />
                        </View>
                    }

                    <TextInput
                        style={styles.textInput}
                        label="Task Title"
                        value={taskTitle}
                        autoCorrect={false}
                        blurOnSubmit={false}
                        onChangeText={text => setTaskTitle(text)}
                        returnKeyType="next"
                        onSubmitEditing={() => ref_input2.current.focus()}
                        autoCapitalize='none'
                        autoComplete={false}
                    />
                    <TextInput
                        style={styles.textInput}
                        label="Description"
                        value={taskDescription}
                        onChangeText={text => setTaskDescription(text)}
                        onSubmitEditing={create}
                        ref={ref_input2}
                        autoComplete={false}
                    />

                    </View>


                    <View style={styles.createContainer}>
                        <Button  mode='contained' onPress={create}>
                            Create Task
                        </Button>
                    </View>

                </View>

                <View style={styles.inputBorder} />

              </View>
          </TouchableWithoutFeedback>
      </SafeAreaView>

    );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 20,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    marginHorizontal: 8,
    marginBottom: 14,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    flex: 1,

  },
  inputAndroid: {
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 8,
    marginBottom: 14,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    flex: 1
  },
});

const makeStyles = (colors : ReactNativePaper.ThemeColors) => StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapperView: {
      flex: 1,
    },
      text: {
        fontSize: 24,
        textAlign: 'center'
      },
      textInput: {
        marginHorizontal: 8,
        marginBottom: 14,
        backgroundColor: colors.secondary
      },
      inputCreateContainer: {
        flex: 0.6,
        justifyContent: 'center',
        flexDirection: 'row',
      },
      inputContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 10
      },
      inputCenter: {
        flex: 0.6,
      },
      inputBorder: {
        flex: 0.2
      },
      createContainer: {
        flex: 0.2,
        justifyContent: 'flex-end',
      },
      signupContainer: {
        flex: 0.2, 
        padding: 10, 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'flex-end',
      },
      touchableContainer: {
        flex: 1,
      },
      loadingIndicator: {
        position: 'absolute', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'white', 
        opacity: 0.5, 
        left: 0, 
        right: 0, 
        top: 0, 
        bottom: 0,
      },
  });
    
export default CreateTaskScreen;
