// Home Screen

// Welcome screen links to sign up and log in screen

import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { Switch } from "react-native-switch";
import GeoCoding from "../config/GeoCoding";
import GlobalApi from "../config/GlobalApi";
import { haversineDistance } from "../config/distanceCalculator";
import Header from "./Header";
import {styles} from "../css/HomeScreen_CSS";

const HomeScreen = ({ navigation }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => {
      const newState = !previousState;
      console.log("Switch state: " + newState);
      return newState;
    });
  };

  const [rawPlacesData, setRawPlacesData] = useState(null);
  const [processedPlaces, setProcessedPlaces] = useState([]);
  const [address, setAddress] = useState(null);

  const [selectedPlace, setSelectedPlace] = useState(null);

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
      const GetNearbyPlace = async () => {
        const location = `${currentLocation.latitude},${currentLocation.longitude}`;
        const radius = 1000; // 1000 meters (1 km)
        const type = "restaurant";

        const keywords = [
          "Japanese",
          "Korean",
          "Bakery",
          "Western",
          "Chinese",
          "Indian",
          "Thai",
          "Vietnamese",
          "Malay",
          "Fast Food",
        ];

        // Prepare all promises for the API calls
        const promises = keywords.map((keyword) =>
          GlobalApi.NewNearByPlace(location, radius, type, keyword).catch(
            (error) => {
              console.error("Error fetching nearby places:", error);
              return null; // Return null or an appropriate value to handle failed requests gracefully
            }
          )
        );

        // Wait for all promises to settle
        const results = await Promise.all(promises);

        // Process and update state once with all new data
        const allProcessedData = results.flatMap((resp, index) => {
          if (!resp) return []; // Skip processing if the response is null due to an error
          console.log("Response:", resp);
          return resp.results.map((place) => ({
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng,
            name: place.name,
            rating: place.rating || "No rating",
            cuisine: keywords[index],
            address: place.vicinity,
            imageUrl: place.photos
              ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=AIzaSyAOuEs_zxFDQXynk8YZx35_nNWwzpsQy78`
              : null,
          }));
        });

        // Update state once with all new data
        setProcessedPlaces((prevPlaces) => [
          ...prevPlaces,
          ...allProcessedData,
        ]);
      };

      GetNearbyPlace();
    }
  }, [currentLocation]); // Assuming `currentLocation` is stable or properly memoized

  useEffect(() => {
    if (rawPlacesData && rawPlacesData.results) {
      const processedData = rawPlacesData.results.map((place) => ({
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
        name: place.name,
        address: place.vicinity,
      }));

      setProcessedPlaces(processedData); // Update state with processed data
    }
  }, [rawPlacesData]); // This effect depends on rawPlacesData

  useEffect(() => {
    if (currentLocation) {
      GeoCoding.getAddress(currentLocation.latitude, currentLocation.longitude)
        .then((data) => {
          const address = data.results[0].formatted_address;
          setAddress(address);
        })
        .catch((error) => console.error("Error fetching address:", error));
    }
  }, [currentLocation]);

  const RestaurantDetailsScreen = ({ place, userLocation, onDismiss }) => {
    const distance = haversineDistance(
      userLocation.latitude,
      userLocation.longitude,
      place.latitude,
      place.longitude
    ).toFixed(2); // Round the distance to 2 decimal places

    return (
      <ScrollView
        style={styles.restaurantPopUp}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.contentContainer}>
          <Image source={{ uri: place.imageUrl }} style={styles.ImageDesign} />

          <View style={styles.textContainer}>
            <Text style={styles.calloutTitle}>{place.name}</Text>
            <Text style={styles.calloutDescription}>
              Rating: {place.rating}
            </Text>
            <Text style={styles.calloutDescription}>
              Cuisine: {place.cuisine}
            </Text>
            <Text style={styles.calloutDescription}>
              Address: {place.address}
            </Text>
            <Text style={styles.calloutDescription}>
              Distance: {distance} km
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("ReviewLandingPage")}
          style={styles.dismissButtonJiak}
        >
          <Text style={styles.JiakText}>Jiak!</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onDismiss} style={styles.dismissButtonClose}>
          <Text style={styles.CloseText}>X</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const displayRestaurantDetails = (
    processedPlaces,
    currentLocation,
    radius
  ) => {
    const nearbyPlaces = processedPlaces.filter((place) => {
      const distance = calculateDistance(place, currentLocation);
      return distance <= radius;
    });

    if (nearbyPlaces.length > 0) {
      return (
        <ScrollView style={styles.scollContainer}>
          {nearbyPlaces.map((place, index) => (
            <View style={styles.contentContainer}>
              <Image
                source={{ uri: place.imageUrl }}
                style={styles.ImageDesign}
              />
              <View style={styles.textContainer}>
                <Text style={styles.calloutTitle}>{place.name}</Text>
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
            </View>
          ))}
        </ScrollView>
      );
    } else {
      return <Text>No nearby restaurants found.</Text>;
    }
  };

  return (
    <View style={styles.headerContainer}>
      <View style>
        <Header />
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
                source={require("../assets/userIcon.png")}
                style={styles.icon}
              />

              <Callout>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutTitle}>Your Location</Text>
                  <Text style={styles.calloutDescription}>{address}</Text>
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
              onPress={() => setSelectedPlace(place)} // Set the selected place on press
            >
              <Image
                source={require("../assets/jiakIcon.png")}
                style={styles.restaurantIcon}
              />
            </Marker>
          ))}
        </MapView>
      )}

      {selectedPlace && (
        <RestaurantDetailsScreen
          place={selectedPlace}
          userLocation={currentLocation} // Pass the currentLocation as userLocation
          onDismiss={() => setSelectedPlace(null)}
        />
      )}

      {isEnabled &&
        displayRestaurantDetails(processedPlaces, currentLocation, 0.5)}

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
          activeText={"Notification On"}
          inActiveText={"Notification Off"}
          circleSize={30}
          barHeight={30}
          circleBorderWidth={2}
          backgroundActive={"green"}
          backgroundInactive={"#DC4731"}
          circleActiveColor={"#30a566"}
          circleInActiveColor={"#DC4731"}
          changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
          outerCircleStyle={{}} // style for outer animated circle
          switchLeftPx={1} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
          switchRightPx={1} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
          switchWidthMultiplier={7} // multiplied by the `circleSize` prop to calculate total width of the Switch
          switchBorderRadius={25}
        />
        {isEnabled && (
          <SwitchPopup isEnabled={isEnabled} toggleSwitch={toggleSwitch} />
        )}
      </View>
    </View>
  );
};

const SwitchPopup = ({ isEnabled, toggleSwitch }) => {
  return (
    <View style={styles.popupContainer}>
      {isEnabled && (
        <View>
          <Text style={styles.popupText}>Notifications turned on...</Text>
          <Text style={styles.popupText}>Looking for places to Jiak!</Text>
          <Button title="Close" onPress={toggleSwitch} />
        </View>
      )}
    </View>
  );
};

const calculateDistance = (place, userLocation) => {
  const distance = haversineDistance(
    userLocation.latitude,
    userLocation.longitude,
    place.latitude,
    place.longitude
  ).toFixed(2);
  return distance;
};


export default HomeScreen;
