import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Task = (props) => {
    return (
        <View style = {styles.task}>
            <View style = {styles.categorySquare}></View>
            <Text style = {styles.taskText}>{props.text}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    task: {
        width: 342,
        height: 46,
        padding: 14,
        marginTop: 16,
        backgroundColor: '#778da9',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    categorySquare: {
        width: 18,
        height: 18,
        backgroundColor: '#0d1b2a',
        opacity: 0.8
    },
    taskText: {
        paddingLeft: 10,
        color: '#fff'
    },
    addText: {

    },
});

export default Task;