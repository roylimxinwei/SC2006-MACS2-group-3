// Home Screen

// Welcome screen links to sign up and log in screen

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Home Screen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", // Centers objects according to the secondary axis
    justifyContent: "center", // Centers the object according to main axis
    backgroundColor: colors.primary, // primary colour
  },
  ImageDesign: {
    borderRadius: "130%",
    width: 250,
    height: 250,
  },
  welcomeText: {
    color: "#7F2B0F",
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#CD5C5C", // Replace with your desired button color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  signUpText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default HomeScreen;
