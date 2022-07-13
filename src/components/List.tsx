import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  Keyboard,
  Alert,
  Pressable,
} from "react-native";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { SectionData } from "../models/search/SectionData";
import { updateCompanyIdGlobalAction } from "../redux/actions/CompanyActions";
import { REFRESH_COMPANY } from "../redux/actions/types";

interface ItemFilter {
    name: string;
    details: string;
}

const Item = ({ name, details } : ItemFilter) => (
    <View style={styles.item}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.details}>{details}</Text>
    </View>
);

// the filter
const List = (props : any) => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
            setKeyboardVisible(true); // or some other action
        }
        );
        const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
            setKeyboardVisible(false); // or some other action
        }
        );

        return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
        };
    }, []);
    
    const dispatch = useDispatch();
    const sectionData : SectionData[] = props.data;

    const renderItem = (data : any) => {
        const item = data.item;
        const type = data.section.title;

        if (type == 'Companies') {
                return (
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert("Would you like to switch companies?", "", [
                                {
                                text: "Yes",
                                onPress: () => { 
                                    dispatch(updateCompanyIdGlobalAction(item) as any);
                                    dispatch({ type: REFRESH_COMPANY });
                                    props.props.navigation.jumpTo('Home');
                                },
                                },
                                {
                                text: "No",
                                }
                            ])
                        }}
                        disabled={isKeyboardVisible}
                    >
                        <Item name={item.companyName} details='' />
                    </TouchableOpacity>
                );
            }

        else if (type == 'Projects') {
                return (
                    <TouchableOpacity
                        onPress={() => {
                            props.props.navigation.navigate('ProjectDetails', { project: item})
                        }}
                        disabled={isKeyboardVisible}
                    >
                        <Item name={item.projectName} details={item.projectDescription} />
                    </TouchableOpacity>
                );
            }

        else if (type == 'Tasks') {
                return (
                    <TouchableOpacity
                        onPress={() => {
                            props.props.navigation.navigate("TaskDetails", {task: item})
                        }}
                        disabled={isKeyboardVisible}
                    >
                        <Item name={item.title} details={item.description} />
                    </TouchableOpacity>
                );
            }

        return null;
    }
    return (
        <View
            style={styles.list__container}
        >
            <TouchableWithoutFeedback
                onPress={props.setClicked(false)}
            >

            {/* <FlatList
            data={data.tasks}
            renderItem={renderTasks}
            keyExtractor={(item) => item.id.toString()}
            
        /> */}
            { (sectionData) &&
                <SectionList
                    sections={sectionData}
                    keyExtractor={(item, index) => item + index}
                    renderItem={renderItem}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.header}>{title}</Text>
                    )}
                    onRefresh={() => props.setStartRefresh(true)}
                    refreshing={props.refreshing}
                />
                }
            </TouchableWithoutFeedback>
        </View>
    );
};

export default List;

const styles = StyleSheet.create({
    list__container: {
        margin: 10,
        width: "100%",
        flex: 1,
    },
    item: {
        margin: 30,
        borderBottomWidth: 2,
        borderBottomColor: "lightgrey"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
        fontStyle: "italic",
    },
    details: {
        fontSize: 18
    },
    header: {
        fontSize: 28,
        fontWeight: "bold"
    }
});
