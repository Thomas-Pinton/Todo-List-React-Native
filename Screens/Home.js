import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedbackBase } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import AsyncStorage from '@react-native-async-storage/async-storage';


import Task from '../components/Task';

let data = [
  {key:'0', value:'My Tasks'},
  {key:'1', value:'Home'},
  {key:'2', value:'Job'},
  {key:'3', value:'Fun'}
]

let value = null;

//value = AsyncStorage.getItem('category0');

if (!value) // if database is empty, load basic values
{
  const jsonValue0 = JSON.stringify({value: data[0].value, color: 'red' })
  const jsonValue1 = JSON.stringify({value: data[1].value, color: 'green' })
  const jsonValue2 = JSON.stringify({value: data[2].value, color: 'blue' })
  const jsonValue3 = JSON.stringify({value: data[3].value, color: 'yellow' })
  //await AsyncStorage.setItem('category0', jsonValue0);
  //await AsyncStorage.setItem('category1', jsonValue1);
  //await AsyncStorage.setItem('category2', jsonValue2);
  //await AsyncStorage.setItem('category3', jsonValue3);
}


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

    const [selected, setSelected] = useState(data[0]);

    const addTask = () => {
        //Keyboard.dismiss();
        setTasks([...tasks, {text: task, category: selected}]);
        //AsyncStorage.setItem(`task${tasks.length}`, JSON.stringify(task));
        setTask(null);
    }

    const deleteTask = (index) => {
        let tasksCopy = [...tasks];
        //AsyncStorage.removeItem(`task${index}`);
        tasksCopy.splice(index, 1);
        setTasks(tasksCopy);
    }

    const pressSettingsButton = () => {
        navigation.navigate("Settings", data);
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
                  data={data} 
                  save="key"
                  search = {false}
                  inputStyles={{fontSize: 24, fontWeight: 'bold',}}
                  placeholder="My Tasks"
              />
            </View>
            
          </View>
          
    
          <View style = {styles.box}>
            <View style={styles.tasks}>
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
    
            <TouchableOpacity style = {styles.addTaskButton} onPress={ () => {addTask()}}>
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