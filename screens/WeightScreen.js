import React, { Component,useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity,ScrollView,} from 'react-native';
import { Avatar, Button, Card, Title,Switch ,Paragraph} from 'react-native-paper';
import {LinearGradient} from 'expo-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LeftContent = props => <Avatar.Icon {...props} icon="weight" />

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
                  this.setState({ alarms: responseData.result })
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

getAlarms = () =>{
    let alarms = this.state.alarms;
    if (alarms)
    {
        let cards = [];
        
        cards.push(
            <Card style={styles.cards}>
                <LinearGradient
                    style = {styles.card}
                    colors={['#c6ffdd', '#fbd786','#f7797d']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
           
           
           
           
            <Card.Title
    
                title="Weight Tracking" 
                left={LeftContent} 
            />
            <Card.Content>
                <Title style={{textAlign:'center', bottom: 15, fontSize:24}}>Weight Goal: {alarms}% </Title>
                <Text style={{textAlign:'center'}}></Text>

                </Card.Content>
                
            </LinearGradient>
            </Card>
        );
       

        return (<View>{cards}</View>);
    }
    else
    {
        let cards = [];
        cards.push(
        <Card style={styles.cards}>
            <LinearGradient
                style = {styles.card}
                colors={['#c6ffdd', '#fbd786','#f7797d']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >

            <View>
            <Image
                style={styles.image}
                source={require('../assets/WeightTracker.png')} />  
            </View>

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
                <View>
            <Image
                style={styles.image}
                source={require('../assets/WeightTracker.png')} />  
            </View>


                
               
                {alarmCards}


                
               
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
    contain:{
        flex: 1,
    },
    scollview:{
        flexGrow: 1,
        marginVertical: 20,
    },
    action:{
        position: 'absolute',
        bottom: 428,
        right: 150,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        paddingBottom: 5
    },
    cards:{
        height: 150,
        width: 290,
        justifyContent:'space-evenly',
        borderRadius: 25

        
    },
   
    design:{
        fontSize: 29,
        textAlign: 'center',
        top: -10, 
        color: 'white'
    },
    designs:{
        fontSize: 100,
        textAlign: 'center',
        fontStyle: 'italic',     
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
    },
    image:{
        position:'absolute',
          top: -440,
          width: 305,
          height: 289,
          right: -165,
          resizeMode: 'contain',
         },
         card:{
             
            borderRadius: 10,
            borderTopStartRadius: 40,
            borderBottomWidth:40
    
        }
   
});