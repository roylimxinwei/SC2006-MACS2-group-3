import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../css/ReviewLandingPage_CSS";

/**
 * The landing page for reviews where users can either navigate to review the restaurant
 * or enter a referral code if they have one.
 * @param {Object} props - Component props.
 * @param {Object} props.route - Route object containing any parameters passed to this screen.
 * @param {Object} props.navigation - Navigation object to enable navigating to other screens.
 */
const ReviewLandingPage = ({ route, navigation }) => {
	//route will contain the params
	// const {name, rating, cuisine, address, imageURL} = route.params;
	const selectedRestaurant = route.params;

	/**
	 * Navigates to the ReviewPage, passing along the selected restaurant details.
	 */
	const handleReviewsPress = () => {
		navigation.navigate("ReviewPage",selectedRestaurant);
	};

	/**
	 * Navigates to the InputReferralCodePage, passing along the selected restaurant details.
	 */
	const handleReviewsPressReferral = () => {
		navigation.navigate("InputReferralCodePage", selectedRestaurant);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.smallText}>Dining at:</Text>
			<Text style={styles.smallText}>{selectedRestaurant.name}</Text>
			<TouchableOpacity
				style={styles.smallButton}
				onPress={handleReviewsPressReferral}
			>
				<Text style={styles.smallButtonText}>Have a referrel code?</Text>
			</TouchableOpacity>
			<Image
				source={require("../assets/eating.png")}
				style={styles.ImageDesign}
			/>
			<Text style={styles.welcomeText}>How was your meal?</Text>
			<TouchableOpacity style={styles.button} onPress={handleReviewsPress}>
				<Text style={styles.buttonText}>Review</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ReviewLandingPage;
