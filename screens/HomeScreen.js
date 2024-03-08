// Home Screen

// Welcome screen links to sign up and log in screen


import React, { useState, useEffect, useContext } from "react";
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
import Header from "./Header";
import { Switch } from 'react-native-switch';
import GlobalApi from "../config/GlobalApi";

const HomeScreen = ({ navigation }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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
  }, []);

  useEffect(() => {
    currentLocation && GetNearbyLocation();
  }, [currentLocation]);

  const GetNearbyLocation = () => {
    const data = {
      includedTypes: ["restaurant"],
      maxResultCount: 10,
      locationRestriction: {
        circle: {
          center: {
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          },
          radius: 500.0,
        },
      },
    };

    GlobalApi.NewNearByPlace(data).then((resp) => {
      console.log(resp.data);
    });
  }

  return (
    <View style={styles.headerContainer}>
      <View style>
         <Header/>
      </View>
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
          {/* {restaurants.map((restaurant, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: restaurant.latitude,
                longitude: restaurant.longitude,
              }}
              title={restaurant.name}
            />
          ))} */}
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

      <View style={styles.switch}>

      <Switch
        value={isEnabled}
        onValueChange={toggleSwitch}
        activeText={'Notification On'}
        inActiveText={'Notification Off'}
        circleSize={30}
        barHeight={30}
        circleBorderWidth={2}
        backgroundActive={'green'}
        backgroundInactive={'#DC4731'}
        circleActiveColor={'#30a566'}
        circleInActiveColor={'#DC4731'}
        changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
        outerCircleStyle={{}} // style for outer animated circle
        switchLeftPx={1} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
        switchRightPx={1} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
        switchWidthMultiplier={7} // multiplied by the `circleSize` prop to calculate total width of the Switch
        switchBorderRadius={25}
      />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer:{
    position:"absolute",
    width:"100%",
  },
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
  button: {
    position: "absolute",
    top:60,
    right:20,
    backgroundColor: "#CD5C5C",
    marginBottom: 10,
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
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
  switch:{
    position:"absolute",
    top:100,
    left:20,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  historyButton: {
    position: "absolute", // Position the button over the screen
    right: 20, // Distance from the left
    top: 650, // Distance from the bottom
    backgroundColor: "#CD5C5C", // Replace with your desired button color
    borderRadius: 35, // Ensure this is half of the width and height for a perfect circle
    overflow: "hidden", // Ensures the image doesn't bleed outside the border radius
  },
});

export default HomeScreen;
