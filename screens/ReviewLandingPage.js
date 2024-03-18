import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../config/colors";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  ImageDesign: {
    borderRadius: 130,
    width: 300,
    height: 300,
    marginBottom: -50,
  },
  welcomeText: {
    color: "#7F2B0F",
    fontSize: 17,
    marginBottom: 20,
    marginTop: 60,
  },
  smallText: {
    color: "#7F2B0F",
    fontSize: 36,
    marginBottom: 80,
    marginTop: -80,
    textAlign: "left",
    width: "80%",
  },
  smallButton: {
    paddingVertical: 5,
    paddingHorizontal: 1,
    borderRadius: 5,
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  smallButtonText: {
    color: "#9e8f8d",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#CD5C5C",
    paddingVertical: 10,
    paddingHorizontal: 90,
    borderRadius: 5,
    marginBottom: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});

export default ReviewLandingPage;
