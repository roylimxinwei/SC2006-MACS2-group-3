// Welcome screen links to sign up and log in screen

import React from "react";
import { 
  Image, 
  Text, 
  TouchableOpacity, 
  View 
} from "react-native";
import { styles } from "../css/WelcomeScreen_CSS";

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

export default WelcomeScreen;
