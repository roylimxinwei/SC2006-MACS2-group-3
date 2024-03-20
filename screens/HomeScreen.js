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
import colors from "../config/colors";
import { haversineDistance } from "../config/distanceCalculator";
import Header from "./Header";

const screenHeight = Dimensions.get("window").height;

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
        <ScrollView>
          {nearbyPlaces.map((place, index) => (
            <RestaurantDetailsScreen
              key={index}
              place={place}
              userLocation={currentLocation}
              onDismiss={() => setSelectedPlace(null)}
            />
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

      {displayRestaurantDetails(processedPlaces, currentLocation, 0.5)}

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

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    width: "100%",
  },

  dismissButtonJiak: {
    backgroundColor: colors.tertiary,
    position: "absolute",
    top: 125,
    right: 145,
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 35,
    paddingLeft: 35,
    borderRadius: 15,
  },
  JiakText: {
    fontSize: 16,
  },
  CloseText: {
    fontSize: 16,
  },
  dismissButtonClose: {
    position: "absolute",
    top: 3,
    right: -15,
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 35,
    paddingLeft: 35,
    borderRadius: 15,
  },
  container: {
    flex: 1,
    alignItems: "center", // Centers objects according to the secondary axis
    justifyContent: "center", // Centers the object according to main axis
    backgroundColor: colors.primary, // primary colour
  },
  ImageDesign: {
    width: 100,
    height: 100,
    marginRight: 10, // Add some space between the image and the text
  },
  button: {
    position: "absolute",
    top: 60,
    right: 20,
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
  switch: {
    position: "absolute",
    top: 100,
    left: 20,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  restaurantIcon: {
    width: 30,
    height: 30,
    borderRadius: 15, // Half of the width and height to make it circular
    backgroundColor: "rgba(255, 0, 0, 0.5)", // Red color with 50% opacity
  },
  historyButton: {
    position: "absolute", // Position the button over the screen
    right: 20, // Distance from the left
    top: 650, // Distance from the bottom
    backgroundColor: "#CD5C5C", // Replace with your desired button color
    borderRadius: 35, // Ensure this is half of the width and height for a perfect circle
    overflow: "hidden", // Ensures the image doesn't bleed outside the border radius
  },
  icon: {
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
  restaurantPopUp: {
    position: "absolute",
    top: (screenHeight * 2) / 3, // Set top to 2/3 of the screen height
    left: 0,
    right: 0,
    height: screenHeight / 3,
    backgroundColor: colors.primary,
    zIndex: 2,
  },
  contentContainer: {
    flexDirection: "row", // Align children horizontally
    padding: 10, // Add some padding around the content
  },
  textContainer: {
    flex: 1, // Take up remaining space
    justifyContent: "center", // Center text vertically
  },
  popupContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    padding: 10,
    zIndex: 1,
  },
  popupText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default HomeScreen;
