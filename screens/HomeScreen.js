// Home Screen

// Welcome screen links to sign up and log in screen

import React from "react";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import colors from "../config/colors";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Home Screen!</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("GeolocationPage")}
        style={styles.button}
      >
        <Text> To GeolocationPage </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("ViewProfile")} // Replace 'HomeScreen' with your home screen route name
        style={styles.button}
      >
        <Text style={styles.buttonText}>View Profile</Text>
      </TouchableOpacity>

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
  signUpText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default HomeScreen;
