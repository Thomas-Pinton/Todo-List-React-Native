import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedbackBase } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'

import * as db from '../data/tasksDb';
import Task from '../components/Task';

let data = [
  {key:'0', value:'My Tasks'},
  {key:'1', value:'Home'},
  {key:'2', value:'Job'},
  {key:'3', value:'Fun'}
]

console.log("Iniciando")

const addValues = async () => {
  const jsonValue0 = {key: data[0].value, value: data[0].value, color: 'red' }
  const jsonValue1 = {key: data[1].value, value: data[1].value, color: 'green' }
  const jsonValue2 = {key: data[2].value, value: data[2].value, color: 'blue' }
  const jsonValue3 = {key: data[3].value, value: data[3].value, color: 'yellow' }
  await db.addCategory('0', jsonValue0);
  await db.addCategory('1', jsonValue1);
  await db.addCategory('2', jsonValue2);
  await db.addCategory('3', jsonValue3);
}

///*

const recoverTasksFromDatabase = async () => {
  let keys = await db.getAllTasksKeys();
  if (keys)
  {
    let tasks = [];
    for (let key in keys)
      tasks.push(await db.getTask(key));
    console.log('tasks from database ', tasks);
    return tasks;
  } else 
  {
    console.log("No tasks to recover!");
    return [];
  }
  
}

const recoverCategoriesFromDatabase = async () => {
  let keys = await db.getAllCategoriesKeys();
  if (keys)
  {
    let cat = [];
    for (let i = 0; i < keys.length; i++)
    {
      cat[i] = await db.getCategory(keys[i]);
    }
    return cat;
  } else 
  {
    console.log("No categories to recover!");
    return [];
  }
}

const addBaseCategories = async ()=> {
  if (await recoverCategoriesFromDatabase().length == 0)
    addValues();
}

addBaseCategories();

export default function Home({ navigation }) 
{

  console.log(navigation.state)

  if (navigation.state.params)
  {
    console.log("Usando parametros");
    data = navigation.state.params;
  }

    const [task, setTask] = useState();
    const [tasks, setTasks] = useState([]);

    const [categories, setCategories] = useState([
      {key:'0', value:'My Tasks', color: 'red'},
      {key:'1', value:'Home', color: 'green'},
      {key:'2', value:'Job', color: 'blue'},
      {key:'3', value:'Fun', color: 'yellow'}
    ]);

    const [categoriesList, setCategoriesList] = useState(data);

    const transformCategoriesIntoList = () => {
      let array = [];
      console.log("Transform categories into list ", categories)
      for (let i = 0; i < categories.length; i++)
        array[i] = {key: categories[i].key, value: categories[i].value};
      setCategoriesList(array);
    }

    useEffect(() => {
      async function getData() {
        setTasks(await recoverTasksFromDatabase());
        setCategories(await recoverCategoriesFromDatabase());
      }
      getData();
      transformCategoriesIntoList();
      // 1 category with all the data and 1 category list to use the dropdown list
    }, [])

    const [selected, setSelected] = useState(categoriesList[0]);

    const addTaskToList = () => {
        Keyboard.dismiss();
        setTasks([...tasks, {text: task, category: selected}]);
        db.addTask(tasks.length.toString(), {text: task, category: selected});
        setTask(null);
    }

    const deleteTask = (index) => {
        let tasksCopy = [...tasks];
        db.removeTask(index.toString());
        tasksCopy.splice(index, 1);
        setTasks(tasksCopy);
    }

    const pressSettingsButton = () => {
        navigation.navigate("Settings", categoriesList);
    }

    return (
        <View style={styles.container}>
    
          <View style={styles.top}>
    
            <TouchableOpacity style={styles.addCategoryButton} onPress={pressSettingsButton}>
              <Text style = {styles.addTaskText}>⚙️</Text>
            </TouchableOpacity>
            <View style = {styles.selection}>
              <SelectList 
                  setSelected={(val) => setSelected(val)} 
                  data={categoriesList} 
                  save="key"
                  search = {false}
                  inputStyles={{fontSize: 24, fontWeight: 'bold',}}
                  placeholder="My Tasks"
              />
            </View>
            
          </View>
          
    
          <View style = {styles.box}>
            <View style={styles.tasks}>
              {console.log('tasks ', tasks)}
              {
                tasks.map((item, index) => {
                  console.log(item)
                  // My texts shows tasks from all categories
                  if (selected != "0" && item.category != selected)
                    return; 
              
                  return (
                    <TouchableOpacity key={index} onPress={() => {deleteTask(index)}}>
                      <Task  text={item.text} category={item.category} />
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>
    
          <KeyboardAvoidingView
            behavior = {"height"}
            style = {styles.addTaskSection}
          >
            <TextInput style = {styles.addTaskBar} 
            placeholder = {"Write a task"} placeholderTextColor = "#fff"
            value={task} onChangeText = { text => setTask(text)} />
    
            <TouchableOpacity style = {styles.addTaskButton} onPress={ () => {addTaskToList()}}>
              <View style = {styles.addTask}>
                <Text style = {styles.addTaskText}>+</Text>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
          
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E0E1DD',
    },
    top: {
      width: '100%',
      paddingHorizontal: 36,
      paddingTop: 60,
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    addCategoryButton: {
      height: 46,
      width: 46,
      borderRadius: 46,
      marginTop: 4,
      backgroundColor: '#0D1B2A',
      justifyContent: 'center',
      alignItems: 'center'
    },
    selection: {
      width: 250,
    },
    box: {
      padding: 32,
      paddingVertical: 26
    },
    addTaskSection: {
      position: 'absolute',
      bottom: 30,
      width: '100%',
      paddingHorizontal: 36,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    addTaskBar: {
      width: 250,
      height: 46,
      borderRadius: 10,
      backgroundColor: '#778DA9',
      color: '#fff',
      paddingHorizontal: 12
    },
    addTaskButton: {
      height: 46,
      width: 46,
      borderRadius: 46,
      backgroundColor: '#0D1B2A',
      justifyContent: 'center',
      alignItems: 'center'
    },
    addTask: {
    },
    addTaskText: {
      color: '#fff'
    }
  });