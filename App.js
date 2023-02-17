import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'

import Navigator from './routes/stack'

export default function App() 
{

  return (
    <Navigator />
  )

}


