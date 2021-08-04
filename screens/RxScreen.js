import React, { Component, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity,ScrollView,FlatList} from 'react-native';
import { Avatar, Button, Card, Title,Switch ,Paragraph} from 'react-native-paper';
import {LinearGradient} from 'expo-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage'

const LeftContent = props => <Avatar.Icon {...props} icon="pill" />

global.fullist = " ";
export default class RxScreen extends Component{
    constructor(props){
        super(props);
        
        this.state = 
        {
            dataSource: [],
        }
    }
    

    getRxAlarm = () =>{
        let data =  (AsyncStorage.getItem('token_data'));
          let getRxPayload = 
          {
              userId: data.userId,
              
          }
  
          let httpRequest = 
          {
              method: 'post',
              body: JSON.stringify(getRxPayload),
              headers: {'Content-Type': 'application/json; charset=utf-8'}
          }
  
          fetch('https://health-n-wellness-prod.herokuapp.com/api/getAllRxAlarmsMobile', httpRequest)
          .then(this.checkResponse)
          .catch(function(error) { console.log(error); })
          .then(response => response.json())
          .then(responseData =>
          {
              if (responseData.error.length === 0)
              {
                  this.setState({
                      dataSource: responseData.Alarms,
                  })
                  console.log('Successfully deleted alarm!');
              }
              else
              {
                  console.log('error' + " "+responseData.error);
              }
          });
          
      }
  
      checkResponse = (response) =>
  {
      if (response.status >= 500)
      {
          console.log('Server Error: Did not get a valid response from server!');
          throw new Error('Invalid JSON from server - probably a server error');
      }
  
      return response;
  }
  
    

    render(){
       let stuff = this.getRxAlarm();
        
     return(
            <LinearGradient
                style={styles.container}
                colors={['#2980B9', '#6DD5FA','#FFFFFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <ScrollView>
                <Card style={styles.cards}>
                    <LinearGradient
                        colors={['#DCE35B', '#45B649']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                <Card.Title
        
                    title="Prescription" 
                    left={LeftContent} 
                />
                <Card.Content>
                    <Title style={{textAlign:'center', bottom: 15, fontSize:24}}>{}</Title>
                    <Text style={{textAlign:'center'}}></Text>
                    </Card.Content>
                   
                    <Card.Actions style = {{justifyContent:'space-around'}}>
                        <Button onPress={alert(stuff)}>Delete</Button>
                        <Button>Alarm</Button>
                    </Card.Actions>
                </LinearGradient>
                </Card>
                </ScrollView>
               
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('Main')}>
                 <View style={styles.action}>
                     <Feather
                        name="arrow-left-circle"
                        color="black"
                        size={40}
                    />
                </View>
                </TouchableOpacity>

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
    action:{
        position: 'absolute',
        bottom: 789,
        right: 150,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        paddingBottom: 5
    },
    cards:{
        flex: 1,
        marginTop: 150,
        height: 150,
        width: 370,
        
    },
    cardTitle:{
        justifyContent:'space-around',

    }
});