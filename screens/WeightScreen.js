import React, { Component,useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity,ScrollView,} from 'react-native';
import { Avatar, Button, Card, Title,Switch ,Paragraph} from 'react-native-paper';
import {LinearGradient} from 'expo-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LeftContent = props => <Avatar.Icon {...props} icon="dumbbell" />

 

 
export default class WeightScreen extends Component{
    constructor(props){
        super(props);
        this.state ={
            loading: true,
            data:[],
            alarms: null
        }
    }


    componentDidMount = async() =>{
        try{
            let value = await AsyncStorage.getItem('token_data');
             value = JSON.parse(value)
            if(value != null){
            
            let getRxPayload = 
          {
              userId: value.userId,
              
          }
  
          let httpRequest = 
          {
              method: 'POST',
              body: JSON.stringify(getRxPayload),
              headers: {'Content-Type': 'application/json; charset=utf-8'}
          }
  
          fetch('https://health-n-wellness-prod.herokuapp.com/api/getPercentageDifferenceMobile', httpRequest)
          .then(this.checkResponse)
          .catch(function(error) { console.log(error); })
          .then(response => response.json())
          .then(responseData =>
          {
              if (responseData.error.length === 0)
              {
                  
                  console.log('Successfully got Weight alarms!');
                  this.setState({ alarms: responseData.Alarms })
              }
              else
              {
                  console.log('error' + " "+responseData.error);
              }
          });    
      
        }
    }
        catch(e){
            console.log(e);

        }
    }

    
  
checkResponse = (response) =>{
      if (response.status >= 500)
      {
          console.log('Server Error: Did not get a valid response from server!');
          throw new Error('Invalid JSON from server - probably a server error');
      }
  
      return response;
  }

getAlarms = () =>
{
    let alarms = this.state.alarms;
    if (alarms)
    {
        let cards = [];
        alarms.forEach(function(alarm)
        {
            let daysRepeating = [];

            if (alarm.monday) daysRepeating.push('Monday');
            if (alarm.tuesday) daysRepeating.push('Tuesday');
            if (alarm.wednesday) daysRepeating.push('Wednesday');
            if (alarm.thursday) daysRepeating.push('Thursday');
            if (alarm.friday) daysRepeating.push('Friday');
            if (alarm.saturday) daysRepeating.push('Saturday');
            if (alarm.sunday) daysRepeating.push('Sunday');
            

            cards.push(
                <Card style={styles.cards}>
                    <LinearGradient
                        colors={['#c6ffdd', '#fbd786','#f7797d']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                <Card.Title
        
                    title="Prescription" 
                    left={LeftContent} 
                />
                <Card.Content>
                    <Title style={{textAlign:'center', bottom: 15, fontSize:24}}>{} </Title>
                    <Text style={{textAlign:'center'}}>{alarm.item}</Text>
                    <Text style={{textAlign:'center'}}>{alarm.time}</Text>
                    <Text style={{textAlign:'center'}}>{daysRepeating.join(', ')}</Text>

                    </Card.Content>
                    
                </LinearGradient>
                </Card>
            );
        });

        return (<View>{cards}</View>);
    }
    else
    {
        let cards = [];
        cards.push(
        <Card style={styles.cards}>
            <LinearGradient
                colors={['#c6ffdd', '#fbd786','#f7797d']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
        <Card.Title

            title="Weight Tracking" 
            left={LeftContent} 
        />
        <Card.Content>
            <Title style={{textAlign:'center', bottom: 15, fontSize:24}}>{} </Title>
            <Text style={{textAlign:'center'}}>No Data!</Text>

            </Card.Content>
            
        </LinearGradient>
        </Card>);
        
        return (<View>{cards}</View>);
    }
}


render(){
    const alarmCards = this.getAlarms();

    return(
            <LinearGradient
                style={styles.container}
                colors={['#2980B9', '#6DD5FA','#FFFFFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
              <ScrollView>
                
               
                {alarmCards}


                
                </ScrollView>
               
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('Main')}>
                 <View style={styles.action}>
                     <Feather
                        name="arrow-left-circle"
                        color="white"
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
        marginTop: 150,
        height: 250,
        width: 450,
        
    },
    cardTitle:{
        justifyContent:'space-around',

    }
});