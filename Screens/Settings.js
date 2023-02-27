import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { SelectList } from 'react-native-dropdown-select-list'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings({ navigation })
{

    const [selected, setSelected] = useState("-1");
    const [name, setName] = useState("");
    
    const changeSelected = (val) =>
    {
        setSelected(val);
        console.log(navigation.state.params[val].value);
        setName(navigation.state.params[val].value);
    }

    const changeData = async () => {
        if (selected < 0)
            return
        navigation.state.params[selected].value = name;

        let categoryString = await AsyncStorage.getItem(`category${selected}`);
        if (!categoryString)
            return
        let categoryObject = JSON.parse(categoryString);
        categoryJson.value = categoryObject;

        categoryString = JSON.stringify(categoryJson);
        
        AsyncStorage.setItem(`category${selected}`,categoryString);
    }

    return (
        <View style={{paddingHorizontal: 36}}>
            <View>
            <Text style={styles.title}>{'Settings page'}</Text>
            </View>

            <View>
            <SelectList 
                  setSelected={(val) => changeSelected(val)} 
                  data={navigation.state.params} 
                  save="key"
                  search = {false}
                  inputStyles={{fontSize: 24, fontWeight: 'bold',}}
                  placeholder="Select Category"
              />
            </View>
            <TextInput
                placeholder={'Name'}
                value={name}
                onChangeText={text => setName(text)}
                style={styles.textChange}
            />
            <TouchableOpacity style={styles.addCategoryButton} onPress={changeData}>
              <Text style = {styles.addTaskText}>{'✔️'}</Text>
            </TouchableOpacity>
        </View>
        
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: 32
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
    addTaskText: {
        color: '#fff'
    },
    textChange: {
        paddingVertical: 10,
        paddingLeft: 4,
        fontSize: 16
    }
})