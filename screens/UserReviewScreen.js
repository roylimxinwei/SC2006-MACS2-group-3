import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import GlobalApi from "../config/GlobalApi";
import { styles } from "../css/UserReviewScreen_CSS";

/**
 * Screen that fetches and displays reviews for a specific place.
 * Users are allowed to see reviews based on the place ID passed via navigation params.
 * @param {Object} props - Component props.
 * @param {Object} props.route - Route object containing parameters and navigation stack.
 * @param {Object} props.navigation - Navigation object to enable navigating to other screens.
 */
const UserReviewScreen = ({ route, navigation }) => {
	const { placeId } = route.params;
	const [reviews, setReviews] = useState([]);
	const [userLocation, setUserLocation] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const API_KEY = "AIzaSyAjbOeXgrY01MK0CSkd-M4IKI_kxvCqzac";

	/**
	 * Requests user's location permission and sets location.
	 */
	useEffect(() => {
		const getLocation = async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
			console.log("Permission to access location was denied");
			return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setUserLocation(location.coords);
		};

		getLocation();
	}, []);

	/**
	 * Fetches reviews for the place identified by `placeId` using the Google Places API.
	 */
	useEffect(() => {
		console.log(placeId, userLocation);
		const fetchReviews = async () => {
			if (!placeId || !userLocation) {
				console.log("Missing placeId or userLocation");
				return;
			}

			const params = {
				place_id: placeId,
				key: API_KEY,
				fields: "reviews",
			};

			try {
				console.log("Fetching reviews with params:", params);
				const response = await GlobalApi.GetReviews(params);
				const reviewsData = response.result.reviews || [];
				console.log("Fetched reviews:", reviewsData);
				setReviews(reviewsData);
			} catch (error) {
				console.error("Error fetching reviews:", error);
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchReviews();
	}, [placeId, userLocation]);

	/**
	 * Renders reviews or messages depending on the state of the data fetch.
	 */
	const displayReviews = () => {
		if (loading) {
			return <Text>Loading reviews...</Text>;
		}

		if (error) {
			return <Text>Error fetching reviews. Please try again later.</Text>;
		}

		if (reviews.length > 0) {
			return (
				<ScrollView style={styles.reviewsContainer}>
					{reviews.map((review, index) => (
						<View style={styles.reviewContainer} key={index}>
							<Text style={styles.reviewAuthor}>
								{review.author_name} - {review.rating} ⭐
							</Text>
							<Text style={styles.reviewText}>{review.text}</Text>
						</View>
					))}
					<TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.backbutton}>
						<Text style={styles.buttonText}>Back</Text>
					</TouchableOpacity>
				</ScrollView>
			);
		} else {
			return <Text>No reviews found.</Text>;
		}
	};

	return <View style={styles.container}>{displayReviews()}</View>;
};

export default UserReviewScreen;
