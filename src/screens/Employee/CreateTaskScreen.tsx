import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Button, TextInput, ActivityIndicator, Menu, useTheme, Portal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { createProject } from '../../redux/actions/ProjectActions';
import RNPickerSelect, { Item } from 'react-native-picker-select';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createTask } from '../../redux/actions/TaskActions';
import { DatePickerInput, DatePickerModal, DatePickerModalContent } from 'react-native-paper-dates';
import { Account } from '../../models/response/AccountResponse';
import { Project } from '../../models/response/ProjectResponse';
// import { DatePicker } from 'react-native-woodpicker';

let projectsSelect : Item[];
let accountsSelect : Item[];

const CreateTaskScreen = (props : any) => {
    const currentCompany = useSelector((state : any) => state.company.currentCompany);
    const isCreatingTask = useSelector((state : any) => state.task.isCreatingTask);
  
    
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [account, setAccount] = useState<Account>((currentCompany.owner ? currentCompany.owner : 'hello' as any));
    const [project, setProject] = useState<Project>((currentCompany.length > 0 && currentCompany.projects.length > 0 ? currentCompany.projects[0] : '' as any));
    const dispatch = useDispatch();

    const [date, setDate] = React.useState<Date>(undefined as any)
    const [customOpen, setCustomOpen] = React.useState(false)

    const onDismissCustom = React.useCallback(() => {
      setCustomOpen(false)
    }, [setCustomOpen])
    const onChangeSingle = React.useCallback(
      (params) => {
        setCustomOpen(false)
        setDate(params.date)
      },
      [setCustomOpen, setDate]
    )

    useEffect(() => {
    }, [])

    const { colors } = useTheme();
    const styles = makeStyles(colors);

    const ref_input2 = useRef<any>();

    const create = () => {
      Keyboard.dismiss();
      if (taskTitle && taskDescription && account && project && date && props)
        dispatch(createTask(taskTitle, taskDescription, account.id, project.id, date, props) as any);
      else
        alert("Please fill out all fields.")
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

                  <View style={styles.inputContainer} >

                    {(!currentCompany || !projectsSelect) 
                      ? 
                        <ActivityIndicator size='small' color='black' style={{ left: 10}} /> 
                      :
                        <View style={{ flex: 2}}>
                          <Text style={styles.text}>
                            Employee
                          </Text>
                          <RNPickerSelect 
                              onValueChange={(value) => setAccount(value)}
                              items={accountsSelect}
                              // placeholder={{}}
                              style={pickerSelectStyles}
                              Icon={() => {
                                  return <Ionicons name="chevron-down-outline" size={24} color={colors.primary} />;
                              }}
                          />
                          <Text style={styles.text}>
                            Project
                          </Text>
                          <RNPickerSelect 
                              onValueChange={(value) => setProject(value)}
                              items={projectsSelect}
                              style={pickerSelectStyles}
                              Icon={() => {
                                  return <Ionicons name="chevron-down-outline" size={24} color={colors.primary} />;
                              }}
                          />
                          <Button
                            onPress={() => setCustomOpen(true)}
                            uppercase={false}
                            mode="outlined"
                            style={styles.pickButton}
                          >
                            <Text style={{ color: colors.text }}>
                              {date ? (date.toDateString()) : ("Pick due date")}
                            </Text>
                          </Button>
                        </View>
                    }
                    <View style={{ flex: 0.4 }}/>

                    <View style={{ flex: 1 }}>
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


                    </View>


                    <View style={styles.createContainer}>
                        <Button  mode='contained' onPress={create}>
                            Create Task
                        </Button>
                    </View>

                    {(isCreatingTask) && (
                      <View style={styles.loadingIndicator} pointerEvents='none'>
                        <ActivityIndicator size='large' />
                      </View>
                    )}

                </View>

                <View style={styles.inputBorder} />

              </View>
          </TouchableWithoutFeedback>
          <Portal>
            {customOpen ? (
              <View style={[StyleSheet.absoluteFill, styles.customModal]}>
                <DatePickerModalContent
                  locale='en'
                  mode="single"
                  onDismiss={onDismissCustom}
                  onConfirm={onChangeSingle}
                  
                />
              </View>
            ) : null}
          </Portal>

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
        marginBottom: 14,
        marginTop: 14
      },
      textInput: {
        marginHorizontal: 8,
        marginBottom: 14,
        backgroundColor: colors.secondary
      },
      inputCreateContainer: {
        flex: 0.7,
        justifyContent: 'center',
        flexDirection: 'row',
      },
      inputContainer: {
        flex: 1,
        padding: 10,
      },
      inputCenter: {
        flex: 0.6,
      },
      inputBorder: {
        flex: 0.15
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
        backgroundColor: 'transparent', 
        opacity: 0.2, 
        left: 0, 
        right: 0, 
        top: 0, 
        bottom: 0,
      },
      pickButton: { marginTop: 6, },
      customModal: {
        // borderTopRightRadius: 20,
        // borderBottomRightRadius: 20,
        backgroundColor: '#fff',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    
        elevation: 5,
      },
  });
    
export default CreateTaskScreen;
