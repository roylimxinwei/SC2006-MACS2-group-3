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
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import colors from "../config/colors";
import Header from "./Header";
import { Switch } from 'react-native-switch';
import GlobalApi from "../config/GlobalApi";
import GeoCoding from "../config/GeoCoding";

const HomeScreen = ({ navigation }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [rawPlacesData, setRawPlacesData] = useState(null);
  const [processedPlaces, setProcessedPlaces] = useState([]);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      const newInitialRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
      
      setInitialRegion(newInitialRegion);
      console.log("Initial Region Set: ", newInitialRegion);
    };

      getLocation();
  }, []);

  useEffect(() => {
    if (currentLocation) {
      GetNearbyPlace();
    }
  }, [currentLocation]);

  const GetNearbyPlace = () => {
    // Assuming `currentLocation` is defined and has `latitude` and `longitude` properties
    const location = `${currentLocation.latitude},${currentLocation.longitude}`;
    const radius = 1000; // 1000 meters (1 km)
    const type = 'restaurant';
    
    GlobalApi.NewNearByPlace(location, radius, type).then((resp) => {
      const processedData = resp.results.map(place => ({
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
        name: place.name,
        rating: place.rating || 'No rating',
        cuisine: place.types?.[0] || 'Unknown',
        address: place.vicinity
      }));
      setProcessedPlaces(processedData);
      console.log("API Response:", resp);
    }).catch((error) => {
      console.error('Error fetching nearby places:', error);
    });
  }

  useEffect(() => {
    if (rawPlacesData && rawPlacesData.results) {
      const processedData = rawPlacesData.results.map(place => ({
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
        name: place.name,
        address: place.vicinity
      }));
      
      setProcessedPlaces(processedData); // Update state with processed data
    }
  }, [rawPlacesData]); // This effect depends on rawPlacesData

  useEffect(() => { 
    if (currentLocation) {
      GeoCoding.getAddress(currentLocation.latitude, currentLocation.longitude)
        .then(data => {
          const address = data.results[0].formatted_address;
          setAddress(address);
        })
        .catch(error => console.error('Error fetching address:', error));
    }
  }, [currentLocation]);

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
            >
              <Image
                source={require('../assets/userIcon.png')}
                style={styles.icon}
              />

              <Callout>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutTitle}>Your Location</Text>
                  <Text style={styles.calloutDescription}> 
                    {address}
                  </Text>
                </View>
              </Callout> 

            </Marker>
          )}
          
          {processedPlaces.map((place, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: place.latitude,
                longitude: place.longitude,
              }}
              title={place.name}
            >
            <Image
                source={require("../assets/jiakIcon.png")}
                style={styles.restaurantIcon}
              />
            <Callout>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>
                  {place.name}
                </Text>
                <Text style={styles.calloutDescription}>
                  Rating: {place.rating}
                </Text>
                <Text style={styles.calloutDescription}>
                  Cuisine: {place.cuisine}
                </Text>
                <Text style={styles.calloutDescription}> 
                  Address: {place.address}
                </Text>
              </View>
            </Callout>
            </Marker>
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
  restaurantIcon: {
    width: 30,
    height: 30,
    borderRadius: 15, // Half of the width and height to make it circular
    backgroundColor: 'rgba(255, 0, 0, 0.5)', // Red color with 50% opacity
  },
  historyButton: {
    position: "absolute", // Position the button over the screen
    right: 20, // Distance from the left
    top: 650, // Distance from the bottom
    backgroundColor: "#CD5C5C", // Replace with your desired button color
    borderRadius: 35, // Ensure this is half of the width and height for a perfect circle
    overflow: "hidden", // Ensures the image doesn't bleed outside the border radius
  },
  icon :{
    width: 40, // Set the width of your image
    height: 40, // Set the height of your image to the same value to maintain aspect ratio
    borderRadius: 20, // Half the width or height to make it round
  },
  calloutContainer: {
    width: 200,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  calloutDescription: {
    fontSize: 14,
  },
});

export default HomeScreen;
