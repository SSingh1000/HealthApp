import React, { Component,useState } from 'react';
import { Alert, Button, View, Text, TextInput, Image, StyleSheet,TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage'

global.Login = "";
global.Password = "";

export default class LoginScreen extends Component{
   constructor(){
     super();
       this.state ={
         username: "",
         password: ""
       };
     }
  
  onSubmit
  
  
  render(){
    return (
    <LinearGradient
      style={styles.container}
      colors={['#2980B9', '#6DD5FA','#FFFFFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/logo.png')} />
        <View
          style={styles.container}
        >
          <Image
            style={styles.blurredImage}
            source={require('../assets/heart.png')}
          
          />
        <View style = {styles.inputView}>
          <View style={styles.action}>
            <Feather 
              name="users"
              color="red"
              size={20}
            />
          </View>
        <TextInput
          style={styles.textInput}
          autoCapitalize = 'none'
          placeholder={'Username'}
          placeholderTextColor = 'black'
          onChangeText={(val) => {this.LoginNameHandler(val)}}

        />
        </View>
        <View style = {styles.inputView1}>
        <View style={styles.action}>
            <Feather 
              name="key"
              color="red"
              size={20}
            />
          </View>
        <TextInput
          style={styles.textInput1}
          placeholder={'Password'}
          placeholderTextColor= 'black'
          secureTextEntry
          onChangeText={(val) => {this.PasswordHandler(val)}}

        />
        </View>
        </View>

        <TouchableOpacity>
          <Text 
          style = {styles.forgotButton}  
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>
        
        <View style={styles.button}>
        <TouchableOpacity 
        style={styles.signIn}
        onPress={this.doLogin}    
        >
         <LinearGradient
          colors={['#EF3B36','#FFFFFF']}
          style={styles.signIn}
         >
           <Text style={styles.textStyle}>
             Login
           </Text>
         </LinearGradient>
        </TouchableOpacity>
        </View>
      
      </View>
    </LinearGradient>
  );
};


doLogin = async () =>{
  let tokenStorage = require('../tokenStorage.js');
  try
  {
    var obj = {login:global.login.trim(),password:global.password.trim()};
    var js = JSON.stringify(obj);

    const response = await fetch('https://health-n-wellness-prod.herokuapp.com/api/login',
      {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

    var res = JSON.parse(await response.text());
    if( res.id <= 0 )
    {
      this.setState({message: "User/Password combination incorrect" });
    }
    else{
      let user ={
      firstName: res.firstName,
      lastName: res.lastName,
      userId:  res.id,
      email: res.email,
      }
      global.firstName = res.firstName;
      global.lastName = res.lastName;
      
      tokenStorage.storeToken(res.jwtToken);
     await AsyncStorage.setItem('token_data', JSON.stringify(user));
      this.props.navigation.navigate('Main');
    }
  }
  catch(e)
  {
    this.setState({message: e.message });
  }
}  

LoginNameHandler = async (val) =>
{
  global.login = val;
}  

PasswordHandler = async (val) =>
{
  global.password = val;
}

}

//CSS Design    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    image:{
       marginTop: 120

    },
    inputView: {
     backgroundColor: 'white',
     fontFamily: "Spicy Rice",
     borderRadius: 14,
     width: 250,
     height: 45,
     marginBottom: 12,
     marginLeft: 12,
     position:'absolute',
     bottom: 450,
     left: -125,
     alignItems: 'center'
  },
  inputView1: {
    backgroundColor: 'white',
    fontFamily: "Spicy Rice",
    borderRadius: 14,
    width: 250,
    height: 45,
    marginBottom: 12,
    marginLeft: 12,
    position:'absolute',
    bottom: 380,
    left: -125,
    alignItems: 'center'
 },
  textInput:{
    flex: 1,
    height:30,
    fontSize: 20,
    paddingLeft: 10,
  },
  textInput1:{
    flex: 1,
    height:30,
    fontSize: 20,
    paddingLeft: 10,
  },
  forgotButton:{
    color: '#ff4b1f',
    position: 'absolute',
    bottom: 210,
    right: -70 

  },
  button:{
    alignItems: 'center',
    position: 'absolute',
    bottom: 130,
    right: 75
    
  },
  signIn:{
    width: 200,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12
  },
  textStyle:{
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  },

  blurredImage:{
    height: 400,
    width: 400,
    position: "absolute",
    bottom: 0,
    top: 90,
    resizeMode: 'contain',
    marginBottom: 100
    
  },
  action: {
    position: 'absolute',
    left: 20,
    bottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ffff',
    paddingBottom: 5
},
});
