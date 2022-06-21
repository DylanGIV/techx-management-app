import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Animated, TouchableOpacity } from 'react-native';
import { Text, Button, useTheme, Card, Title, ActivityIndicator, Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectsByAccount } from '../redux/actions/ProjectActions';
import { REFRESH_SWITCH } from '../redux/actions/types';

const ListProjects = ({props} : any) => {
    const [filteredProjects, setFilteredProjects] = useState('' as any);
    // let filteredProjects;
    const currentCompany = useSelector((state : any) => state.company.currentCompany);
    const refresh = useSelector((state : any) => state.refresh.refresh);

    const dispatch = useDispatch();

    const getProjects = () => {
      dispatch(fetchProjectsByAccount() as any);
    }

    useEffect(() => {
      getProjects();
      // const willFocusSubscription = props.navigation.addListener('focus', () => {
      //   getProjects();
      // });

      // return willFocusSubscription;
      if (refresh) {
        dispatch({ type: REFRESH_SWITCH, payload: false})
        console.log("to false")
      }
  
    }, [currentCompany, refresh])

    
    const { colors } = useTheme();
    const isFetchingProjects = useSelector((state : any) => state.project.isFetchingProjects);
    const isFetchingCompanies = useSelector((state : any) => state.company.isFetchingCompanies);
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

        {!currentCompany ?
          <View style={styles.noCompanyView}>
            <Text style={styles.noCompanyText}>
              You must be in a company before creating projects!
            </Text>
          </View>
        :
        isFetchingProjects || isFetchingCompanies ? (
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
          data={filteredProjects}
          onRefresh={getProjects}
          refreshing={isFetchingProjects}
          renderItem={({ item }) => (
            <View style={styles.itemWrapperView} >
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('ProjectDetails', { project: item})
                }
              >
                <View style={{ flex: 1 }}>
                  <Card style={styles.card}>
                    <Card.Title 
                      title={item.projectName}
                      subtitle={("Tasks: ") + (item.accountTasks.length + item.teamTasks.length)}
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
    card: {
      marginTop: 20,
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 0,
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
    },
    noCompanyView: {
      flex: 1,
      justifyContent: 'center',
    },
    noCompanyText: {
      textAlign: 'center',
      fontSize: 26
    }
  });
    
export default ListProjects;
