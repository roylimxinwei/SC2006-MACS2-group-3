// WeatherPage.js

import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground } from 'react-native';

const WeatherPageSunny = () => {

  return (
        <View style={styles.container} >
          
          <Text style={styles.city}>City: Singapore</Text>
          <Text style={styles.temperature}>
            Temperature: 32 &#8451;
          </Text>
          <View style={styles.ImageBox}>
            <Image source={require("../assets/sunnyday.png")} style={styles.ImageDesignSunny} /> 
          </View> 
          <Text style={styles.weather}>
            So Sunny!  
          </Text>    
          <Text style={styles.weathertext}>
            Go out and explore Jiak places!
          </Text>
          {/* <View style={styles.ImageBox}>
            <Image source={require("../assets/cloudyday.png")} style={styles.ImageDesignCloudy} /> 
          </View> 
          <Text style={styles.weather}>
            Its Mostly Cloudy!  
          </Text>    
          <Text style={styles.weathertext}>
            Go out and explore Jiak places!
          </Text>       */}

          {/* <View style={styles.ImageBox}>
            <Image source={require("../assets/rainyday.png")} style={styles.ImageDesignRainy} />
          </View>  
          <Text style={styles.weather}>
            Its Raining!  
          </Text>    
          <Text style={styles.weathertext}>
            Bring an umbrella to Jiak places!
          </Text>       */}

        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    //backgroundColor:"#99B4B3", //FOR CLOUDY DAY
    backgroundColor:"#FFBF00",//FOR SUNNY DAY
    //backgroundColor:"#AFB1D0", //FOR RAINY DAY
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  weather: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 42,
    color: "#FFFADA",
    bottom:100,
    position:"absolute",
    left:20,
  },
  ImageDesignSunny: {
    width: 350,
    height: 350,
    marginTop:40, // Add some space between the image and the text
  },
  ImageDesignRainy: {
    width: 550,
    height: 550,
    marginLeft:-110,
    marginTop: -10, // Add some space between the image and the text
  },
  ImageDesignCloudy: {
    width: 450,
    height: 450,
    marginLeft:-55,
// Add some space between the image and the text
  },
  ImageBox:{
    justifyContent: 'center',
    alignContent:'center',
    position:'relative',
  },
  weathertext: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 22,
    color: "#FFFADA",
    bottom:60,
    position:"absolute",
    left:20,
  },
  temperature: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 22,
  },
  city: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 22,
  },
});

export default WeatherPageSunny;