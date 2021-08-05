import React, { Component, useEffect, useState } from 'react';
import { View, Text, Image,StyleSheet,TouchableOpacity,ScrollView, Alert,SafeAreaView, Dimensions} from 'react-native';
import { Avatar, Button, Card, Title,Switch ,Paragraph} from 'react-native-paper';
import {LinearGradient} from 'expo-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { margin } from 'styled-system';


const LeftContent = props => <Avatar.Icon {...props} icon="water" />
const {height} = Dimensions.get('window');

export default class Workout extends Component{
    constructor(props){
        super(props);
        this.state ={
            loading: true,
            data:[],
            alarms: null
        }
    }
    state ={ 
        ScreenHeight: 0,
    }
onContentSizeChange =(contentWidth, contentHeight) =>{
    this.setState({ScreenHeight: contentHeight});
};

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
  
          fetch('https://health-n-wellness-prod.herokuapp.com/api/getAllHyAlarmsMobile', httpRequest)
          .then(this.checkResponse)
          .catch(function(error) { console.log(error); })
          .then(response => response.json())
          .then(responseData =>
          {
              if (responseData.error.length === 0)
              {
                  
                  console.log('Successfully got Workout alarms!');
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
                        colors={['#007991', '#78ffd6']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                <Card.Title
        
                    title="Hydration Time" 
                    left={LeftContent} 
                />
                <Card.Content>
                    <Title style={styles.design}>{alarm.item} </Title>
                    <Text style={styles.designs}>{alarm.time}</Text>
                    <Text style={styles.design2}>{daysRepeating.join(', ')}</Text>

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
                colors={['#007991', '#78ffd6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
        <Card.Title

            title="Hydration Time" 
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
    const scrollEnabled = this.state.ScreenHeight > height;
    const alarmCards = this.getAlarms();
    return(
            <LinearGradient
                style={styles.container}
                colors={['#2980B9', '#6DD5FA','#FFFFFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
            <Title style={styles.text}>WORKOUT NOTIFICATION:</Title>
            <SafeAreaView style= {styles.contain}>
              <ScrollView 
              style={{flex: 1}}
              contentContainerStyle = {styles.scollview}
              scrollEnabled={scrollEnabled}
              onContentSizeChange={this.onContentSizeChange}
              >
                
               
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
                </SafeAreaView>
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
    contain:{
        flex: 1,
    },
    scollview:{
        flexGrow: 1,
        marginVertical: 20,
    },
    action:{
        position: 'absolute',
        bottom: 750,
        right: 350,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        paddingBottom: 5
    },
    cards:{
        marginTop:140,
        height: 250,
        width: 390,
        maxHeight: 60,
        justifyContent:'space-evenly'
        
    },
   
    design:{
        fontSize: 30,
        textAlign: 'center',
        top: -20, 
        color: 'white'
    },
    designs:{
        fontSize: 20,
        textAlign: 'center',
        fontStyle: 'italic',
        top: -16,     
        color: 'black'
    },
    design2:{
        fontSize: 20,
        textAlign: 'center',
        fontStyle: 'italic',
        top: -13, 
        color: 'red'    
    },
    text:{
        position:'absolute',
        fontSize: 35,
        top: 70,
    }
   
});