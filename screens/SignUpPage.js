// SignUpPage.js

import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../config/colors";

// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import {createUserWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../firebase';

const SignUpPage = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if(username == null || email == null || password == null || confirmPassword == null){
      alert("Please fill in all fields.");
      return;
    }

    // Add your sign up logic here
    // For example, you can send the data to your server
    createUserWithEmailAndPassword(auth,email,password)
    .then(userCredentials =>{
      const user = userCredentials.user;
      alert("Account Created Successfully.")
      navigation.navigate("LogInPage"); 

    })
    .catch(error => console.log(error.message))


    navigation.navigate("PreferencePage1"); // Replace 'HomePage' with your home screen route name
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/jiakIcon.png")}
        style={styles.ImageDesign}
      />
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  ImageDesign: {
    borderRadius: 130,
    width: 250,
    height: 250,
    bottom: 50,
  },
  title: {
    color: "#7F2B0F",
    fontSize: 24,
    marginBottom: 20,
    bottom: 10,
  },
  input: {
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
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
    top: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});

export default SignUpPage;
