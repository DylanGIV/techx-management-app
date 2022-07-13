import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  SectionList,
  Keyboard,
  Alert,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { Project } from "../models/response/ProjectResponse";
import { Task } from "../models/response/TaskResponse";
import { Data } from "../models/search/DataInterface";
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
            <TouchableOpacity
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
                />
                }
            </TouchableOpacity>
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
