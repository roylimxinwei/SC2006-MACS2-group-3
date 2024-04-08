import React, { useState , useEffect } from 'react';
import { 
    View, 
    StyleSheet, 
    Alert,
    Text,
    TextInput,
    Button,
} from 'react-native';
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc, updateDoc, getDocs, collection, Timestamp} from "firebase/firestore"; 

const UserFeedback = ({navigation}) => {
  const [feedback, setFeedback] = useState('');

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
			<TextInput
				style={styles.input}
				placeholder="Enter your feedback here"
				value={feedback}
				onChangeText={setFeedback}
			/>
			<Button 
				title="Submit" 
				onPress={handleFeedbackSubmit} 
				style={styles.button} 
			/>
		</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

export default UserFeedback;
