import React from "react";
import { 
  Image, 
  Text, 
  TouchableOpacity, 
  View 
} from "react-native";
import {styles} from '../css/ReviewLandingPage_CSS';

const ReviewLandingPage = ({ navigation }) => {
  const handleReviewsPress = () => {
    navigation.navigate("ReviewPage");
  };
  const handleReviewsPressReferral = () => {
    navigation.navigate("InputReferralCodePage");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.smallText}>Dining at:</Text>
      <Text style={styles.smallText}>ARestaurantName</Text>
      <TouchableOpacity
        style={styles.smallButton}
        onPress={handleReviewsPressReferral}
      >
        <Text style={styles.smallButtonText}>Have a referrel code?</Text>
      </TouchableOpacity>
      <Image
        source={require("../assets/restaurant.png")}
        style={styles.ImageDesign}
      />
      <Text style={styles.welcomeText}>How was your meal?</Text>
      <TouchableOpacity style={styles.button} onPress={handleReviewsPress}>
        <Text style={styles.buttonText}>Review</Text>
      </TouchableOpacity>
    </View>
  );
};


export default ReviewLandingPage;
