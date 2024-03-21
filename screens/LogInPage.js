// LoginPage.js

import React, { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {styles} from "../css/LogInPage_CSS";

import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../firebase';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleLogIn = () => {

    if(email == null || password == null){
      alert("Please fill in all fields.");
      return;
    }
    
    signInWithEmailAndPassword(auth, email, password)
    .then(userCredentials =>{
      const user = userCredentials.user;
      alert("Log in Successfully.")
      navigation.navigate("HomeScreen"); 

    })
    .catch(error => {

      if (error.code === 'auth/user-not-found') {
        alert('There no user exist with that email');
      }

      if (error.code === 'auth/invalid-email') {
        alert('The email address is invalid.');
      }

      if (error.code === 'auth/invalid-credential') {
        alert('The password is invalid.');
      }

      if (error.code === 'auth/too-many-requests') {
        alert('Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.');
      }


      console.log(error.message)
    }
      
  )};


  return (
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
      <TouchableOpacity
        onPress={handleLogIn}
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


export default LoginPage;
