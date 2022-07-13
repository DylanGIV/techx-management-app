import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Button, ActivityIndicator, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import List from '../../../components/List';
import SearchBar from '../../../components/SearchBar';
import { SectionData } from '../../../models/search/SectionData';
import { fetchCompanies } from '../../../redux/actions/CompanyActions';
import { fetchProjectsByAccount } from '../../../redux/actions/ProjectActions';
import { fetchAccountTasks } from '../../../redux/actions/TaskActions';

const EmployeeSearchScreen = (props : any) => {

  const dispatch = useDispatch();

  const fetchAll = () => {
    // dispatch(fetchCompanies() as any);
    dispatch(fetchProjectsByAccount() as any);
    dispatch(fetchAccountTasks() as any);
  }

  const [data, setData] = useState([] as SectionData[]);
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
    setStartRefresh(false);
  }, [refreshCompany, refreshProject, refreshTask, startRefresh])

  
  
  const projects = useSelector((state : any) => state.project.projects);
  const companies = useSelector((state : any) => state.company.companies);
  const tasks = useSelector((state : any) => state.task.tasks);

  useEffect(() => {
    if (!isFetching && projects && companies && tasks) {
      organizeData();
    }

  }, [isFetching, projects, companies, tasks, searchPhrase])

  const organizeData = () => {
    if (!isFetching && projects && companies && tasks) {
      filterData( [
        {
          title : 'Companies',
          data : companies, 
        },
        {
          title : 'Projects',
          data : projects, 
        },
        {
          title : 'Tasks',
          data : tasks
        }
      ] as SectionData[] );
    }
  }

  const filterData = (data : SectionData[] ) => {
    let tempData = new Array<SectionData>();

    tempData = [
      {
        title: 'Companies',
        data: [] as any
      },
      {
        title: 'Projects',
        data: [] as any
      },
      {
        title: 'Tasks',
        data: [] as any
      }
    ]

    data.forEach(item => {

      item.data.forEach(itemData => {
        if (item.title == 'Companies') {
    
          // when no input, show all
          if (searchPhrase === "") {
              tempData[0].data.push(itemData);
              return;
          }
          // filter of the name
          if (itemData.companyName.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
              tempData[0].data.push(itemData);
              return;
          }
        }
            
        else if (item.title == 'Projects') {
    
            if (searchPhrase === "") {
              tempData[1].data.push(itemData);
              return;
            }
            // filter of the name
            if (itemData.projectName.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
              tempData[1].data.push(itemData);
              return;
            }
            // filter of the description
            if (itemData.projectDescription.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
              tempData[1].data.push(itemData);
              return;
            }
        }
    
        else if (item.title == 'Tasks') {
            if (searchPhrase === "") {
              tempData[2].data.push(itemData);
              return;            
            }
                // filter of the name
            if (itemData.title.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
              tempData[2].data.push(itemData);
              return;           
            }
                // filter of the description
            if (itemData.description.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
              tempData[2].data.push(itemData);
              return;           
            }
        }
      });
      
    });

    for (let i = 2; i >= 0; i--) {
      if (tempData[i].data.length == 0) {
        tempData.splice(i, 1)
      }
    }

    setData(tempData);
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
          setStartRefresh={setStartRefresh}
          refreshing={isFetching}
          props={props}
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
