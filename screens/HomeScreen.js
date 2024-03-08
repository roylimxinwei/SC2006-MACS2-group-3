// Home Screen

// Welcome screen links to sign up and log in screen


import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import colors from "../config/colors";
//import GlobalApi from "../config/GlobalApi";

const HomeScreen = ({ navigation }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
    
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
    
      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
      console.log("Initial Region: ", initialRegion);
    };

    getLocation();
    
    // useEffect(()=>{
    //   location&&GetNearbyLocation();
    // },[location])

    // const GetNearbyLocation = ()=>{
    //   const data ={
    //     "includedTypes": ["restaurant","bakery","cafe"],
    //     "maxResultCount": 10,
    //     "locationRestriction": {
    //       "circle": {
    //         "center": {
    //           "latitude": location?.latitude,
    //           "longitude": location?.longtitude},
    //         "radius": 500.0
    //   }}}
    //   GlobalApi.NewNearByPlace(data).then(resp =>{
    //     console.log(resp.data);
    //   })
    // }

  //   const fetchRestaurants = async () => {
  //     try {
  //       const data = require("./restaurants.json");
  //       console.log(data);
  //       setRestaurants(data);
  //     } catch (error) {
  //       console.error("Error fetching restaurants:", error);
  //     }
  //   };

  //   fetchRestaurants();
  // }, []);

  return (
    <View style={styles.container}>
      {initialRegion && (
        <MapView style={styles.map} initialRegion={initialRegion}>
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="Your Location"
            />
          )}
          {restaurants.map((restaurant, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: restaurant.latitude,
                longitude: restaurant.longitude,
              }}
              title={restaurant.name}
            />
          ))}
        </MapView>
      )}


      <TouchableOpacity
        onPress={() => navigation.navigate("ViewProfile")} // Replace 'HomeScreen' with your home screen route name
        style={styles.button}
      >
        <Image
          style={styles.buttonImage}
          source={require("../assets/profileicon.png")} // replace with your button image path
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.historyButton}
        onPress={() => navigation.navigate("DiningHistoryPage")}
      >
        <Image
          style={styles.buttonImage}
          source={require("../assets/jiakIcon.png")} // replace with your button image path
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.notificationsButton}
        onPress={() => setNotificationsEnabled(!notificationsEnabled)}
      >
        <Image
          style={styles.notificationsButtonImage}
          source={
            notificationsEnabled
              ? require("../assets/notifon.png")
              : require("../assets/notifoff.png")
          }
        />
      </TouchableOpacity>
    </View>
  );
});

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
  // welcomeText: {
  //   color: "#7F2B0F",
  //   fontSize: 24,
  //   marginBottom: 0,
  //   position: "absolute",
  //   top: 40,
  // },
  button: {
    position: "absolute",
    top:20,
    right:20,
    backgroundColor: "#CD5C5C",
    marginBottom: 10,
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  notificationsButton: {
    position: "absolute",
    top: 100,
    right: 30,
    backgroundColor: "transparent",
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  notificationsButtonImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  // buttonText: {
  //   color: "#FFFFFF",
  //   fontSize: 18,
  // },
  buttonImage: {
    width: 70, // Set the width of your button image
    height: 70, // Set the height of your button image
    borderRadius: 70, // Makes the image round
  },
  signUpText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  historyButton: {
    position: "absolute", // Position the button over the screen
    right: 20, // Distance from the left
    bottom: 20, // Distance from the bottom
    backgroundColor: "#CD5C5C", // Replace with your desired button color
    borderRadius: 35, // Ensure this is half of the width and height for a perfect circle
    overflow: "hidden", // Ensures the image doesn't bleed outside the border radius

  },
});

export default HomeScreen;
