// landing screen redirects to the welcome(signup/login) screen

import React, { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../config/colors";

const LandingScreen = ({ navigation }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log("Navigating to WelcomePage");
      navigation.navigate("WelcomeScreen"); // navigates to welcome screen
    }, 3000); // Redirect to the welcome screen after 3 seconds

    return () => {
      clearTimeout(timeoutId); // Clear the timeout when the component unmounts
    };
  }, []);

  const handleRedirect = () => {
    navigation.navigate("WelcomeScreen");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/jiakIcon.png")} />
      <Text style={styles.text}>
        Ready to Jiak? Redirecting in 3 seconds...
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleRedirect}>
        <Text style={styles.buttonText}>Go back to Welcome Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", // Centers objects according to the secondary axis
    justifyContent: "center", // Centers the object according to main axis
    backgroundColor: colors.secondary, // Background colour of secondary
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#CD5C5C",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});

export default LandingScreen;
