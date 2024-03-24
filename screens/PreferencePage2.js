import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {styles} from '../css/PreferencePage2_CSS';
import Slider from '@react-native-community/slider';
import { Switch } from 'react-native-switch';

const PreferencePage2 = () => {
    const [restaurantRating, setRestaurantRating] = useState(3);
    const [proximity, setProximity] = useState(100);
    const [operationStatus, setOperationStatus] = useState('Open Now');
    const navigation = useNavigation();
    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>

            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Preferences</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Restaurant Ratings</Text>
                    <Text style={styles.sectionText}>What is the minimum rating you would like to see?</Text>
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
                <Text style={styles.sectionText}>How far are you willing to travel for a meal?</Text>
                <View style={styles.sliderContainer}>
                    <Slider
                    style={styles.slider}
                    value={proximity}
                    minimumValue={0}
                    maximumValue={250}
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
                    <Text style={styles.sectionText}>Do you also wish to be recommended resturants that are currently closed?</Text>
                    <Switch
                        value={isEnabled}
                        onValueChange={toggleSwitch}
                        activeText={'Recommend me only currently open Resturants'}
                        inActiveText={'Recommend me all Restaurants'}
                        {...styles.OperationStatusButton} 
                    />
                </View>
                <TouchableOpacity 
                    style={styles.nextButton} 
                    onPress={() => {
                        Alert.alert ('Preferences Saved');
                        navigation.navigate('HomeScreen');
                    }}
                >
                    <Text style={styles.nextButtonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
  };
  
  
  export default PreferencePage2;