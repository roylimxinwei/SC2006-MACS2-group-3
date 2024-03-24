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
import firebase from '../firebase';

const PreferencePage1 = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const navigation = useNavigation();
  // Get the current user's UID
  const userId = firebase.auth().currentUser.uid;

  const handleSelect = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  // Save the selected cuisines to the Firestore "users" collection
  const saveCuisines = () => {
    if (selectedInterests.length < 3) {
      Alert.alert(
        "Selection Error",
        "Please select at least 3 interests",
        [
          { text: "OK" }
        ]
      );
    } else {
      firebase.firestore()
        .collection("users")
        .doc(userId)
        .get()
        .then(doc => {
          // If the user document does not exist, create a new user with the "cuisine" field
          if (!doc.exists) {
            firebase.firestore()
              .collection("users")
              .doc(userId)
              .set({
                cuisine: firebase.firestore.FieldValue.arrayUnion(...selectedInterests),
              })
              .then(() => {
                console.log("Document successfully written!");
                navigation.navigate('PreferencePage2');
              })
              .catch(error => {
                console.error("Error writing document: ", error);
              });
          } else {
            // If the user document exists, update the "cuisine" field with the new array
            firebase.firestore()
              .collection("users")
              .doc(userId)
              .update({
                cuisine: firebase.firestore.FieldValue.arrayUnion(...selectedInterests),
              })
              .then(() => {
                console.log("Document successfully updated!");
                navigation.navigate('PreferencePage2');
              })
              .catch(error => {
                console.error("Error updating document: ", error);
              });
          }
        })
        .catch(error => {
          console.error("Error getting document: ", error);
        });
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
          onPress={saveCuisines}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PreferencePage1;