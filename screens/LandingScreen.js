// landing screen redirects to the welcome(signup/login) screen

import React, { useEffect } from "react";
import { 
  Image, 
  Text, 
  TouchableOpacity, 
  View 
} from "react-native";
import { styles } from "../css/LandingScreen_CSS";

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

export default LandingScreen;
