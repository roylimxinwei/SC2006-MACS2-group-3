// Welcome screen links to sign up and log in screen

import React from "react";
import { 
	Image, 
	Text, 
	TouchableOpacity, 
	View 
} from "react-native";
import { styles } from "../css/WelcomeScreen_CSS";

/**
 * Displays the initial welcome screen with options to log in or sign up.
 * Users can navigate to either the log in or sign up screens from here.
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - Navigation object to enable navigating to other screens.
 */
const WelcomeScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Image
				source={require("../assets/jiakIcon.png")}
				style={styles.ImageDesign}
			/>
			<Text style={styles.welcomeText}>Welcome!</Text>
			<TouchableOpacity
				onPress={() => navigation.navigate("LogInPage")} 
				style={styles.button}
			>
				<Text style={styles.buttonText}>Log In</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => navigation.navigate("SignUpPage")}  
			>
				<Text style={styles.signUpText}>New to Jiak? Sign up here.</Text>
			</TouchableOpacity>
		</View>
	);
};

export default WelcomeScreen;
