import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Button, TextInput, ActivityIndicator, Menu } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanies } from '../../redux/actions/CompanyActions';
import { createProject } from '../../redux/actions/ProjectActions';
import RNPickerSelect from 'react-native-picker-select';

interface Item {
    label: string,
    value: string
}

const CreateProjectScreen = () => {

    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    
    useEffect( () => {
        console.log("in")
        dispatch(fetchCompanies() as any);
    }, [])

    const ref_input2 = useRef<any>();

    const dispatch = useDispatch();
    const isCreatingProject = useSelector((state : any) => state.project.isCreatingProject);
    const isFetchingCompanies = useSelector((state : any) => state.company.isFetchingCompanies);
    const companies = useSelector((state : any) => state.company.companies);

    console.log(companies);

    let companiesSelect;
    // : [{
    //     key: number,
    //     value: string
    // }]

    if (companies) {
        let cs : Item[] = new Array(companies.length);
        companies.forEach(function (companies : any, index : number) {
            cs[index] = {
                label: companies.id,
                value: companies.companyName
            }
        });
        companiesSelect = cs;
    }

    console.log(companiesSelect)

    const create = () => {
      Keyboard.dismiss();
      dispatch(createProject(companies.companyId, projectName, projectDescription) as any);
    }

    if (isFetchingCompanies) {
        return (
        <View style={styles.loadingIndicator}>
            <ActivityIndicator size='large' />
        </View>
        )
    } else {
        return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback 
                style={styles.touchableContainer}
                onPress={() => Keyboard.dismiss()}
            >
                <View style={styles.wrapperView}>

                    <View style={styles.inputBorder} />

                    <View style={styles.wrapperView}>
                        <Text>
                            Fill out the following form
                        </Text>
                    <View style={styles.inputContainer} >
                        {(!companies) ? <ActivityIndicator size='large'/> :
                        // <select>
                        //     {companies.map(list => (
                        //         <option key={list.id} value={list.companyName}
                        //         >
                        //             <Text>
                        //                 {list.companyName}
                        //             </Text>
                        //         </option>
                        //     ))}
                        // </select>
                            <RNPickerSelect 
                                onValueChange={(value) => console.log(value)}
                                items={companiesSelect}
                            />
                        }

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

                        <View style={styles.inputBorder} />

                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>

        );
    }
};

const styles = StyleSheet.create({
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
        marginBottom: 14
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
