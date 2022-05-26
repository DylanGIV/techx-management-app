import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Button, TextInput, ActivityIndicator, Menu, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanies } from '../../redux/actions/CompanyActions';
import { createProject } from '../../redux/actions/ProjectActions';
import RNPickerSelect, { Item } from 'react-native-picker-select';

const CreateProjectScreen = () => {

    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const dispatch = useDispatch();

    const { colors } = useTheme();
    const styles = makeStyles(colors);
    
    // useEffect( () => {
    //     dispatch(fetchCompanies() as any);
    // }, [])

    const ref_input2 = useRef<any>();

    // const isCreatingProject = useSelector((state : any) => state.project.isCreatingProject);
    // const isFetchingCompanies = useSelector((state : any) => state.company.isFetchingCompanies);
    // const companies = useSelector((state : any) => state.company.companies);
    const currentCompany = useSelector((state : any) => state.company.currentCompany);
    console.log(currentCompany.companyName);


    // let companiesSelect;

    // if (companies) {
    //     let cs : Item[] = new Array(companies.length);
    //     companies.forEach(function (companies : any, index : number) {
    //         cs[index] = {
    //             label: companies.companyName,
    //             value: companies.companyName + companies.id,
    //             key: companies.companyName + companies.id
    //         }
    //     });
    //     companiesSelect = cs;
    // }

    const create = () => {
      Keyboard.dismiss();
      dispatch(createProject(currentCompany.id, projectName, projectDescription) as any);
    }

    // if (isFetchingCompanies) {
    //     return (
    //     <View style={styles.loadingIndicator}>
    //         <ActivityIndicator size='large' />
    //     </View>
    //     )
    // } else {
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
                          This Project will be under {currentCompany.companyName}
                      </Text>

                    <View style={styles.inputContainer} >

                    {/* <View style={styles.wrapperView}>

                      {(!companies) ? <ActivityIndicator size='large'/> :
                          <RNPickerSelect 
                              onValueChange={(value) => console.log(value)}
                              items={companiesSelect as Item[]}
                          />
                      }

                    </View> */}

                      <TextInput
                          style={styles.textInput}
                          label="Project Name"
                          value={projectName}
                          autoCorrect={false}
                          blurOnSubmit={false}
                          onChangeText={text => setProjectName(text)}
                          returnKeyType="next"
                          onSubmitEditing={() => ref_input2.current.focus()}
                          autoCapitalize='none'
                          autoComplete={false}
                      />
                      <TextInput
                          style={styles.textInput}
                          label="Description"
                          value={projectDescription}
                          secureTextEntry
                          onChangeText={text => setProjectDescription(text)}
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
    // }
};

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
    
export default CreateProjectScreen;
