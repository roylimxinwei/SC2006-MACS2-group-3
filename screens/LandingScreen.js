import React, { useEffect } from "react";
import { 
  Image, 
  Text, 
  TouchableOpacity, 
  View,
  ActivityIndicator,
} from "react-native";
import { styles } from "../css/LandingScreen_CSS";

/**
 * The landing screen that displays a loading indicator and automatically navigates
 * to the Welcome screen after a delay.
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - Navigation object to enable navigating to other screens.
 */
const LandingScreen = ({ navigation }) => {

  /**
   * Sets up a timer to navigate to the WelcomeScreen after 3 seconds. Cleans up on unmount.
   */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log("Navigating to WelcomePage");
      navigation.navigate("WelcomeScreen"); // navigates to welcome screen
    }, 3000); // Redirect to the welcome screen after 3 seconds

    return () => {
      clearTimeout(timeoutId); // Clear the timeout when the component unmounts
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/jiakIcon.png")} />
      <ActivityIndicator size="large" color="#FFFFFF" />
      <Text style={styles.text}>
        Loading...
      </Text>
      <Text style={styles.jiakText}>
        Ready to Jiak?
      </Text>
    </View>
  );
};

export default LandingScreen;
