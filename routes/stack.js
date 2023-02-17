import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Settings from '../Screens/Settings'
import Home from '../Screens/Home'

const screens = { 
  Home: {
    screen: Home
  },
  Settings: {
    screen: Settings
  }
}

const stack = createStackNavigator(screens);

export default createAppContainer(stack);