import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Button, TextInput, ActivityIndicator, Menu, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { createProject } from '../../redux/actions/ProjectActions';
import RNPickerSelect, { Item } from 'react-native-picker-select';
import Ionicons from 'react-native-vector-icons/Ionicons';

let projectsSelect : Item[];

const CreateTaskScreen = () => {

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
      console.log(currentCompany.companyName);
    }, [])

    const { colors } = useTheme();
    const styles = makeStyles(colors);

    const ref_input2 = useRef<any>();

    const currentCompany = useSelector((state : any) => state.company.currentCompany);
    console.log(currentCompany)


    const create = () => {
      Keyboard.dismiss();
      dispatch(createProject(currentCompany.id, taskTitle, taskDescription) as any);
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
                        <RNPickerSelect 
                            onValueChange={(value) => null}
                            items={projectsSelect}
                            placeholder={{}}
                            style={pickerSelectStyles}
                            Icon={() => {
                                return <Ionicons name="chevron-down-outline" size={24} color={colors.primary} />;
                            }}
                        />
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
                            Create Project
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
