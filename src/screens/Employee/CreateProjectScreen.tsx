import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Button, TextInput, ActivityIndicator, Menu, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { createProject } from '../../redux/actions/ProjectActions';

const CreateProjectScreen = (props : any) => {

    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
      
    }, [])

    const { colors } = useTheme();
    const styles = makeStyles(colors);

    const ref_input2 = useRef<any>();

    const currentCompany = useSelector((state : any) => state.company.currentCompany);

    const create = () => {
      Keyboard.dismiss();
      dispatch(createProject(currentCompany.id, projectName, projectDescription, props) as any);
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

                  <View style={{flex: 0.3}}>
                    <Text style={styles.text}>
                        This Project will be under {currentCompany.companyName}
                    </Text>
                  </View>

                  <View style={styles.inputContainer} >

                    <TextInput
                        style={styles.textInput}
                        label="Project Name"
                        value={projectName}
                        autoCorrect={false}
                        blurOnSubmit={false}
                        onChangeText={text => setProjectName(text)}
                        returnKeyType="next"
                        onSubmitEditing={() => ref_input2.current.focus()}
                        autoCapitalize='words'
                        autoComplete={false}
                        activeOutlineColor={colors.text}
                        mode='outlined'
                        dense
                    />
                    <TextInput
                        style={styles.textInput}
                        label="Description"
                        value={projectDescription}
                        onChangeText={text => setProjectDescription(text)}
                        onSubmitEditing={create}
                        ref={ref_input2}
                        autoComplete={false}
                        mode='outlined'
                        activeOutlineColor={colors.text}

                    />

                    </View>


                    <View style={styles.createContainer}>
                        <Button  mode='contained' onPress={create} color={colors.button}>
                            Create Project
                        </Button>
                    </View>

                    <View style={styles.bottomBorder}/>

                </View>

                <View style={styles.inputBorder} />

              </View>
          </TouchableWithoutFeedback>
      </SafeAreaView>

    );
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
        textAlign: 'center',
      },
      textInput: {
        marginHorizontal: 8,
        marginBottom: 14,
        backgroundColor: colors.textInput
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
      bottomBorder: {
        flex: 0.4,
      }
  });
    
export default CreateProjectScreen;
