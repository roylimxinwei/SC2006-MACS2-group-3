import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Switch } from "react-native-switch";
import { styles } from "../css/RestaurantExperiencePage_CSS";
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc, updateDoc, getDocs, collection, Timestamp} from "firebase/firestore"; 

const RestaurantExperience = () => {
  const [restaurantRating, setRestaurantRating] = useState(3);
  const [proximity, setProximity] = useState(100);
  const [operationStatus, setOperationStatus] = useState("Open Now");
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const savePreferences = async () => {
    try {
      await updateDoc(doc(collection(db, 'users'), auth.currentUser.uid), {
        restaurantRating,
        proximity,
        operationStatus: isEnabled ? 'Open Now' : 'All',
      });
      Alert.alert('Preferences Saved');
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Error saving preferences: ', error);
      Alert.alert('Error saving preferences. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Preferences</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Restaurant Ratings</Text>
          <Text style={styles.sectionText}>
            What is the minimum rating you would like to see?
          </Text>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              value={restaurantRating}
              minimumValue={1}
              maximumValue={5}
              step={1}
              onValueChange={(value) => setRestaurantRating(value)}
              minimumTrackTintColor="#000000"
              maximumTrackTintColor="#DC4731"
            />
            <Text style={styles.sliderValue}>{restaurantRating}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Proximity</Text>
          <Text style={styles.sectionText}>
            How far are you willing to travel for a meal?
          </Text>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              value={proximity}
              minimumValue={0}
              maximumValue={1000}
              step={10}
              onValueChange={(value) => setProximity(value)}
              minimumTrackTintColor="#000000"
              maximumTrackTintColor="#DC4731"
            />
            <Text style={styles.sliderValue}>{proximity}m</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Operation Status</Text>
          <Text style={styles.sectionText}>
            Do you also wish to be recommended resturants that are currently
            closed?
          </Text>
          <Switch
            value={isEnabled}
            onValueChange={toggleSwitch}
            activeText={"Recommend me only currently open Resturants"}
            inActiveText={"Recommend me all Restaurants"}
            {...styles.OperationStatusButton}
          />
        </View>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={savePreferences}
        >
          <Text style={styles.nextButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RestaurantExperience;
