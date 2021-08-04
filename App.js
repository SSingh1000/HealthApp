import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import WorkoutScreen from './screens/WorkoutScreen';
import RxScreen from './screens/RxScreen';
import WeightScreen from './screens/WeightScreen';
import WaterScreen from './screens/WaterScreen';

const Stack = createStackNavigator();

export default class App extends React.Component {


  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name = "Login" component={LoginScreen} options={{headerShown: false, gestureEnabled: false}}/>
          <Stack.Screen name = "Main" component={HomeScreen} options={{headerShown: false,gestureEnabled: false}}/>
          <Stack.Screen name = "Rx" component={RxScreen} options={{headerShown: false, gestureEnabled: false}}/>
          <Stack.Screen name = "Workout" component={WorkoutScreen} options={{headerShown: false, gestureEnabled: false}}/>
          <Stack.Screen name = "Weight" component={WeightScreen} options={{headerShown: false, gestureEnabled: false}}/>
          <Stack.Screen name = "Water" component={WaterScreen} options={{headerShown: false, gestureEnabled: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
    
  }
}