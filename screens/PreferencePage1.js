import React, { useEffect, useState } from 'react';
import { 
	View, 
	Text, 
	TouchableOpacity, 
	Image,
	ScrollView,
	Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {styles} from '../css/PreferencePage1_CSS';
import { cuisines , cuisineImage } from "../config/supportedCuisine";
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc, updateDoc, getDocs, collection, Timestamp} from "firebase/firestore"; 

const PreferencePage1 = () => {
	const [selectedInterests, setSelectedInterests] = useState([]);
	const navigation = useNavigation();

	const handleSelect = (interest) => {
		if (selectedInterests.includes(interest)) {
			setSelectedInterests(selectedInterests.filter((item) => item !== interest));
		} else {
			setSelectedInterests([...selectedInterests, interest]);
		}
	};

	const saveCuisines = async () => {
		if (selectedInterests && selectedInterests.length >= 3) {
		  try {
			await setDoc(doc(db, 'users', auth.currentUser.uid), {
			  cuisines: selectedInterests,
			}, { merge: true });
			navigation.navigate('PreferencePage2');
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
					{cuisines && cuisines.map((cuisine) => (
						<TouchableOpacity
							key={cuisine}
							style={[
								styles.interestIcon,
								selectedInterests.includes(cuisine) ? styles.selected : null,
							]}
							onPress={() => handleSelect(cuisine)}
						>
							<Image source={cuisineImage[cuisine]} style={styles.interestImage} />
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
								[
									{ text: "OK" }
								]
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

export default PreferencePage1;