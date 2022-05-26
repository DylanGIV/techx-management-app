import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Button, ActivityIndicator, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { createCompany } from '../../redux/actions/CompanyActions';

const CreateCompanyScreen = () => {
    const [companyName, setCompanyName] = useState('');

    const dispatch = useDispatch();

    const { colors } = useTheme();
    const styles = makeStyles(colors);

    const create = () => {
        Keyboard.dismiss();
        dispatch(createCompany(companyName) as any);
    }
    
    const isCreatingCompany = useSelector((state : any) => state.company.isCreatingCompany);

    if (isCreatingCompany) {
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
                <View style={styles.inputCreateContainer}>

                    <View style={styles.inputBorder} />

                    <View style={styles.wrapperView}>
                        
                        <View style={{flex: 0.3}}>
                            <Text style={styles.text} >
                                This company will be owned by you
                            </Text>
                        </View>

                        <View style={styles.inputContainer} >

                            

                            <TextInput
                                style={styles.textInput}
                                label="Company Name"
                                value={companyName}
                                autoCorrect={false}
                                blurOnSubmit={false}
                                onChangeText={text => setCompanyName(text)}
                                returnKeyType="next"
                                onSubmitEditing={create}
                                autoCapitalize='none'
                                autoComplete={false}
                            />

                        </View>


                        <View style={styles.createContainer}>
                            <Button  mode='contained' onPress={create}>
                                Create Company
                            </Button>
                        </View>

                        <View style={styles.inputBorder} />

                    </View>

                    <View style={styles.inputBorder} />

                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )};
};

const makeStyles = (colors : ReactNativePaper.ThemeColors) => StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapperView: {
      flex: 1,
    },
      text: {
        fontSize: 18,
        textAlign: 'center',
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
        flex: 0.5,
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
    
export default CreateCompanyScreen;
