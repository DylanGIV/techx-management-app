import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Animated, TouchableOpacity } from 'react-native';
import { Text, Button, useTheme, Card, Title, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectsByAccount } from '../redux/actions/ProjectActions';

const ListProjects = (props : any) => {

    const dispatch = useDispatch();

    const getProjects = () => {
      dispatch(fetchProjectsByAccount() as any)

    }
    useEffect(() => {
      getProjects();
    }, [])
    
    const { colors } = useTheme();
    const isFetchingProjects = useSelector((state : any) => state.project.isFetchingProjects);
    const projects = useSelector((state : any) => state.project.projects);
    const styles = makeStyles(colors);

    useEffect(() => {
    }, [])

    

    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.wrapperView}>

          {isFetchingProjects || !projects ? (
          <View
            style={styles.loadingIndicator}
          >
            <ActivityIndicator size="large" />
          </View>
        ) : projects.length === 0 ? (
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
            data={projects}
            onRefresh={getProjects}
            refreshing={isFetchingProjects}
            renderItem={({ item }) => (
              <View style={styles.wrapperView} >
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
                      <Card.Content>
                        <Title>{item.projectName}</Title>
                      </Card.Content>
                        {/* <Card.Cover
                          source={{ uri: item.image_url ? item.image_url : null }}
                        /> */}
                    </Card>

                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        )}

        </View>
      </SafeAreaView>

    );
};

const makeStyles = (colors : ReactNativePaper.ThemeColors) => StyleSheet.create({
    wrapperView: {
      flex: 1,
      backgroundColor: colors.primary
    },
    container: {
      flex: 1,
    },
    invcontainer: {
      backgroundColor: "white",
      opacity: 0.7,
    },
    text: {},
    spacing: {
      marginTop: 20,
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 0,
    },
    allign: {
      textAlign: "left",
      alignSelf: "stretch",
      marginRight: 300,
      marginLeft: 0,
    },
    actionContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: 65,
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
    phone: {
      height: 30,
      width: 30,
      backgroundColor: "#329df4",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 5,
    },
    fabStyle: {
      position: "absolute",
      margin: 16,
      right: 0,
      bottom: 0,
      backgroundColor: "lightblue",
    },
    olStyle: {
      position: "absolute",
      top: 50,
      bottom: 180,
      left: 50,
      right: 50,
    },
    leftContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    rightContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    popupmodal: {
      margin: 20,
    },
    loadingIndicator: {
      position: 'absolute', 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: colors.primaryDark,
      opacity: 0.5, 
      left: 0, 
      right: 0, 
      top: 0, 
      bottom: 0,
    },
  });
    
export default ListProjects;
