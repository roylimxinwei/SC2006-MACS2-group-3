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

import Slider from '@react-native-community/slider';
import { Switch } from 'react-native-switch';
import { cuisines , cuisineImage } from "../config/supportedCuisine";

const ViewProfile = ({ navigation }) => {

	const isFocused = useIsFocused();

	const [username, setUsername] = useState("");
	const [selectedInterests, setSelectedInterests] = useState([]);
	const [ratings, setRatings] = useState("");
	const [proximity, setProximity] = useState("");
	const [operationStatus, setOperationStatus] = useState("");
	const [referralCode, setReferralCode] = useState("");
	const [referralCodeUsed, setReferralCodeUsed] = useState("");

	const toggleSwitch = () => setIsEnabled(previousState => !previousState);

	const handleSignout = () =>{
		signOut(auth).then(() => {
			Alert.alert('You are signed out!');
			navigation.navigate("LogInPage"); 

		}).catch((error) => {
		// An error happened.
		});
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

		}}

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

				{/* <View style={styles.slider}>
					<Slider
						style={styles.rangeSlider}
						minimumValue={1}
						maximumValue={5}
						step={1}
						value={sliderRestaurantState}
						onValueChange={(value) => setRestaurantSliderState(value)}
						minimumTrackTintColor="#000000"
						maximumTrackTintColor="#DC4731"
					/>
				</View> */}

				<View style={styles.detailContainer}>
					<Text style={styles.sectionText}>Proximity: {proximity}m</Text>
				</View>

				{/* <View style={styles.slider}>
					<Slider
						style={styles.rangeSlider}
						minimumValue={0}
						maximumValue={250}
						step={10}
						value={sliderProximityState}
						onValueChange={(value) => setProximitySliderState(value)}
						minimumTrackTintColor="#000000"
						maximumTrackTintColor="#DC4731"
					/>
				</View> */}

				<View style={styles.detailContainer}>
					<Text style={styles.sectionText}>Operation Status: {operationStatus}</Text>
				</View>

				<TouchableOpacity style={styles.button} onPress={handleSignout}>
					<Text style={styles.buttonText}>Sign Out</Text>
				</TouchableOpacity>

				<View style={styles.switch}>
					{/* <Switch
						value={isEnabled}
						onValueChange={toggleSwitch}
						activeText={'Open Now'}
						inActiveText={'Closed'}
						circleSize={20}
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
					/> */}
				</View>
			</View>
			<TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.backButton}>
				<Text style={styles.backButtonText}>X</Text>
			</TouchableOpacity>

		</ScrollView>
  	);
};

export default ViewProfile;