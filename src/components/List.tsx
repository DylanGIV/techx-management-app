import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  SectionList,
  Keyboard,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Project } from "../models/response/ProjectResponse";
import { Task } from "../models/response/TaskResponse";
import { Data } from "../models/search/DataInterface";
import { SectionData } from "../models/search/SectionData";

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

    const sectionData : SectionData[] = props.data;



    const renderItem = (data : any) => {
        const item = data.item;
        const type = data.section.title;

        if (type == 'Companies') {

        //     // when no input, show all
        //     if (props.searchPhrase === "") {
                return <Item name={item.companyName} details='' />;
            }
        //     // filter of the name
        //     if (item.companyName.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
        //         return <Item name={item.companyName} details='' />;
        //     }
        // }
            
        else if (type == 'Projects') {

        //     if (props.searchPhrase === "") {
                return <Item name={item.projectName} details={item.projectDescription} />;
            }
        //     // filter of the name
        //     if (item.projectName.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
        //         return <Item name={item.projectName} details={item.projectDescription} />;
        //     }
        //     // filter of the description
        //     if (item.projectDescription.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
        //         return <Item name={item.projectName} details={item.projectDescription} />;
        //     }
        // }

        else if (type == 'Tasks') {
            // if (props.searchPhrase === "") {
                return <Item name={item.title} details={item.description} />;
            }
        //         // filter of the name
        //     if (item.title.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
        //         return <Item name={item.title} details={item.description} />;
        //     }
        //         // filter of the description
        //     if (item.description.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
        //         return <Item name={item.title} details={item.description} />;
        //     }
        // }

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
