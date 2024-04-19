import React, { useState } from "react";
import {
	Dimensions,
	Image,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	ScrollView,
	Alert,
} from "react-native";

import { signInWithEmailAndPassword } from "@firebase/auth";
import { styles } from "../css/LogInPage_CSS";
import { auth } from "../firebase";

/**
 * A login page component that allows users to authenticate using their email and password.
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - Navigation object to enable navigating to other screens.
 */
const LoginPage = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	/**
	 * Updates the email state as the user types.
	 * @param {string} text - The current value of the text input for email.
	 */
	const handleEmailChange = (text) => {
		setEmail(text.trim());
	};

	/**
	 * Updates the password state as the user types.
	 * @param {string} text - The current value of the text input for password.
	 */
	const handlePasswordChange = (text) => {
		setPassword(text.trim());
	};

	/**
	 * Attempts to log in the user using Firebase Authentication.
	 * If successful, navigates to the HomeScreen.
	 * Displays an alert on login failure.
	 */
	const handleLogIn = () => {
		if (email == "" || password == "") {
			Alert.alert(
				"Log in Failed",
				"Please fill in all fields."
			);
			return;
		}

		const screenHeight = Dimensions.get("window").height;

		signInWithEmailAndPassword(auth, email, password)
			.then((userCredentials) => {
				const user = userCredentials.user;
				Alert.alert(
					"Log in Successfully",
					"Let's Jiak!"
				);
				navigation.navigate("HomeScreen", { userId: user.displayName });
			})
			.catch((error) => {
				handleLoginErrors(error);
				setPassword("");
				console.log(error.message);
			});
	};

	/**
	 * Handles different types of login errors and displays appropriate alert messages.
	 * @param {Object} error - Error object from Firebase login attempt.
	 */
	const handleLoginErrors = (error) => {
		switch (error.code) {
			case "auth/invalid-email":
				Alert.alert("Log in Failed", "No user found with this email address.");
				break;
			case "auth/invalid-credential":
				Alert.alert("Log in Failed", "The password is incorrect.");
				break;
			case "auth/too-many-requests":
				Alert.alert(
					"Log in Failed",
					"Access to this account has been temporarily disabled due to many failed login attempts. Try again later."
				);
				break;
			default:
				console.log(error.message);
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.scrollContainer}>
			<View style={styles.container}>
				<Image
					source={require("../assets/jiakIcon.png")}
					style={styles.ImageDesign}
				/>
				<Text style={styles.loginText}>Log in</Text>
				<TextInput
					style={styles.input}
					value={email}
					onChangeText={handleEmailChange}
					placeholder="Email"
				/>
				<TextInput
					style={styles.input}
					value={password}
					onChangeText={handlePasswordChange}
					placeholder="Password"
					secureTextEntry={true}
				/>
				<TouchableOpacity onPress={handleLogIn} style={styles.button}>
					<Text style={styles.buttonText}>Log In</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate("SignUpPage")}>
					<Text style={styles.signUpText}>New to Jiak? Sign up here.</Text>
				</TouchableOpacity>
			</View>
			<Text style={styles.padpad}> FOR PADDING </Text>
		</ScrollView>
	);
};

export default LoginPage;
