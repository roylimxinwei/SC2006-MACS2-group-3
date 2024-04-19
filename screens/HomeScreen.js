import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import { doc, getDoc } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import {
	Button,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import MapView, {
	Callout,
	Circle,
	Marker,
	PROVIDER_GOOGLE,
} from "react-native-maps";
import { Switch } from "react-native-switch";
import GeoCoding from "../config/GeoCoding";
import GlobalApi from "../config/GlobalApi";
import MapViewStyle from "../config/MapViewStyle.json";
import { haversineDistance } from "../config/distanceCalculator";
import { cuisines as supportedCuisine } from "../config/supportedCuisine";
import { styles } from "../css/HomeScreen_CSS";
import { auth, db } from "../firebase";
import Header from "./Header";

/**
 * Displays the main home screen with a map and various features such as restaurant locations,
 * user preferences for cuisine, and real-time location updates.
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - Navigation object for screen transitions.
 * @param {Object} props.route - Route object, not used but here for completeness.
 */
const HomeScreen = ({ navigation, route }) => {
	const [currentUser, setCurrentUser] = useState("");
	// const proximity = 1; // proximity in user preference (500 meters here)
	const [currentLocation, setCurrentLocation] = useState(null);
	const [initialRegion, setInitialRegion] = useState(null);
	const [isEnabled, setIsEnabled] = useState(false);
	const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
	const [selectedPlaceId, setSelectedPlaceId] = useState(null);
	const [proximity, setProximity] = useState(1);
	const [cuisines, setCuisines] = useState([]);
	const [minRating, setMinRating] = useState(3);

	const [rawPlacesData, setRawPlacesData] = useState(null);
	const [processedPlaces, setProcessedPlaces] = useState([]);
	const [address, setAddress] = useState(null);
	const [selectedPlace, setSelectedPlace] = useState(null);


	/**
	 * Fetches the current user's data from Firebase Firestore.
	 */
	const fetchData = async () => {
		let user = auth.currentUser;
		const docRef = doc(db, "users", user.uid);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			console.log(docSnap.data().name);
			setCurrentUser(docSnap.data().name);
			setProximity(docSnap.data().proximity / 1000);
			setMinRating(docSnap.data().restaurantRating);
			setCuisines(docSnap.data().cuisines);
			console.log(proximity, cuisines, minRating);
		} else {
			console.log("No document exists");
		}
	};

	/***
	 * This function is called everytime the Home Screen is navigated (eg from resturant experience page)
	 * This ensures that user preferences are refreshed after every time user edit his preferences
	 */
	useFocusEffect(
		useCallback(() => {
			fetchData(currentUser);
			console.log("Home Screen focused");
		}, []) // Empty dependency array means this effect runs on focus without dependencies
	);

	/**
	 * Logs current user settings when component is focused.
	 */
	useEffect(() => {
		console.log(proximity, cuisines, minRating);
	}, [proximity, cuisines, minRating]);

	useEffect(() => {
		fetchData();
	}, []);

	/**
	 * Toggle for the notification switch on the home screen.
	 */
	const toggleSwitch = () => {
		setIsEnabled((previousState) => {
			const newState = !previousState;
			console.log("Switch state: " + newState);
			return newState;
		});
	};

	/**
	 * Handles navigation to the review landing page for a selected place.
	 */
	const jiakButtonPressed = () => {
		// console.log(selectedPlace)
		navigation.navigate("ReviewLandingPage", selectedPlace);
	};
	
	/**
	 * Gets the current location of the device.
	 */
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

	/**
	 * Retrieves nearby places from a custom API based on user's current location.
	 */
	useEffect(() => {
		if (currentLocation) {
			const GetNearbyPlace = async () => {
				const location = `${currentLocation.latitude},${currentLocation.longitude}`;
				const radius = 1000; // hardcoded to 1km. This means that the map will display all restaurants within 1km of the user's location on the map
				// did not use proximity here as proximity refers to the distance for notif pop up
				const type = "restaurant";
				const keywords = supportedCuisine;

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
						price_level: place.price_level,
						place_id: place.place_id,
						rating: place.rating || "No rating",
						cuisine: keywords[index],
						address: place.vicinity,
						imageUrl:
							place.photos && place.photos.length > 0
								? {
										uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=AIzaSyAjbOeXgrY01MK0CSkd-M4IKI_kxvCqzac`,
									}
								: require("../assets/no_image.jpg"),
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

	/**
	 * Displays restaurant details in a scrollable view.
	 */
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
					<Image source={place.imageUrl} style={styles.ImageDesign} />

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
					onPress={jiakButtonPressed}
					style={styles.dismissButtonJiak}
				>
					<Text style={styles.JiakText}>Jiak!</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={onDismiss} style={styles.dismissButtonClose}>
					<Text style={styles.CloseText}>X</Text>
				</TouchableOpacity>

				<View style={styles.ReviewButtonView}>
					<TouchableOpacity
						onPress={() => {
							if (place) {
								console.log("Pdsd2", place.place_id);
								navigation.navigate("UserReviewScreen", {
									placeId: place.place_id,
								});
								console.log("Pdsd6", place.place_id);
							} else {
								console.log("Error", place.id);
							}
						}}
						style={styles.UserReviewButton}
					>
						<Text style={styles.ReviewText}>View Google Review</Text>
					</TouchableOpacity>
				</View>
				<Text style={styles.pad}>for padding</Text>
			</ScrollView>
		);
	};

	/**
	 * Filters and displays restaurants based on user's proximity, cuisine preferences, and minimum rating.
	 */
	const displayRestaurantDetails = (
		processedPlaces,
		currentLocation,
		proximity,
		minRating,
		cuisines
	) => {
		const nearbyPlaces = processedPlaces.filter((place) => {
			// Filter the places based on the current location and radius
			const distance = calculateDistance(place, currentLocation);
			const isWithinProximity =
				parseFloat(distance).toFixed(2) <= parseFloat(proximity).toFixed(2);
			const isAboveRating =
				parseFloat(place.rating).toFixed(2) >= parseFloat(minRating).toFixed(2);
			const hasCuisine = cuisines.includes(place.cuisine);

			return isWithinProximity && isAboveRating && hasCuisine;
		});

		if (nearbyPlaces.length > 0) {
			// Slice the nearest 3 restaurants
			const limitedNearbyPlaces = nearbyPlaces.slice(0, 3); //change the number to show how many u want to see

			if (limitedNearbyPlaces.length > 0) {
				// Display the limited list of restaurants
				return (
					<ScrollView style={styles.scrollContainer}>
						{limitedNearbyPlaces.map((place, index) => (
							<View style={styles.contentContainer} key={index}>
								<Image source={place.imageUrl} style={styles.ImageDesign} />
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
									<TouchableOpacity
										onPress={() =>
											navigation.navigate("ReviewLandingPage", place)
										}
										style={styles.dismissButtonJiak}
									>
										<Text style={styles.JiakText}>Jiak!</Text>
									</TouchableOpacity>
								</View>
							</View>
						))}
						<Text style={styles.pad2}>for padding</Text>
					</ScrollView>
				);
			} else {
				// Display a message if there are no nearby restaurants in the limited list
				return <Text>No nearby restaurants found (limited to 3 results).</Text>;
			}
		} else {
			// Display the original message if no nearby restaurants were found
			return <Text>No nearby restaurants found.</Text>;
		}
	};

	return (
		<View style={styles.headerContainer}>
			{currentUser && <Header username={currentUser} />}
			{initialRegion && (
				<MapView
					style={styles.map}
					initialRegion={initialRegion}
					provider={PROVIDER_GOOGLE}
					customMapStyle={MapViewStyle}
				>
					{processedPlaces.map((place, index) => (
						<Marker
							key={index}
							coordinate={{
								latitude: place.latitude,
								longitude: place.longitude,
							}}
							title={place.name}
							onPress={() => setSelectedPlace(place)}
						>
							<Image
								source={require("../assets/jiakIcon.png")}
								style={styles.restaurantIcon}
							/>
						</Marker>
					))}
					
					{currentLocation && (
						<>
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
							<Circle
								center={{
									latitude: currentLocation.latitude,
									longitude: currentLocation.longitude,
								}}
								radius={proximity * 1000} // radius in meters (1 km in this example)
								strokeColor="rgba(0, 136, 255, 0.8)" // The border color of the circle
								fillColor="rgba(0, 136, 255, 0.3)" // The fill color of the circle
								strokeWidth={2} // The width of the circle border
							/>
						</>
					)}


				</MapView>
			)}

			{selectedPlace && ! isEnabled && (
				<RestaurantDetailsScreen
					place={selectedPlace}
					//   place_id={selectedPlace?.place_id} // Pass the place_id as a prop
					userLocation={currentLocation} // Pass the currentLocation as userLocation
					onDismiss={() => setSelectedPlace(null)}
				/>
			)}

			{isEnabled &&
				displayRestaurantDetails(
					processedPlaces,
					currentLocation,
					proximity,
					minRating,
					cuisines
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
				style={styles.weatherButton}
				onPress={() => navigation.navigate("WeatherPage")}
			>
				<Image
					style={styles.buttonImage}
					source={require("../assets/weatherimage.png")} // replace with your button image path
				/>
			</TouchableOpacity>
			

			{!isEnabled && (
				<View style={styles.buttonscontainer}>
					<TouchableOpacity
						style={styles.historyButton}
						onPress={() => navigation.navigate("DiningHistoryPage")}
					>
						<Image
							style={styles.buttonImage}
							source={require("../assets/diningHistory.png")} // replace with your button image path
						/>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.userButton}
						onPress={() => navigation.navigate("User")}
					>
						<Image
							style={styles.buttonImage}
							source={require("../assets/friendmenu.png")} // replace with your button image path
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.feedbackButton}
						onPress={() => navigation.navigate("UserFeedBack")}
					>
						<Image
							style={styles.buttonImage}
							source={require("../assets/feedback.png")} // replace with your button image path
						/>
					</TouchableOpacity>
				</View>
			)}
			

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
					<TouchableOpacity style={styles.popupButton} onPress={toggleSwitch}>
						<Text style={styles.popupButtonText}>Close</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};

/**
 * Calculates the distance between the user's location and a given place.
 * @param {Object} place The place object containing latitude and longitude.
 * @param {Object} userLocation The user's current location object.
 * @returns {string} The calculated distance in kilometers formatted to two decimal places.
 */
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
