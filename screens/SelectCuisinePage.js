import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
	Alert,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { cuisineImage, cuisines } from "../config/supportedCuisine";
import { styles } from "../css/SelectCuisinePage_CSS";
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc, updateDoc, getDocs, collection, Timestamp} from "firebase/firestore"; 

/**
 * A component that allows users to select their favorite cuisines from a list.
 * Users must select at least three cuisines before proceeding.
 */
const SelectCuisine = () => {
	const [selectedInterests, setSelectedInterests] = useState([]);
	const navigation = useNavigation();

	/**
	 * Handles the selection and deselection of cuisines.
	 * @param {string} interest - The cuisine that was either selected or deselected.
	 */
	const handleSelect = (interest) => {
		if (selectedInterests.includes(interest)) {
			setSelectedInterests(
				selectedInterests.filter((item) => item !== interest)
			);
		} else {
			setSelectedInterests([...selectedInterests, interest]);
		}
	};

	/**
	 * Saves the selected cuisines to the user's profile in Firestore and navigates to the next page.
	 */
	const saveCuisines = async () => {
		if (selectedInterests && selectedInterests.length >= 3) {
			console.log(auth.currentUser.uid)
			console.log(selectedInterests)
			try {
				await setDoc(doc(db, 'users', auth.currentUser.uid), {
					cuisines: selectedInterests,
				}, { merge: true });
				navigation.navigate('RestaurantExperience');
			} catch (error) {
				console.error("Error saving cuisines: ", error);
			}
		} else {
			Alert.alert(
			"Selection Error",
			"Please select at least 3 interests",
			[
				{
				text: "OK",
				},
			]
			);
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.scrollContainer}>
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.title}>Select your favourite cuisines</Text>
					<Text style={styles.subtitle}>Choose a minimum of 3</Text>
				</View>
				<View style={styles.interestGrid}>
					{cuisines &&
						cuisines.map((cuisine) => (
							<TouchableOpacity
								key={cuisine}
								style={[
									styles.interestIcon,
									selectedInterests.includes(cuisine) ? styles.selected : null,
								]}
								onPress={() => handleSelect(cuisine)}
							>
								<Image
									source={cuisineImage[cuisine]}
									style={styles.interestImage}
								/>
								<Text style={styles.interestText}>{cuisine}</Text>
							</TouchableOpacity>
						))}
				</View>
				<TouchableOpacity
					style={styles.nextButton}
					onPress={() => {
						if (selectedInterests.length < 3) {
							Alert.alert(
								"Selection Error",
								"Please select at least 3 interests",
								[{ text: "OK" }]
							);
						} else {
							saveCuisines();
						}
					}}
				>
					<Text style={styles.nextButtonText}>Next</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

export default SelectCuisine;
