import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../css/ReviewLandingPage_CSS";

const ReviewLandingPage = ({ route, navigation }) => {
  //route will contain the params
  // const {name, rating, cuisine, address, imageURL} = route.params;
  const selectedRestaurant = route.params;

  const handleReviewsPress = () => {
    
    navigation.navigate("ReviewPage",selectedRestaurant);
  };
  const handleReviewsPressReferral = () => {
    navigation.navigate("InputReferralCodePage");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.smallText}>Dining at:</Text>
      <Text style={styles.smallText}>{selectedRestaurant.name}</Text>
      <TouchableOpacity
        style={styles.smallButton}
        onPress={handleReviewsPressReferral}
      >
        <Text style={styles.smallButtonText}>Have a referrel code?</Text>
      </TouchableOpacity>
      <Image
        source={require("../assets/eating.png")}
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
