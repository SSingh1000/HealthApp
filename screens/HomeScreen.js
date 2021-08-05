import React, { Component, useState } from 'react';
import { View, Text, Image, Button, StyleSheet,TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage'

global.firstName = "";
global.lastName = "";

export default class HomeScreen extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }

  
  doLogout =() =>{
    AsyncStorage.removeItem('token_data');
    this.props.navigation.navigate('Login');
  }

  
  render() {
    return (
    <LinearGradient
        style={styles.container}
        colors={['#2980B9', '#6DD5FA','#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
    >
     <View
      style={styles.container}

     >
      <Image
        style={styles.image}
        source={require('../assets/banner.png')}
      />    

      <Text style={styles.textView}>
        Welcome:
      </Text>
      <Text style={styles.textName}>{global.firstName + " "+ global.lastName}</Text>
      <View
        style={styles.tileView}
      >
      <TouchableOpacity
        onPress = {() => this.props.navigation.navigate('Rx')}
      >
          <Image
            style={styles.imageTile}
           source={require('../assets/rx.png')}
          >
          </Image>
      </TouchableOpacity>
      
      <TouchableOpacity
      onPress = {() => this.props.navigation.navigate('Workout')}
      >
          <Image
            style={styles.imageTile}
           source={require('../assets/workout.png')}
          >
          </Image>
      </TouchableOpacity> 
      
      <TouchableOpacity
        onPress = {() => this.props.navigation.navigate('Weight')}
      >
          <Image
            style={styles.imageTile}
           source={require('../assets/weightloss.png')}
          >
          </Image>  
      </TouchableOpacity>

      <TouchableOpacity
        onPress = {() => this.props.navigation.navigate('Water')}
      >
          <Image
            style={styles.imageTile}
           source={require('../assets/water.png')}
          >
          </Image>
      </TouchableOpacity> 
          
      </View> 
      
      <View style={styles.button}>
        <TouchableOpacity
        style={styles.logOff}
        onPress = {() => this.doLogout()}
        >
         <LinearGradient
          colors={['#EF3B36','#FFFFFF']}
          style={styles.logOff}
         >
           <Text style={styles.textStyle}>
             Sign Out
           </Text>
         </LinearGradient>
        </TouchableOpacity>
        </View>  
        </View>
    </LinearGradient>
     );
    }

  }
 

  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    imageTile: {
      width: 160,
      height: 150,
      resizeMode: 'contain',
      //borderWidth: 5,
      //backgroundColor:'white',
    },
    tileView:{
      top: 90,
      flexDirection: "row",
      justifyContent:"space-evenly",
      flexWrap: 'wrap',
    },
    textView:{
      position:'absolute',
      bottom: 650,
      fontSize: 45,
      fontWeight: 'bold',
      color: 'white',
      textShadowColor: 'red',
    },
    textName:{
      position:'absolute',
      bottom: 600,
      fontSize: 45,
      fontWeight: 'bold',
      color: 'white',
      textShadowColor: 'red',
    },
   
    button:{
      top: 200,
      alignItems: 'center',
      
    },
    logOff:{
      width: 300,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12
    },
    textStyle:{
      fontSize: 18,
      fontWeight: 'bold',
      color: '#BDFFF3'
    },
    image:{
      position:'absolute',
      top: 29,
      width: 410,
      height: 100,
      resizeMode: 'stretch',
   },
   
  });
