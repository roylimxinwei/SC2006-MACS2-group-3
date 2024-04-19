import React, {useEffect, useState } from "react";
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    Button,
	ScrollView,
	Alert
} from "react-native";
import { auth, db, storage} from '../firebase';
import { doc, setDoc, getDoc, updateDoc, getDocs, collection, Timestamp} from "firebase/firestore"; 
import { signOut } from "firebase/auth";
import { styles } from "../css/ViewProfile_CSS";  
import { useIsFocused } from "@react-navigation/native";
import { cuisines , cuisineImage } from "../config/supportedCuisine";

/**
 * Screen where users can view and edit their profile information.
 * Allows editing preferences and signing out.
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - Navigation object for screen transition.
 */
const ViewProfile = ({ navigation }) => {

	const isFocused = useIsFocused();

	const [username, setUsername] = useState("");
	const [selectedInterests, setSelectedInterests] = useState([]);
	const [ratings, setRatings] = useState("");
	const [proximity, setProximity] = useState("");
	const [operationStatus, setOperationStatus] = useState("");
	const [referralCode, setReferralCode] = useState("");
	const [referralCodeUsed, setReferralCodeUsed] = useState("");

	/**
     * Handles the sign-out process.
     */
	const handleSignout = () =>{
		Alert.alert(
		'Sign Out Confirmation',
		'Are you sure you want to Sign Out?', // <- this part is optional, you can pass an empty string
		[
			{text: 'Yes', onPress: async () => 
			await signOut(auth)
			.then(
			alert("You are signed out!"),
			navigation.navigate("LogInPage") 
			)
			
		},
			{text: 'No', onPress: () => console.log('OK Pressed')}

		],
		{cancelable: true},
		);
	}

	const fetchData = async () =>{
		let user = auth.currentUser;
		// setCurrentUser(user)
		// User is signed in
		const docRef = doc(db, "users", user.uid);
		const docSnap = await getDoc(docRef);
		console.log(docSnap.data())
		if (docSnap.exists()) {
			setUsername(docSnap.data().name);
			setSelectedInterests(docSnap.data().cuisines)
			setRatings(docSnap.data().restaurantRating)
			setProximity(docSnap.data().proximity)
			setOperationStatus(docSnap.data().operationStatus)
			setReferralCode(docSnap.data().referralCode)
			setReferralCodeUsed(docSnap.data().referralCodeUsed)
		}
	}

	/**
	 * Fetches user data from Firestore when the screen is focused.
	 */
	useEffect(() => {
		if(isFocused){ 
			fetchData();
		}
	}, [navigation, isFocused]);

	return (
		<ScrollView contentContainerStyle={styles.scrollContainer}>
			<View style={styles.viewProfile}>
				<View style={styles.detailContainer}>
					<Image
						source={require("../assets/profileicon.png")}
						style={styles.ImageDesign}
					/>
					<View style={styles.profileDetails}>
						<Text style={styles.username}>{username}</Text>
						<TouchableOpacity 
							onPress={() => navigation.navigate("SelectCuisine")}
						>
							<Text style={styles.editProfile}>Edit Profile</Text>
						</TouchableOpacity>
						
						<View>
							<Text style={styles.referralCode}>Eater's Code:</Text>
							<Text style={styles.referralCodeText}>{referralCode}</Text>
						</View>
					</View>
				</View>

				<View style={styles.detailContainer}>
					<Text style={styles.headerText}>Your Preferences:</Text>
				</View>

				<View style={styles.detailContainer}>
					<Text style={styles.sectionText}>Cuisine:</Text>
				</View>
				<View style ={styles.interestGrid}>
					{cuisines && cuisines.map((cuisine) => (
						<TouchableOpacity
							key={cuisine}
							style={[
								styles.interestIcon,
								selectedInterests.includes(cuisine) ? styles.selected : null,
							]}
							>
							<Image source={cuisineImage[cuisine]} style={styles.interestImage} />
							<Text style={styles.interestText}>{cuisine}</Text>
						</TouchableOpacity>
					))}
				</View>

				<View style={styles.detailContainer}>
					<Text style={styles.sectionText}>
						Restaurant Ratings: {ratings} Stars
					</Text>
				</View>

				<View style={styles.detailContainer}>
					<Text style={styles.sectionText}>Proximity: {proximity}m</Text>
				</View>

				<View style={styles.detailContainer}>
					<Text style={styles.sectionText}>Operation Status: {operationStatus}</Text>
				</View>

				<TouchableOpacity style={styles.button} onPress={handleSignout}>
					<Text style={styles.buttonText}>Sign Out</Text>
				</TouchableOpacity>
			</View>
			
			<TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.backButton}>
				<Text style={styles.backButtonText}>X</Text>
			</TouchableOpacity>

		</ScrollView>
  	);
};

export default ViewProfile;