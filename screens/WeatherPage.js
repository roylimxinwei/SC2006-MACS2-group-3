// WeatherPage.js

import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import colors from "../config/colors";

const WeatherPage = ({navigation}) => {

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
            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.backButton}>
              <Text style={styles.backButtonText}>X</Text>
            </TouchableOpacity>
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
  backButton: {
    backgroundColor: colors.tertiary,
    // paddingVertical: 10,
    // paddingHorizontal: 50,
    width: 40,
    height: 40,
    borderRadius: 20,
    // margin: 10,
    marginTop: 20,
    marginLeft:20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 10,
    top:0,
    // left: 0,
    },
    backButtonText: {
    color: "#7F2B0F",
    // color: "#FFFFFF",
    // color: colors.secondary,
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default WeatherPage;