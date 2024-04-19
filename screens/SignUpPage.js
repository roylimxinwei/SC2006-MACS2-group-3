import React, { useState } from "react";
import {
	Alert,
	Image,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { styles } from "../css/SignUpPage_CSS";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

/**
 * A page where new users can sign up by providing their username, email, and password.
 * @param {Object} props - Component props including navigation for screen transitions.
 * @param {Object} props.navigation - Navigation object to enable navigating to other screens.
 */
const SignUpPage = ({ navigation }) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	/**
	 * Handles the user sign-up process by validating input fields, creating a new user in Firebase,
	 * and navigating to the 'SelectCuisine' screen upon successful registration.
	 */
	const handleSignUp = () => {
		if (
			username == "" ||
			email == "" ||
			password == "" ||
			confirmPassword == ""
		) {
			alert("Please fill in all fields.");
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegex.test(email)) {
			Alert.alert("Invalid Email", "Please enter a valid email address.");
			setPassword("");
			setConfirmPassword("");
			return;
		}

		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

		if (!passwordRegex.test(password)) {
			Alert.alert(
				"Invalid Password",
				"Password must be at least 8 characters long and include at least one uppercase character, one lowercase character, one number, and one special character."
			);
			setPassword("");
			setConfirmPassword("");
			return;
		}

		if (password !== confirmPassword) {
			Alert.alert(
				"Passwords do not match.",
				"Re-enter your password to confirm."
			);
			setPassword("");
			setConfirmPassword("");
			return;
		}

		// Add your sign up logic here
		// For example, you can send the data to your server
		createUserWithEmailAndPassword(auth, email, password)
			.then(async (userCredentials) => {
				const user = userCredentials.user;
				const referralCode = generateReferralCode();

				await setDoc(doc(db, "users", user.uid), {
					name: username,
					referralCode: referralCode,
					referralCodeUsed: false,
					points: 0,
				});

				Alert.alert("Sign Up Successful", "Continue to finish setting up your profile.");
				navigation.navigate("SelectCuisine");
			})
			.catch((error) => {
				handleFirebaseErrors(error);
			});
	};

	/**
	 * Generates a random six-character referral code.
	 * @returns {string} The generated referral code.
	 */
	const generateReferralCode = () => {
		let result = "";
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for (let i = 0; i < 6; i++) {
			result += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return result;
	};

	/**
	 * Handles Firebase errors during sign-up by displaying relevant alerts.
	 * @param {Object} error - Error object containing the error code and message.
	 */
	const handleFirebaseErrors = (error) => {
		if (error.code === "auth/email-already-in-use") {
			Alert.alert("Sign Up Failed", "Email is already registered with another user.");
		} else {
			Alert.alert("Sign Up Failed", `An error occurred. Please Contact Admin.\nError Message: ${error.message}`);
		}
		setPassword("");
		setConfirmPassword("");
	};

	return (
		<ScrollView contentContainerStyle={styles.scrollContainer}>
			<View style={styles.container}>
				<Image
					source={require("../assets/jiakIcon.png")}
					style={styles.ImageDesign}
				/>
				<Text style={styles.title}>Sign Up</Text>
				<TextInput
					style={styles.input}
					placeholder="Username"
					onChangeText={(text) => setUsername(text.trim())}
					value={username}
				/>
				<TextInput
					style={styles.input}
					placeholder="Email"
					onChangeText={(text) => setEmail(text.trim())}
					value={email}
				/>
				<TextInput
					style={styles.input}
					placeholder="Password"
					onChangeText={(text) => setPassword(text.trim())}
					value={password}
					secureTextEntry
				/>
				<TextInput
					style={styles.input}
					placeholder="Confirm Password"
					onChangeText={(text) => setConfirmPassword(text.trim())}
					value={confirmPassword}
					secureTextEntry
				/>
				<TouchableOpacity style={styles.button} onPress={handleSignUp}>
					<Text style={styles.buttonText}>Sign Up</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => navigation.navigate("LogInPage")}>
					<Text style={styles.logInText}>Have an account? Log in instead.</Text>
				</TouchableOpacity>

				<Text style={styles.pad}>for padding</Text>
			</View>
		</ScrollView>
	);
};

export default SignUpPage;
