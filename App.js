import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import Task from './components/Task';

export default function App() {

  const [task, setTask] = useState();
  const [tasks, setTasks] = useState([]);

  const [selected, setSelected] = React.useState("My Tasks");

  const data = [
    {key:'1', value:'My Tasks'},
    {key:'2', value:'Home'},
    {key:'3', value:'Job'},
    {key:'4', value:'Fun'}
]

  const addTask = () => {
    //Keyboard.dismiss();
    setTasks([...tasks, {text: task, category: selected}]);
    setTask(null);
  }

  const deleteTask = (index) => {
    let tasksCopy = [...tasks];
    tasksCopy.splice(index, 1);
    setTasks(tasksCopy);
  }

  return (
    <View style={styles.container}>

      <View style = {styles.selection}>
        <SelectList 
            setSelected={(val) => setSelected(val)} 
            data={data} 
            save="value"
            search = {false}
            inputStyles={{fontSize: 24, fontWeight: 'bold',}}
            placeholder="My Tasks"
        />
      </View>
      
      <View style = {styles.box}>
        <View style={styles.tasks}>
          {
            tasks.map((item, index) => {
              console.log(item)
              if (selected != "My Tasks" && item.category != selected)
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
        placeholder = {"Write a text"} placeholderTextColor = "#fff"
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
  selection: {
    paddingTop: 60,
    paddingHorizontal: 36,
  },
  box: {
    padding: 32,
    paddingVertical: 26
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 32
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
