import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Animated, TouchableOpacity } from 'react-native';
import { Text, Button, useTheme, Card, Title, ActivityIndicator, Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectsByAccount } from '../redux/actions/ProjectActions';

const ListProjects = (props : any) => {
    const [filteredProjects, setFilteredProjects] = useState('' as any);
    // let filteredProjects;
    const currentCompany = useSelector((state : any) => state.company.currentCompany);
    const dispatch = useDispatch();

    const getProjects = () => {
      dispatch(fetchProjectsByAccount() as any);
    }
    
        
    useEffect(() => {
      getProjects();
    }, [currentCompany])
    
    const { colors } = useTheme();
    const isFetchingProjects = useSelector((state : any) => state.project.isFetchingProjects);
    const projects = useSelector((state : any) => state.project.projects);
    const styles = makeStyles(colors);

    const filterProjects = () => {
      let tempProjects = new Array();
      projects.forEach((p : any) => {
        if (p.company.id == currentCompany.id) {
          tempProjects.push(p)
        }
      });
      setFilteredProjects(tempProjects);
    }

    useEffect(() => {
      if (currentCompany && projects)
        filterProjects();
    }, [projects, currentCompany])
    
    return (
      <View style={styles.wrapperView}>

        {isFetchingProjects || !filteredProjects ? (
        <View
          style={styles.loadingIndicator}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : filteredProjects.length === 0 ? (
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20 }}>
            No projects
          </Text>
        </View>
      ) : (
        <Animated.FlatList
          keyExtractor={(item) => item.id}
          // style={{ transform: [{ translateY: searchBarAnim }] }}
          // style={{ transform: [{ translateY: searchBarAnim }] }}
          data={filteredProjects}
          onRefresh={getProjects}
          refreshing={isFetchingProjects}
          renderItem={({ item }) => (
            <View style={styles.itemWrapperView} >
              <TouchableOpacity
                onPress={() =>
                  // props.navigation.navigate("RestaurantDetails", {
                  //   name: item.name,
                  //   restaurant: item,
                  // })
                  console.log("Clicked")
                }
              >
                <View style={{ flex: 1 }}>
                  
                  <Card style={(styles.card, styles.spacing)}>
                    <Card.Title 
                      title={item.projectName}
                      subtitle={("Tasks: ") + 0}
                      left={(props) => <Avatar.Icon {...props} icon="folder" />}
                      // right={(props) => <IconButton {...props} icon="more-vert" onPress={() => {}} />}
                    />
                  </Card>

                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      </View>
    );
};

const makeStyles = (colors : ReactNativePaper.ThemeColors) => StyleSheet.create({
    wrapperView: {
      flex: 1,
      // backgroundColor: colors.primary
    },
    container: {
      flex: 1,
    },
    spacing: {
      marginTop: 20,
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 0,
    },
    card: {
      flexDirection: "row",
      height: 30,
      width: 10,
      borderRadius: 1,
      alignSelf: "center",
      marginBottom: 3,
      marginTop: 3,
      borderLeftWidth: 5,
      shadowColor: "#000",
      shadowOffset: {
        width: 1,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    appButtonContainer: {
      elevation: 8,
      backgroundColor: "white",
      borderRadius: 30,
      paddingVertical: 0,
      paddingHorizontal: 0,
    },
    buttonContainer: {
      borderRadius: 25,
      paddingTop: 0,
      paddingBottom: 0,
      marginRight: 1.8,
      marginLeft: 1.8,
      flex: 1,
    },
    appButtonText: {
      fontSize: 14,
      color: "#FFFFFF",
      fontWeight: "bold",
      alignSelf: "center",
      padding: 0,
      margin: 0,
    },
    loadingIndicator: {
      position: 'absolute', 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: colors.primaryDark,
      opacity: 0.1, 
      left: 0, 
      right: 0, 
      top: 0, 
      bottom: 0,
    },
    itemWrapperView: {
      flex: 1,
      borderBottomWidth: 1,
      marginLeft: 10
    }
  });
    
export default ListProjects;
