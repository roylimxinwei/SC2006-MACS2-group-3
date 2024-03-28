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
import {styles} from '../css/SelectCuisine_CSS';
import { cuisines , cuisineImage } from "../config/supportedCuisine";


const SelectCuisine = () => {
	const [selectedInterests, setSelectedInterests] = useState([]);
	const navigation = useNavigation();

	// const interestList = [
	//   { name: 'French', image: require('../assets/croissant.png') },
	//   { name: 'Italian', image: require('../assets/italian.png') },
	//   { name: 'Japanese', image: require('../assets/ramen.png') },
	//   { name: 'Chinese', image: require('../assets/chinese.png') },
	//   { name: 'Fast Food', image: require('../assets/fastfood.png') },
	//   { name: 'Vegetarian', image: require('../assets/salad.png') },
	// ];


	const handleSelect = (interest) => {
		if (selectedInterests.includes(interest)) {
			setSelectedInterests(selectedInterests.filter((item) => item !== interest));
		} else {
			setSelectedInterests([...selectedInterests, interest]);
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
							navigation.navigate('RestaurantExperience');
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