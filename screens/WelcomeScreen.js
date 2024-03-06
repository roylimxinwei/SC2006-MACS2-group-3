// Welcome screen links to sign up and log in screen

import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../config/colors";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/jiakIcon.png")}
        style={styles.ImageDesign}
      />
      <Text style={styles.welcomeText}>Welcome!</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("LogInPage")} // Replace 'Login' with your login screen route name
        style={styles.button}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("SignUpPage")} // Replace 'SignUp' with your sign up screen route name
      >
        <Text style={styles.signUpText}>New to Jiak? Sign up here.</Text>
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
    borderRadius: 130,
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
    color: "#7F2B0F",
    textDecorationLine: "underline",
    fontSize: 16,
  },
});

export default WelcomeScreen;
