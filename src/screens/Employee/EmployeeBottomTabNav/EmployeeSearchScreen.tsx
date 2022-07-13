import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Button, ActivityIndicator, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import List from '../../../components/List';
import SearchBar from '../../../components/SearchBar';
import { Project } from '../../../models/response/ProjectResponse';
import { Task } from '../../../models/response/TaskResponse';
import { Data } from '../../../models/search/DataInterface';
import { fetchCompanies } from '../../../redux/actions/CompanyActions';
import { fetchProjectsByAccount } from '../../../redux/actions/ProjectActions';
import { fetchAccountTasks } from '../../../redux/actions/TaskActions';

const EmployeeSearchScreen = () => {

  const dispatch = useDispatch();

  const fetchAll = () => {
    // dispatch(fetchCompanies() as any);
    dispatch(fetchProjectsByAccount() as any);
    dispatch(fetchAccountTasks() as any);
  }

  const [data, setData] = useState({} as Data);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [startRefresh, setStartRefresh] = useState(false);

  const colors = useTheme().colors;

  const isFetchingCompanies = useSelector((state : any) => state.company.isFetchingCompanies);
  const isFetchingProjects = useSelector((state : any) => state.project.isFetchingProjects);
  const isFetchingTasks = useSelector((state : any) => state.task.isFetchingTasks);
  
  const refreshTask = useSelector((state : any) => state.refresh.refreshTask);
  const refreshProject = useSelector((state : any) => state.refresh.refreshProject);
  const refreshCompany = useSelector((state : any) => state.refresh.refreshCompany);

  const isFetching = (isFetchingCompanies || isFetchingProjects || isFetchingTasks);

  useEffect(() => {
    fetchAll();
    
  }, [refreshCompany, refreshProject, refreshTask, startRefresh])

  
  
  const projects = useSelector((state : any) => state.project.projects);
  const companies = useSelector((state : any) => state.company.companies);
  const tasks = useSelector((state : any) => state.task.tasks);

  useEffect(() => {
    if (!isFetching && projects && companies && tasks) {
      organizeData();
    }

  }, [isFetching, projects, companies, tasks])

  const organizeData = () => {
    if (!isFetching && projects && companies && tasks) {

      // let tempData = {companies : companies, projects : projects, tasks : tasks} as Data
      
      setData( {companies : companies, projects : projects, tasks : tasks} as Data );
    }
  }

  return (
    <View style={styles.wrapperView}>
      <View style={styles.wrapperView}>

      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />

      {isFetching || !data ? (
        <ActivityIndicator size="large" color={colors.text} />
      ) : (
        
        <List
          searchPhrase={searchPhrase}
          data={data}
          setClicked={setClicked}
          refresh={setStartRefresh}
          refreshing={isFetching}
        />
        
      )}

      </View>
    </View>

  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapperView: {
      flex: 1,
    },

  });  

export default EmployeeSearchScreen;
