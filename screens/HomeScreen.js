// Home Screen

// Welcome screen links to sign up and log in screen

import React, {useState}  from "react";
import { 
  Image,
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
  Dimensions
} from "react-native";
import colors from "../config/colors";

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


const HomeScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Home Screen!</Text>


      <MapView customMapStyle={styles.mapStyle} provider={PROVIDER_GOOGLE} style={styles.mapStyle} initialRegion={{
          latitude: 41.3995345,
          longitude: 2.1909796,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        }}mapType="standard"></MapView>


      <TouchableOpacity 
        style={styles.historyButton} 
        onPress={() => navigation.navigate ("DiningHistoryPage")}
      >
        <Image 
          style={styles.buttonImage}
          source={require('../assets/jiakIcon.png')} // replace with your button image path
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", // Centers objects according to the secondary axis
    justifyContent: "center", // Centers the object according to main axis
    backgroundColor: colors.primary, // primary colour
  },
  ImageDesign: {
    borderRadius: "130%",
    width: 250,
    height: 250,
  },
  welcomeText: {
    color: "#7F2B0F",
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#CD5C5C", // Replace with your desired button color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  historyButton: {
    position: 'absolute', // Position the button over the screen
    right: 10,            // Distance from the left
    bottom: 10,          // Distance from the bottom
    backgroundColor: "#CD5C5C", // Replace with your desired button color
    borderRadius: 35, // Ensure this is half of the width and height for a perfect circle
    overflow: 'hidden', // Ensures the image doesn't bleed outside the border radius  
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  buttonImage: {
    width: 70, // Set the width of your button image
    height: 70, // Set the height of your button image
    borderRadius: 70, // Makes the image round
  },
  signUpText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default HomeScreen;
