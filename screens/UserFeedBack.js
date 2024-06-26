import React, { useState , useEffect } from 'react';
import { 
	View, 
	StyleSheet, 
	Alert,
	Text,
	TextInput,
	Button,
	TouchableOpacity
} from 'react-native';
import { auth, db } from '../firebase';
import { styles } from "../css/UserFeedBack_CSS.js";
import { doc, setDoc, getDoc, updateDoc, getDocs, collection, Timestamp} from "firebase/firestore"; 

/**
 * Component for submitting user feedback.
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - Navigation object to enable navigating to other screens.
 */
const UserFeedBack = ({navigation}) => {
	const [feedback, setFeedback] = useState('');

	/**
	 * Handles the submission of feedback to Firestore.
	 * Displays an alert if the feedback submission is successful or if an error occurs.
	 */
	const handleFeedbackSubmit = async () => {
		if (feedback.trim().length === 0) {
			Alert.alert('Error', 'Please enter your feedback before submitting.');
			return;
		}

		try {
			await setDoc(doc(collection(db, 'feedback')), {
				feedback,
			});
			navigation.navigate('HomeScreen');
			Alert.alert('Success', 'Your feedback has been submitted successfully.');
			setFeedback(''); // Reset the feedback input
		} catch (error) {
			Alert.alert('Error', 'Failed to submit feedback. Please try again.');
			console.error(error);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.welcomeText}>Any comments or suggestions for the app?</Text>
			<Text style={styles.footnote}>Note that your feedback will be completely anonymous.</Text>
			<TextInput
					style={styles.input}
					placeholder="Enter your feedback here"
					value={feedback}
					onChangeText={setFeedback}
			/>
			<TouchableOpacity onPress={handleFeedbackSubmit} style={styles.button}>
				<Text style={styles.buttonText}>Submit</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.backButton}>
				<Text style={styles.backButtonText}>X</Text>
			</TouchableOpacity>
		</View>
	);
};


export default UserFeedBack;